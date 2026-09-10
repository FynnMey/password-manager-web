import { defineStore } from 'pinia'
import {Http} from "@/services/http/Http";
import {LoginRequest} from "@/types/Request/LoginRequest";
import {useNotificationAdapter} from "@/composabiles/adapter/notification/useNotificationAdapter";
import {UserStore} from "@/types/store/UserStore";

export const useUserStore = defineStore('userStore', {
  state: (): UserStore => ({
    id: null,
    name: '',
    lastname: '',
    email: '',
    salt: '',
    token: null,
    isPremium: false,
    isAdmin: false,
    canaryValue: '',

    accessToken: null,
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
        this.lastname = user.lastName
        this.isAdmin = user.isAdmin
        this.isPremium = user.isPremium
        this.canaryValue = user.canaryValue
        this.salt = user.salt

        this.accessToken = req.accessToken

        return true
      } catch (_err) {
        const { warning } = useNotificationAdapter()
        warning("Anmeldedaten sind falsch.")

        return false
      }
    },

    async logout() {
      const http = new Http()
      const email = ''
      const password = ''
      await http.post<LoginRequest>('/api/auth/logout', { email, password })

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
