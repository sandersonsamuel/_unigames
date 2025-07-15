import { fetcher } from '@/lib/fetcher'
import { CreateGameType, GameByIdType, GameResponseType } from '@/types/games'

export const getGames = async (competitor: boolean = true): Promise<GameResponseType[]> => {
  return fetcher<GameResponseType[]>('/games')
}

export const getGameById = async (gameId: string): Promise<GameByIdType> => {
  return fetcher<GameByIdType>(`/games/${gameId}`)
}

export const createGame = async (game: CreateGameType): Promise<CreateGameType> => {
  return fetcher<CreateGameType>('/games', {
    method: 'POST',
    body: JSON.stringify(game),
  })
}

export const updateGame = async (
  gameId: string,
  game: CreateGameType,
): Promise<void> => {
  await fetcher<void>(`/games/${gameId}`, {
    method: 'PUT',
    body: JSON.stringify(game),
  })
}

export const deleteGame = async (gameId: string): Promise<void> => {
  await fetcher<void>(`/games/${gameId}`, {
    method: 'DELETE',
  })
}
