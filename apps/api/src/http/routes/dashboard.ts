import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection";
import { schema } from "../../db/schemas";
import { eq, and, isNull } from "drizzle-orm";
import z from "zod/v4";

export const dashboardRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get('/overview', {
    schema: {
      summary: "Get Dashboard Overview",
      description: "Fetches an overview of the dashboard including total purchases, payment methods data, and total amount.",
      tags: ["Dashboard"],
      response: {
        200: z.object({
          totalPuchases: z.number(),
          paymentMethodsData: z.array(z.object({
            method: z.enum(schema.purchases.paymentMethod.enumValues),
            purchases: z.number()
          })),
          ammount: z.number(),
          totalCompetitors: z.number(),
          totalGames: z.number()
        })
      }
    }
  }, async (_, reply) => {

    const purchases = await db.select({
      id: schema.purchases.id,
      game: {
        price: schema.games.price,
      },
      paymentMethod: schema.purchases.paymentMethod,
    }).from(schema.purchases).leftJoin(schema.games, eq(schema.purchases.gameId, schema.games.id)).where(
      and(
        eq(schema.purchases.paymentStatus, 'PAID'),
        isNull(schema.purchases.deletedAt)
      )
    )

    const paymentMethodsData = schema.purchases.paymentMethod.enumValues.map((method) => {
      const methodPurchases = purchases.filter(p => p.paymentMethod === method);
      return {
        method,
        purchases: methodPurchases.length
      };
    })

    const ammount = purchases.reduce((acc, purchase) => {
      return acc + (purchase.game?.price || 0);
    }, 0);

    const totalCompetitors = await db.select({
      id: schema.competitors.id,
      name: schema.competitors.name,
    }).from(schema.competitors)

    const games = await db.select({
      id: schema.games.id
    }).from(schema.games).where(eq(schema.games.competition, true))

    return reply.status(200).send({
      totalPuchases: purchases.length,
      paymentMethodsData,
      ammount,
      totalCompetitors: totalCompetitors.length,
      totalGames: games.length
    })
  })
}