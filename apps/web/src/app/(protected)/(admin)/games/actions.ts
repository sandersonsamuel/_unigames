"use server";

import { CreateGameType } from '@/types/games'
import {
  createGame,
  deleteGame,
  getGameById,
  updateGame,
} from '@/http/api/games-api'
import { revalidateTag } from 'next/cache'

export const createGameAction = async (game: CreateGameType) => {
  await createGame(game)
  revalidateTag('get-games')
}

export const getGameByIdAction = async (gameId: string) => {
  return await getGameById(gameId)
}

export const deleteGameAction = async (gameId: string) => {
  await deleteGame(gameId)
  revalidateTag('get-games')
}

export const updateGameAction = async (
  gameId: string,
  game: CreateGameType,
) => {
  await updateGame(gameId, game)
  revalidateTag('get-games')
  revalidateTag(`get-game`)
}
