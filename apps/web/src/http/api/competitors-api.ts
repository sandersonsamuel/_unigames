import { fetcher } from '@/lib/fetcher'
import { CompetitorsResponseType } from '@/types/competitors'

export const getCompetitorsByPurchase = async (
  purchaseId: string,
): Promise<CompetitorsResponseType[]> => {
  return fetcher<CompetitorsResponseType[]>(`/competitors/${purchaseId}`)
}

export const setTicketRemeeded = async (
  competitorId: string,
): Promise<void> => {
  await fetcher<void>(`/competitors/${competitorId}`, {
    method: 'PATCH',
    body: JSON.stringify({}),
  })
}
