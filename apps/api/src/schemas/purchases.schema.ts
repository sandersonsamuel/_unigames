import z from "zod/v4";

export const purchaseSchema = z.object({
  userId: z.string(),
  gameId: z.string(),
});

export const subscribeSchema = z.object({
  gameId: z.string(),
  userId: z.string(),
  email: z.email(),
  competitors: z.array(z.object({
    name: z.string(),
    registration: z.string().optional(),
  })),
});
