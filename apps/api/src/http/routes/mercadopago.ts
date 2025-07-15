import { eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { MercadoPagoConfig, Payment } from "mercadopago";
import z from "zod/v4";
import { db } from "../../db/connection";
import { schema } from "../../db/schemas/index";
import { env } from "../../env";
import { verifyMercadoPagoSignature } from "../../http/security/mercadopago-signature";
import { competitorsType } from "../../schemas/competitors";

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
        console.log("--- [Mercado Pago Webhook] ---");
        console.log("Request Headers:", JSON.stringify(request.headers, null, 2));
        console.log("Request Body:", JSON.stringify(request.body, null, 2));

        const isValid = verifyMercadoPagoSignature(request);

        console.log(`Signature validation result: ${isValid}`);

        if (!isValid) {
          console.error("Signature verification failed. Aborting.");
          return reply.status(401).send({ error: "Invalid signature" });
        }

        console.log("Signature successfully verified.");

        const { type, data } = request.body as { type: string; data: { id: string } }

        switch (type) {
          case "payment":
            const payment = new Payment(client);
            const paymentData = await payment.get({ id: data.id });

            if (!paymentData) {
              console.log("Payment data not found");
              return reply.status(404).send({ message: "Payment data not found" });
            }

            console.log(paymentData)

            const purchases = await db.select({
              id: schema.purchases.id,
            }).from(schema.purchases).where(eq(schema.purchases.id, paymentData.external_reference!))

            const purchase = purchases[0]

            if (!purchase) {
              console.log("Purchase not found");
              return reply.status(404).send({ message: "Purchase not found" });
            }

            if (paymentData.status === "approved" && paymentData.date_approved) {

              const paymentMethod = paymentData.payment_type_id === "credit_card" ? "CARD" : "PIX"
              const competitors = paymentData.metadata.competitors as competitorsType

              await db
                .update(schema.purchases)
                .set({
                  paymentStatus: "PAID",
                  paymentMethod: paymentMethod,
                  paidAt: new Date(paymentData.date_approved).toISOString(),
                })
                .where(eq(schema.purchases.id, purchase.id));

              if (competitors.length > 0) {
                await db.insert(schema.competitors).values(competitors.map((competitor) => ({
                  ...competitor,
                  purchaseId: purchase.id
                })))
              }
            }

            if (paymentData.status === "expired" || paymentData.status === "cancelled") {
              await db
                .update(schema.purchases)
                .set({
                  paymentStatus: "CANCELLED",
                  deletedAt: new Date().toString(),
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
