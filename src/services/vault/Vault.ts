import {
  deriveKey,
  encryptTextWithKey,
  decryptTextWithKey,
  generateSalt,
  type EncryptedPayload
} from './VaultHelper'
import { IVault } from "@/services/vault/IVault";

export class Vault implements IVault {
  private key: CryptoKey | null = null
  private currentSalt: string | null = null

  get isOpen(): boolean {
    return this.key !== null
  }

  get salt(): string | null {
    return this.currentSalt
  }

  async open(password: string, salt?: string): Promise<string> {
    if (!password) {
      throw new Error('Passwort darf nicht leer sein.')
    }

    const effectiveSalt = salt || generateSalt(16)
    this.key = await deriveKey(password, effectiveSalt)
    this.currentSalt = effectiveSalt
    return effectiveSalt
  }

  close(): void {
    this.key = null
    this.currentSalt = null
  }

  async encrypt(text: string): Promise<string> {
    if (!this.key) {
      throw new Error('Vault ist nicht geöffnet oder gesperrt.')
    }

    const { ciphertext, iv } = await encryptTextWithKey(text, this.key)
    const payload: EncryptedPayload = {
      ciphertext,
      iv,
      salt: this.currentSalt ?? undefined
    }

    return btoa(JSON.stringify(payload))
  }

  async decrypt(encryptedData: string | EncryptedPayload): Promise<string> {
    if (!this.key) {
      throw new Error('Vault ist nicht geöffnet oder gesperrt.')
    }

    let payload: EncryptedPayload
    if (typeof encryptedData === 'string') {
      try {
        payload = JSON.parse(atob(encryptedData)) as EncryptedPayload
      } catch {
        throw new Error('Ungültiges Datenformat für Chiffretext.')
      }
    } else {
      payload = encryptedData
    }

    if (!payload?.ciphertext || !payload?.iv) {
      throw new Error('Ungültige Chiffredaten: Ciphertext oder IV fehlen.')
    }

    try {
      return await decryptTextWithKey(payload.ciphertext, payload.iv, this.key)
    } catch {
      throw new Error('Entschlüsselung fehlgeschlagen: Falsches Passwort oder manipulierte Daten.')
    }
  }

  async unlock(password: string, salt?: string): Promise<string> {
    return this.open(password, salt)
  }

  lock(): void {
    this.close()
  }
}

export const vaultService = new Vault()
export default vaultService

