import { fetcher } from '@/lib/fetcher'
import { CompetitorsResponseType } from '@/types/competitors'

export const getCompetitorsByPurchase = async (
  purchaseId: string,
): Promise<CompetitorsResponseType[]> => {
  return fetcher<CompetitorsResponseType[]>(`/competitors/${purchaseId}`)
}
