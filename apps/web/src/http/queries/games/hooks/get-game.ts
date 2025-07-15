"use client"

import { useQuery } from "@tanstack/react-query";
import { getGameByIdQuery } from "../get-game";

export const useGetGame = (gameId: string) => {
  return useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGameByIdQuery(gameId),
  });
}