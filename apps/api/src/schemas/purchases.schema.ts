import z from "zod/v4";
import { paymentMethod, paymentStatus } from "../db/schemas/purchases";

export const purchaseSchema = z.object({
  id: z.string(),
  paymentMethod: z.enum(paymentMethod.enumValues).nullable(),
  paymentStatus: z.enum(paymentStatus.enumValues),
  userId: z.string(),
  gameId: z.string(),
  mpPaymentId: z.string().nullable(),
  paidAt: z.date().nullable(),
  game: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    image: z.string()
  }).nullable()
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
