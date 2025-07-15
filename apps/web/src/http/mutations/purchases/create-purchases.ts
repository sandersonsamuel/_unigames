import { CreatePurchaseResponseType, CreatePurchaseType } from "@/@types/purchase"
import { apiClient } from "@/http/client"

export const createPurchaseMutation = ({ gameId, userId }: CreatePurchaseType) => {

  return apiClient("/purchases", {
    method: "POST",
    body: JSON.stringify({
      gameId, userId
    })
  }).then((res) => res.json()) as Promise<CreatePurchaseResponseType>

}