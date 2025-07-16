import { useMutation, useQuery } from '@tanstack/react-query'
import { getCompetitorsByPurchase, setTicketRemeeded } from '../api/competitors-api'

const COMPETITORS_QUERY_KEY = ['competitors']

export const useCompetitorsQuery = (purchaseId: string) => {
  return useQuery({
    queryKey: [COMPETITORS_QUERY_KEY, purchaseId],
    queryFn: () => getCompetitorsByPurchase(purchaseId),
    enabled: !!purchaseId,
  })
}

export const useSetTicketRemeeded = () => {
  return useMutation({
    mutationFn: setTicketRemeeded,
  })
}
