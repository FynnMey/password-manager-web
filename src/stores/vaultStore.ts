import { defineStore } from "pinia"
import {VaultStore} from "@/types/store/VaultStore"
import {VaultField} from "@/types/VaultField"
import {Http} from "@/services/http/Http";
import {VaultRequest} from "@/types/Request/VaultRequest";
import {DecryptedEntry} from "@/types/DecryptedEntry";

export const useVaultStore = defineStore('vaultStore', {
  state: (): VaultStore => ({
    vault: [],
    activeField: null
  }),

  actions: {
    async getAllVaults() {
      const http = new Http()

      const vault = await http.post<VaultRequest[]>('/api/user/password/get-all', {})
      if (vault.success) {
        this.vault = []
        vault.data.map(field => {
          const vaultField: VaultField = {
            name: field.encryptedName,
            account: field.encryptedEmail,
            password: field.encryptedPassword,
            website: field.encryptedWebsite,
            note: field.encryptedNote,
            createdAt: field.createdAt,
            editedAt: field.editedAt
          }

          this.vault = [...this.vault, vaultField]
        })
      }
    },

    addSingleVault(field: VaultRequest) {
      this.vault = [...this.vault, {
        name: field.encryptedName,
        account: field.encryptedEmail,
        password: field.encryptedPassword,
        website: field.encryptedWebsite,
        note: field.encryptedNote,
        createdAt: field.createdAt,
        editedAt: field.editedAt
      }]
    },

    activateField(field: DecryptedEntry) {
      this.activeField = field
    }
  },
})
