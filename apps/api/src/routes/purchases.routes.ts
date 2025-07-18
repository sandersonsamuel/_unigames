import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { purchaseSchema } from '../schemas/purchases.schema';
import { createPurchase, getPurchasesByUserId } from '../services/purchases.service';

export const purchaseRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('/', {
    schema: {
      body: purchaseSchema,
      response: { 201: z.object({ id: z.string() }), 404: z.object({ message: z.string() }) },
      tags: ["Purchases"],
      summary: "Create a new purchase",
    }
  }, async (request, reply) => {
    const purchase = await createPurchase(request.body);
    if (!purchase) return reply.status(404).send({ message: "Game not found" });
    reply.status(201).send(purchase);
  });

  app.get('/:userId', {
    schema: {
      params: z.object({ userId: z.string() }),
      response: { 200: z.array(purchaseSchema) },
      tags: ["Purchases"],
      summary: "Get purchases by userId",
    }
  }, async (request, reply) => {
    const purchases = await getPurchasesByUserId(request.params.userId);
    reply.status(200).send(purchases);
  });
}
