import { GameResponseType } from "@/@types/games";
import { apiClient } from "../../client";

export const getGamesQuery = (boolean: boolean = true) => apiClient("/games", {
  next: {
    tags: ['get-games']
  }
}).then((res) => res.json()) as Promise<GameResponseType[]>