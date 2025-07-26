import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createPurchase,
  createSubscription,
  getPurchasesByUserId,
} from '../api/purchases-api'
import { CreateSubscriptionType } from '@/types/subscription'
import { getUser } from '@/app/actions/user'

const PURCHASES_QUERY_KEY = ['purchases']

export const usePurchasesByUserIdQuery = (userId?: string) => {
  return useQuery({
    queryKey: [PURCHASES_QUERY_KEY, userId],
    queryFn: () => getPurchasesByUserId(),
    enabled: !!userId,
    refetchOnWindowFocus: true,
  })
}

export const useCreatePurchaseMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PURCHASES_QUERY_KEY })
    },
  })
}

export const useCreateSubscriptionMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateSubscriptionType) => {
      const user = await getUser()
      if (!user) {
        throw new Error('User not found')
      }
      return createSubscription({ ...data, email: user.email! })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PURCHASES_QUERY_KEY })
    },
  })
}
