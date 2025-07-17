import { PaymentMethod } from "@/types/payment-method"

export type DashboardOverviewType = {
  totalPuchases: number
  paymentMethodsData: PaymentMethodsDataType[],
  ammount: number
  totalCompetitors: number
  totalGames: number
}

export type PaymentMethodsDataType = {
  method: PaymentMethod
  purchases: number
}