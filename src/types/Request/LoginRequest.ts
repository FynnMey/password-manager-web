export type LoginRequest = {
  accesToken: string,
  user: {
    id: number,
    isAdmin: boolean,
    isPremium: boolean,
    lastname: string,
    canaryValue: string
    name: string,
    email: string,
  }
}
