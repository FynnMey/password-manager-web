export interface PremiumCreateRequest {
  code: string
  createdAt: Date
  durationInDays: number | null
  isUsed: boolean
  redeemedAt: Date | null
  redeemedByUserId: Date | null
}
