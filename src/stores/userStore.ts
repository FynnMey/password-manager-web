import { defineStore } from 'pinia'
import {Http} from "@/services/http/Http";
import {LoginRequest} from "@/types/Request/LoginRequest";
import {useRouter} from "vue-router";
import {useNotificationAdapter} from "@/composabiles/adapter/notification/useNotificationAdapter";

export interface UserState {
  id: string | number | null
  name: string
  lastname: string
  email: string
  salt: string
  token: string | null
  isPremium: boolean
  isAdmin: boolean

  accesToken: string | null
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    id: null,
    name: '',
    lastname: '',
    email: '',
    salt: '',
    token: null,
    isPremium: false,
    isAdmin: false,

    accesToken: null,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.id || state.token)
  },

  actions: {
    async login(email?: string, password?: string): Promise<boolean> {
      const http = new Http()

      try {
        const req = await http.post<LoginRequest>('/api/auth/login', { email, password })
        const user = req.user

        this.id = user.id
        this.email = user.email
        this.name = user.name
        this.lastname = user.lastname
        this.isAdmin = user.isAdmin
        this.isPremium = user.isPremium

        this.accesToken = req.accesToken

        return true
      } catch (_err) {
        const { warning } = useNotificationAdapter()
        warning("Anmeldedaten sind falsch.")

        return false
      }
    },

    logout() {
      this.id = null
      this.name = ''
      this.lastname = ''
      this.email = ''
      this.salt = ''
      this.token = null
      this.isPremium = false
      this.isAdmin = false
    }
  },

  persist: true
})
