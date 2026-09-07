import {EncryptedPayload} from "@/services/vault/VaultHelper";

export interface IVault {
  isOpen: boolean
  salt: string | null
  open(password: string, salt?: string): Promise<string>
  close(): void
  encrypt(text: string): Promise<string>
  decrypt(encryptedData: string | EncryptedPayload): Promise<string>
}
