import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { mercadoPagoWebhookSchema } from '../schemas/mercadopago.schema';
import { handleMercadoPagoWebhook } from '../services/mercadopago.service';

export const mercadoPagoRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('/webhook', {
    schema: {
      tags: ["Mercado Pago"],
      summary: "Webhook for Mercado Pago events",
      body: mercadoPagoWebhookSchema,
      response: {
        200: z.object({ received: z.boolean() }),
        404: z.object({ message: z.string() }),
        500: z.object({ error: z.string() }),
      },
    },
  }, async (request, reply) => {
    try {
      const { type, data, action } = request.body;
      const result = await handleMercadoPagoWebhook(type, data, action);
      if (result.error) return reply.status(404).send({ message: result.error });
      return reply.status(200).send({ received: true });
    } catch (error) {
      return reply.status(500).send({ error: 'Webhook handler failed' });
    }
  });
}
