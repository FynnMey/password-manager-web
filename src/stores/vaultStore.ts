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
      if (vault) {
        this.vault = []
        vault.map(field => {

          console.log(field)
          const vaultField: VaultField = {
            name: field.name,
            account: field.email,
            password: field.password,
            website: field.website,
            note: field.note,
            createdAt: field.createdAt,
            editedAt: field.editedAt
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
        notes: field.notes,
        createdAt: field.createdAt,
        editedAt: field.editedAt
      }]
    },

    activateField(field: DecryptedEntry) {
      this.activeField = field
    }
  },
})
