import { newSubscriptionSchema } from "@/schemas/subscription";
import z from "zod";
import { PersonsType } from "./purchase";

export type SubscriptionType = z.infer<typeof newSubscriptionSchema>;

export type CreateSubscriptionType = {
  gameId: string;
  competitors: PersonsType[];
};

export type CreateSubscriptionResponseType = {
  initPoint: string;
};
