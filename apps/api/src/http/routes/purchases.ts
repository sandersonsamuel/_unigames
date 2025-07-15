import { and, eq, isNull } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { MercadoPagoConfig, Preference } from "mercadopago";
import z from "zod/v4";
import { db } from "../../db/connection";
import { schema } from "../../db/schemas/index";
import { paymentMethod, paymentStatus } from "../../db/schemas/purchases";
import { env } from "../../env";
import { competitorsSchema } from "../../schemas/competitors";

const mpClient = new MercadoPagoConfig({
  accessToken: env.MP_ACCESS_TOKEN,
});

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
    },
    async (request, reply) => {
      const { gameId, userId, email, competitors } = request.body;

      const game = await db.query.games.findFirst({
        where: eq(schema.games.id, gameId),
      });

      if (!game) {
        return reply.status(404).send({ message: "Game not found" });
      }

      const purchase = await db
        .insert(schema.purchases)
        .values({
          gameId,
          userId,
        })
        .returning({
          id: schema.purchases.id,
        });

      const preference = new Preference(mpClient);
      const createdPreference = await preference.create({
        body: {
          external_reference: purchase[0].id,
          metadata: {
            competitors: competitors,
          },
          items: [
            {
              id: game.id,
              title: game.name,
              quantity: 1,
              currency_id: "BRL",
              unit_price: game.price / 100,
            },
          ],
          payer: {
            email: email,
          },
          payment_methods: {
            installments: 1,
            excluded_payment_types: [
              { id: "debit_card" },
              { id: "ticket" },
              { id: "atm" },
            ],
          },
          back_urls: {
            success: `${env.CLIENT_URL}/verify/checkout?status=success`,
            failure: `${env.CLIENT_URL}/verify/checkout?status=failure`,
            pending: `${env.CLIENT_URL}/verify/checkout?status=pending`,
          },
        },
        requestOptions: {
          idempotencyKey: purchase[0].id,
        },
      });

      if (!createdPreference.init_point || !createdPreference.id) {
        throw new Error("Failed to create payment preference");
      }

      await db
        .update(schema.purchases)
        .set({
          mpPaymentId: String(createdPreference.id),
        })
        .where(eq(schema.purchases.id, purchase[0].id));

      return reply.status(201).send({
        initPoint: createdPreference.init_point,
      });
    }
  );

  app.post(
    "/",
    {
      schema: {
        body: z.object({
          userId: z.uuid(),
          gameId: z.uuid(),
        }),
        tags: ["Purchases"],
        summary: "Create a new purchase",
        response: {
          201: z.object({
            id: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { gameId, userId } = request.body;

      const game = await db
        .select()
        .from(schema.games)
        .where(eq(schema.games.id, gameId));

      if (!game || game.length === 0) {
        return reply.status(404).send({
          message: "Game not found",
        });
      }

      const purchase = await db
        .insert(schema.purchases)
        .values({
          gameId,
          userId,
        })
        .returning({
          id: schema.purchases.id,
        });

      reply.status(201).send(purchase[0]);
    }
  );

  app.get(
    "/:userId",
    {
      schema: {
        params: z.object({
          userId: z.uuid(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              userId: z.string(),
              gameId: z.string(),
              game: z
                .object({
                  id: z.string(),
                  name: z.string(),
                  image: z.string(),
                  price: z.number(),
                })
                .nullable(),
              paymentMethod: z.enum(paymentMethod.enumValues).nullable(),
              paymentStatus: z.enum(paymentStatus.enumValues),
              mpPaymentId: z.string().nullable(),
              paidAt: z.string().nullable(),
            })
          ),
        },
        tags: ["Purchases"],
        summary: "Get a purchase by id",
      },
    },
    async (request, reply) => {
      const { userId } = request.params;

      const purchases = await db
        .select({
          id: schema.purchases.id,
          userId: schema.purchases.userId,
          gameId: schema.purchases.gameId,
          game: {
            id: schema.games.id,
            name: schema.games.name,
            image: schema.games.image,
            price: schema.games.price,
          },
          paymentMethod: schema.purchases.paymentMethod,
          paymentStatus: schema.purchases.paymentStatus,
          mpPaymentId: schema.purchases.mpPaymentId,
          paidAt: schema.purchases.paidAt,
        })
        .from(schema.purchases)
        .leftJoin(schema.games, eq(schema.purchases.gameId, schema.games.id))
        .where(and(eq(schema.purchases.userId, userId), isNull(schema.purchases.deletedAt)));

      reply.status(200).send(purchases);
    }
  );
};
