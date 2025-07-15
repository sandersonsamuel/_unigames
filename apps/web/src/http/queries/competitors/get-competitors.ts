import { CompetitorsResponseType } from "@/@types/competitors"
import { apiClient } from "@/http/client"
import { useQuery } from "@tanstack/react-query"

export const useCompetitors = (purchaseId: string) => {
  return useQuery({
    queryKey: ['competitors'],
    queryFn: () => {
      return apiClient(`/competitors/${purchaseId}`).then((res) => res.json()) as Promise<CompetitorsResponseType[]>
    }
  })
}