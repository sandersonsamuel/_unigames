import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { db } from "../../db/connection.js";
import { schema } from "../../db/schemas/index.js";
import { eq } from 'drizzle-orm'

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
      },
    }
  }, async (request, reply) => {

    const { purchaseId } = request.params

    const competitors = await db.select({
      id: schema.competitors.id,
      name: schema.competitors.name,
      registration: schema.competitors.registration,
    }).from(schema.competitors).where(eq(schema.competitors.purchaseId, purchaseId))

    reply.status(200).send(competitors)
  })
}