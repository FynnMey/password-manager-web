import { defineStore } from "pinia"
import {VaultStore} from "@/types/store/VaultStore"
import {VaultField} from "@/types/VaultField"
import {Http} from "@/services/http/Http";
import {VaultRequest} from "@/types/Request/VaultRequest";

export const useVaultStore = defineStore('vaultStore', {
  state: (): VaultStore => ({
    vault: []
  }),

  actions: {
    async getAllVaults() {
      const http = new Http()

      const vault = await http.post<VaultRequest[]>('/api/user/password/get-all', {})
      if (vault) {
        this.vault = []
        vault.map(field => {
          const vaultField: VaultField = {
            name: field.name,
            account: field.email,
            password: field.password,
            website: field.website,
            notes: field.notes
          }

          this.vault = [...this.vault, vaultField]
        })
      }
    },

    addSingleVault(field: VaultRequest) {
      this.vault = [...this.vault, {
        name: field.name,
        account: field.email,
        password: field.password,
        website: field.website,
        notes: field.notes
      }]
    }
  },
})
