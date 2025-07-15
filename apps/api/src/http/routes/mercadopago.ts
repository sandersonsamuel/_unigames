import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { db } from "../../db/connection.js";
import { schema } from "../../db/schemas/index.js";
import { eq } from "drizzle-orm";
import { env } from "../../env.js";
import { verifyMercadoPagoSignature } from "../../http/security/mercadopago-signature.js";

const client = new MercadoPagoConfig({
  accessToken: env.MP_ACCESS_TOKEN,
});

export const mercadoPagoRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/webhook",
    {
      schema: {
        tags: ["Mercado Pago"],
        summary: "Webhook for Mercado Pago events",
        body: z.object({
          type: z.string(),
          data: z.object({
            id: z.string(),
          }),
        }),
        response: {
          200: z.object({
            received: z.boolean(),
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const isValid = verifyMercadoPagoSignature(request);
        if (!isValid) {
          return reply.status(401).send({ error: "Invalid signature" });
        }

        const { type, data } = request.body as { type: string; data: { id: string } }

        switch (type) {
          case "payment":
            const payment = new Payment(client);
            const paymentData = await payment.get({ id: data.id });

            if (!paymentData) {
              return reply.status(404).send({ message: "Payment not found" });
            }

            const purchases = await db.select({
              id: schema.purchases.id,
            }).from(schema.purchases).where(eq(schema.purchases.id, paymentData.external_reference!))

            const purchase = purchases[0]

            if (!purchase) {
              console.log("Purchase not found");
              return reply.status(404).send({ message: "Purchase not found" });
            }

            if (paymentData.status === "approved" && paymentData.date_approved) {
              await db
                .update(schema.purchases)
                .set({
                  paymentStatus: "PAID",
                  paidAt: new Date(paymentData.date_approved).toISOString(),
                })
                .where(eq(schema.purchases.id, purchase.id));
            }

            if (paymentData.status === "expired" || paymentData.status === "cancelled") {
              await db
                .update(schema.purchases)
                .set({
                  paymentStatus: "CANCELLED",
                })
                .where(eq(schema.purchases.id, purchase.id));
            }
            break;
          default:
            console.log("Unhandled event type:", type);
        }

        return reply.status(200).send({ received: true });
      } catch (error) {
        console.error("Error handling webhook:", error);
        return reply.status(500).send({ error: "Webhook handler failed" });
      }
    }
  );
};
