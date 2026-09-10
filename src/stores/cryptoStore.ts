import { defineStore } from 'pinia'
import { vaultService } from '@/services/vault/Vault'
import { useUserStore } from "@/stores/userStore";

export const useCryptoStore = defineStore('cryptoStore', {
  state: () => ({
    isUnlocked: false,
    isReady: true
  }),

  getters: {
    isBridgeReady: () => true,
    isVaultOpen: (state) => state.isUnlocked
  },

  actions: {
    async openVault(password: string): Promise<string> {
      const user = useUserStore()
      const salt = await vaultService.open(password, user.salt || undefined)
      user.salt = salt
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
    }
  }
})

