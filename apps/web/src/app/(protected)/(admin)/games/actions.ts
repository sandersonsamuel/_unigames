"use server";

import { CreateGameType } from "@/@types/games";
import { createGameMutation } from "@/http/mutations/games/create-game";
import { deleteGameMutation } from "@/http/mutations/games/delete-game";
import { updateGameMutation } from "@/http/mutations/games/update-game";
import { getGameByIdQuery } from "@/http/queries/games/get-game";
import { Game } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const createGameAction = async (game: CreateGameType) => {
  await createGameMutation(game)
  revalidateTag('get-games')
};

export const getGameByIdAction = async (gameId: string) => {
  return await getGameByIdQuery(gameId);
};

export const deleteGameAction = async (gameId: string) => {
  await deleteGameMutation(gameId);
  revalidateTag('get-games')
};

export const updateGameAction = async (gameId: string, game: Game) => {
  await updateGameMutation(gameId, game);
  revalidateTag('get-games')
};
