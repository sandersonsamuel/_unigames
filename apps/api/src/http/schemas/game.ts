import z from "zod/v4";

export const gameSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.url(),
  price: z.number().int().positive(),
  vacancies: z.number().int().positive().optional(),
  competition: z.boolean().optional(),
  teamSize: z.number().int().positive(),
})