import {defineStore} from "pinia";

export const useCryptoStore = defineStore('cryptoStore', {
  state: () => ({
    vaultSalt: ''
  })
})
