import { GameByIdType } from "@/@types/games"
import { apiClient } from "@/http/client"

export const getGameByIdQuery = (gameId: string) => {
  return apiClient(`/games/${gameId}`, {
    next: {
      tags: ['get-game']
    }
  }).then((res) => res.json()) as Promise<GameByIdType>
}