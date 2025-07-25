import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { competitorsSchema } from "../schemas/competitors.schema";
import { purchaseWithGameSchema } from '../schemas/purchases.schema';
import { createPurchase, getPurchasesByUserId, updatePurchase } from '../services/purchases.service';
import { createPreference } from "../services/preference.service";

export const purchaseRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/subscribe",
    {
      schema: {
        body: z.object({
          gameId: z.uuid(),
          userId: z.uuid(),
          email: z.email(),
          competitors: competitorsSchema,
        }),
        tags: ["Purchases"],
        summary: "Create a new subscription (payment preference)",
        response: {
          201: z.object({
            initPoint: z.url(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    }, async (request, reply) => {

      const { competitors, email, gameId, userId } = request.body;

      const { game, purchaseId } = await createPurchase({
        userId,
        gameId,
      });

      const createdPreference = await createPreference(purchaseId, game, competitors, email);

      if (!createdPreference.init_point || !createdPreference.id) {
        throw new Error("Failed to create payment preference");
      }

      await updatePurchase(purchaseId, {
        mpPaymentId: createdPreference.id,
        initPoint: createdPreference.init_point
      })

      return reply.status(201).send({
        initPoint: createdPreference.init_point,
      });
    }
  )

  app.get('/:userId', {
    schema: {
      params: z.object({ userId: z.string() }),
      response: { 200: z.array(purchaseWithGameSchema) },
      tags: ["Purchases"],
      summary: "Get purchases by userId",
    }
  }, async (request, reply) => {
    const purchases = await getPurchasesByUserId(request.params.userId);
    reply.status(200).send(purchases);
  });
}
