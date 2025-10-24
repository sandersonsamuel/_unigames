import z from "zod/v4";

export const gameSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.url(),
  price: z.number().int().nonnegative(),
  vacancies: z.number().int().nonnegative().optional(),
  competition: z.boolean().optional(),
  teamSize: z.number().int().nonnegative(),
});

export const gameSchemaReponse = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.url(),
  price: z.number().int().positive(),
  vacancies: z.number().int().positive().nullable(),
  competition: z.boolean().nullable(),
  teamSize: z.number().int().positive(),
});
