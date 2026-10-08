import { defineStore } from "pinia"
import {VaultStore} from "@/types/store/VaultStore"
import {VaultField} from "@/types/VaultField"
import {Http} from "@/services/http/Http"
import {VaultRequest} from "@/types/Request/VaultRequest"
import {useCryptoStore} from "@/stores/cryptoStore"

const crypto = useCryptoStore()

const decrypt = async (value: string | null) => {
  if (!value)
    return ''

  return await crypto.decrypt(value)
}

export const useVaultStore = defineStore('vaultStore', {
  state: (): VaultStore => ({
    vault: [],
    activeFieldId: null,
    searchField: ""
  }),

  getters: {
    activeField: (state) => {
      if (state.activeFieldId === null)
        return null

      return state.vault.find(entry => entry.id === state.activeFieldId)
    }
  },

  actions: {
    currentVault() {
      const searchTerm = this.searchField.toLowerCase();

      return this.vault.filter(field => {
        return field.name.toLowerCase().includes(searchTerm)
        }
      );
    },

    async getAllVaults() {
      const http = new Http()

      const vault = await http.post<VaultRequest[]>('/api/user/password/get-all', {})
      if (vault.success) {
        this.vault = []
        vault.data.map(async field => {
          const vaultField: VaultField = {
            id: field.id,
            name: await decrypt(field.encryptedName),
            account: await decrypt(field.encryptedEmail),
            password: await decrypt(field.encryptedPassword),
            website: await decrypt(field.encryptedWebsite),
            note: await decrypt(field.encryptedNote),
            createdAt: field.createdAt,
            editedAt: field.editedAt
          }

          this.vault = [...this.vault, vaultField]
        })
      }
    },

    addSingleField(field: VaultField) {
      this.vault = [...this.vault, {
        id: field.id,
        name: field.name,
        account: field.account,
        password: field.password,
        website: field.website,
        note: field.note,
        createdAt: field.createdAt,
        editedAt: field.editedAt
      }]
    },

    deleteSingleField(id: string) {
      this.vault = this.vault.filter(field => field.id !== id)
    },
  },
})
