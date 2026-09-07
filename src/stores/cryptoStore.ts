import { defineStore } from 'pinia'
import { vaultService } from '@/services/vault/Vault'

export const useCryptoStore = defineStore('cryptoStore', {
  state: () => ({
    vaultSalt: '',
    isUnlocked: false,
    isReady: true
  }),

  getters: {
    isBridgeReady: () => true,
    isVaultOpen: (state) => state.isUnlocked
  },

  actions: {
    async openVault(password: string): Promise<string> {
      const salt = await vaultService.open(password, this.vaultSalt || undefined)
      this.vaultSalt = salt
      this.isUnlocked = vaultService.isOpen
      return salt
    },

    async encrypt(data: string): Promise<string> {
      return await vaultService.encrypt(data)
    },

    async decrypt(data: string): Promise<string> {
      return await vaultService.decrypt(data)
    },

    async closeVault(): Promise<void> {
      vaultService.close()
      this.isUnlocked = false
    },

    async resetVault(): Promise<void> {
      vaultService.close()
      this.isUnlocked = false
      this.vaultSalt = ''
    }
  }
})

