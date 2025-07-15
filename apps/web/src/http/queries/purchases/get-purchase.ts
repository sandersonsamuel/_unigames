import { PurchaseType } from "@/@types/purchase"
import { apiClient } from "@/http/client"

export const getPurchasesByUserIdQuery = (userId: string) => {

  return apiClient(`/purchases/${userId}`, {
    method: "GET",
  }).then((res) => res.json()) as Promise<PurchaseType[]>
}
