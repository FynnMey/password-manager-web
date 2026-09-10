export type LoginRequest = {
  accessToken: string
  user: {
    id: number
    isAdmin: boolean
    isPremium: boolean
    lastName: string
    canaryValue: string
    salt: string
    name: string
    email: string
  }
}
