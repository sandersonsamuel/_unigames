import MercadoPagoConfig, { Preference } from "mercadopago";
import z from "zod/v4";
import { env } from "../env";
import { competitorsSchema } from "../schemas/competitors.schema";
import { gameSchemaReponse } from "../schemas/game.schema";

const mpClient = new MercadoPagoConfig({
  accessToken: env.MP_ACCESS_TOKEN,
});

export type GameType = z.infer<typeof gameSchemaReponse> & {
  id: string;
}

export type CompetitorType = z.infer<typeof competitorsSchema>

export const createPreference = async (purchaseId: string, game: GameType, competitors: CompetitorType, email: string) => {
  const preference = new Preference(mpClient);
  const now = new Date()

  return await preference.create({
    body: {
      date_of_expiration: new Date(now.getTime() + (60 * 60 * 1000)).toISOString(), //1h
      external_reference: purchaseId,
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
      idempotencyKey: purchaseId,
    },
  });
}