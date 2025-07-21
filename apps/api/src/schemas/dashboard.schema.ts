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

export const dashboardGetGamesStatsSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  teamSize: z.number(),
  teams: z.number(),
  competition: z.boolean().nullable(),
  vacancies: z.number().nullable(),
  image: z.string(),
  description: z.string(),
  competitorsCount: z.number(),
  revenue: z.number(),
  status: z.enum(["UNLIMITED", "AVAILABLE", "SOLD_OUT"]),
})

export const dashboardTicketsSchema = z.object({
  competitors: z.array(z.object({
    id: z.string(),
    name: z.string(),
    registration: z.string().nullable(),
    ticketRedeemed: z.boolean().nullable()
  })),
  competitorsPresent: z.number(),
  competitorsAbsent: z.number(),
  competitorsStudents: z.number()
})