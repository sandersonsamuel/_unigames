import z from "zod/v4";

export const dashboardOverviewSchema = z.object({
  totalPuchases: z.number(),
  paymentMethodsData: z.array(z.object({
    method: z.string(),
    purchases: z.number()
  })),
  ammount: z.number(),
  totalCompetitors: z.number(),
  totalGames: z.number()
});
