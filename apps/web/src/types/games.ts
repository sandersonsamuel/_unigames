import { createGamesSchema } from "@/schemas/games";
import { z } from "zod";

export type CreateGameType = z.infer<typeof createGamesSchema>;

export type GameResponseType = {
  id: string
  name: string
  image: string
}

export type GameInPurchaseType = GameResponseType & {
  price: number
}

export type GameType = Omit<GameByIdType, "purchasesCount">

export type GameByIdType = GameResponseType & {
  purchasesCount: number
  price: number
  description: string
  vacancies: number
  teamSize: number
  competition: boolean
}
