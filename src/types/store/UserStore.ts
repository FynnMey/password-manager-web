export type User = {
  id: string | number | null
  name: string
  lastName: string
  email: string
  salt: string
  token: string | null
  isPremium: boolean
  isAdmin: boolean
  canaryValue: string
}

export type UserStore = User & {
  accessToken: string | null
}
