import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { db } from "../../db/connection";
import { schema } from "../../db/schemas/index";
import { and, eq, isNull } from 'drizzle-orm'

export const competitorsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get("/:purchaseId", {
    schema: {
      params: z.object({
        purchaseId: z.string()
      }),
      tags: ["Competitors"],
      summary: "Get a competitors by purchaseId",
      response: {
        200: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            registration: z.string().nullable(),
          })
        ),
        404: z.object({
          message: z.string(),
        }),
      },
    }
  }, async (request, reply) => {

    const { purchaseId } = request.params

    const purchase = await db.select({
      id: schema.purchases.id,
    }).from(schema.purchases)
      .where(and(
        eq(schema.purchases.id, purchaseId),
        isNull(schema.purchases.deletedAt)))

    if (!purchase || purchase.length === 0) {
      return reply.status(404).send({
        message: "Purchase not found"
      })
    }

    const competitors = await db.select({
      id: schema.competitors.id,
      name: schema.competitors.name,
      registration: schema.competitors.registration,
    }).from(schema.competitors).where(eq(schema.competitors.purchaseId, purchaseId))

    return reply.status(200).send(competitors)
  })

  app.patch("/:competitorId", {
    schema: {
      params: z.object({
        competitorId: z.string()
      }),
      tags: ["Competitors"],
      summary: "Set ticketRemeeded",
      response: {
        204: z.null(),
        403: z.object({
          message: z.string()
        })
      }
    }
  }, async (request, reply) => {

    const { competitorId } = request.params

    const competitor = await db.select({
      ticketRedeemed: schema.competitors.ticketRedeemed
    }).from(schema.competitors).where(eq(schema.competitors.id, competitorId))

    if (competitor[0].ticketRedeemed === true) {
      reply.status(403).send({ message: "Ticket ja resgatado!" })
    }

    await db.update(schema.competitors).set({
      ticketRedeemed: true
    }).where(eq(schema.competitors.id, competitorId))

    reply.status(204).send()
  })
}