import { fetcher } from '@/lib/fetcher'
import {
  CreatePurchaseResponseType,
  CreatePurchaseType,
  PurchaseType,
} from '@/types/purchase'
import {
  CreateSubscriptionResponseType,
  CreateSubscriptionType,
} from '@/types/subscription'

export const getPurchasesByUserId = async (): Promise<PurchaseType[]> => {
  return fetcher<PurchaseType[]>(`/purchases`)
}

export const createPurchase = async (
  purchase: CreatePurchaseType,
): Promise<CreatePurchaseResponseType> => {
  return fetcher<CreatePurchaseResponseType>('/purchases', {
    method: 'POST',
    body: JSON.stringify(purchase),
  })
}

export const createSubscription = async ({
  gameId,
  competitors,
  email,
}: CreateSubscriptionType & { email: string }): Promise<
  CreateSubscriptionResponseType
> => {
  return fetcher<CreateSubscriptionResponseType>('/purchases/subscribe', {
    method: 'POST',
    body: JSON.stringify({
      gameId,
      competitors,
      email,
    }),
  })
}
