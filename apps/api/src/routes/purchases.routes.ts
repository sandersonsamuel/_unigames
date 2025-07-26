import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { competitorsSchema } from "../schemas/competitors.schema";
import { purchaseWithGameSchema } from '../schemas/purchases.schema';
import { createPurchase, getPurchasesByUserId, updatePurchase } from '../services/purchases.service';
import { createPreference } from "../services/preference.service";
import { roleGuard } from "../plugins/role-guard.plugin";
import { Role } from "../types/role.types";
import { SupabaseJWT } from "../types/supabase.types";

export const purchaseRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/subscribe",
    {
      schema: {
        body: z.object({
          gameId: z.uuid(),
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
      preHandler: [roleGuard([Role.GAMER])]
    }, async (request, reply) => {

      const { competitors, email, gameId } = request.body;
      const { aud: userId } = request.user as SupabaseJWT

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

  app.get("/", {
    schema: {
      response: { 200: z.array(purchaseWithGameSchema) },
      tags: ["Purchases"],
      summary: "Get purchases by userId",
    },
    preHandler: [roleGuard([Role.GAMER])]
  }, async (request, reply) => {
    const { sub: userId } = request.user as SupabaseJWT
    const purchases = await getPurchasesByUserId(userId);
    reply.status(200).send(purchases);
  });
}
