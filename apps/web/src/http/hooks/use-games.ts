import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createGame, deleteGame, getGameById, getGames, updateGame } from '../api/games-api'
import { CreateGameType } from '@/types/games'
import { revalidateTagAction } from '@/app/actions/revalidate'

const GAMES_QUERY_KEY = ['games']

export const useGamesQuery = () => {
  return useQuery({
    queryKey: GAMES_QUERY_KEY,
    queryFn: getGames,
  })
}

export const useGameByIdQuery = (gameId: string) => {
  return useQuery({
    queryKey: [...GAMES_QUERY_KEY, gameId],
    queryFn: () => getGameById(gameId),
    enabled: !!gameId,
  })
}

export const useCreateGameMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GAMES_QUERY_KEY })
      revalidateTagAction("get-games")
    },
  })
}

export const useUpdateGameMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ gameId, game }: { gameId: string; game: CreateGameType }) =>
      updateGame(gameId, game),
    onSuccess: (_, { gameId }) => {
      revalidateTagAction("get-games")
      queryClient.invalidateQueries({ queryKey: GAMES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: [...GAMES_QUERY_KEY, gameId] })
    },
  })
}

export const useDeleteGameMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GAMES_QUERY_KEY })
    },
  })
}
