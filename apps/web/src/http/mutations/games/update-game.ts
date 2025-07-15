import { Game } from "@prisma/client";

export const updateGameMutation = async (gameId: string, game: Game) => {
  return fetch(`/games/${gameId}`, {
    method: "PUT",
    body: JSON.stringify(game),
  }).then((res) => res.json());
};