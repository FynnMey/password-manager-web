import { defineStore } from 'pinia'
import {Http} from "@/services/http/Http";
import {LoginRequest} from "@/types/Request/LoginRequest";
import {useNotificationAdapter} from "@/composabiles/adapter/notification/useNotificationAdapter";
import {User, UserStore} from "@/types/store/UserStore";

export const useUserStore = defineStore('userStore', {
  state: (): UserStore => ({
    id: null,
    name: '',
    lastName: '',
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

      const req = await http.post<LoginRequest>('/api/auth/login', { email, password })
      console.log(req)
      if (req.success) {
        const user = req.data.user

        this.setUser(user)
        this.accessToken = req.data.accessToken

        return true
      }

      const { warning } = useNotificationAdapter()
      warning("Anmeldedaten sind falsch.")
      return false
    },

    async refreshToken(): Promise<boolean> {
      const http = new Http()
      try {
        const res = await http.post<LoginRequest>('/api/auth/refresh', {})
        if (res.success && res.data.accessToken) {
          this.accessToken = res.data.accessToken

          const user = res.data.user
          if (user) {
            this.setUser(user)
            return true
          }
        }
        return false
      } catch {
        await this.resetAuth()
        return false
      }
    },

    async logout() {
      const http = new Http()
      const email = ''
      const password = ''
      await http.post<LoginRequest>('/api/auth/logout', { email, password })

      await this.resetAuth()
    },

    setUser(user: User) {
      this.id = user.id
      this.email = user.email
      this.name = user.name
      this.lastName = user.lastName
      this.isAdmin = user.isAdmin
      this.isPremium = user.isPremium
      this.canaryValue = user.canaryValue
      this.salt = user.salt
    },

    async resetAuth() {
      this.id = null
      this.name = ''
      this.lastName = ''
      this.email = ''
      this.salt = ''
      this.token = null
      this.accessToken = null
      this.canaryValue = ''
      this.isPremium = false
      this.isAdmin = false
    }
  },

  persist: true
})
