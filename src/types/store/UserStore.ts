export interface UserStore {
  id: string | number | null
  name: string
  lastname: string
  email: string
  salt: string
  token: string | null
  isPremium: boolean
  isAdmin: boolean
  canaryValue: string

  accesToken: string | null
}
