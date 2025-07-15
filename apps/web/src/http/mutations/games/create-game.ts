import { CreateGameType } from "@/@types/games";
import { apiClient } from "@/http/client";

export const createGameMutation = (game: CreateGameType) => {
  return apiClient('/games', {
    method: "POST",
    body: JSON.stringify(game),
  }).then((res) => res.json()) as Promise<CreateGameType>;
};