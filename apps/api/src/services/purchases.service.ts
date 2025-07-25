import { db } from '../db/connection';
import { schema } from '../db/schemas';
import { eq, and, isNull, or, ne, gt, sql, InferSelectModel } from 'drizzle-orm';
import createError from 'http-errors';
import { purchases } from '../db/schemas/purchases';

export type PurchaseType = InferSelectModel<typeof purchases>
export type CreatePurchaseResponse = {
  purchaseId: string
  game: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    vacancies: number | null;
    competition: boolean | null;
    teamSize: number;
  }
}

export async function createPurchase(data: { userId: string, gameId: string }): Promise<CreatePurchaseResponse> {
  const game = await db.select().from(schema.games).where(eq(schema.games.id, data.gameId));

  if (!game || game.length === 0) {
    throw new createError.NotFound("Game não encontrado.")
  }

  const purchase = await db.insert(schema.purchases).values(data).returning({ id: schema.purchases.id });

  return {
    purchaseId: purchase[0].id,
    game: game[0]
  }
}

export const updatePurchase = async (id: string, payload: Partial<Omit<PurchaseType, "id">>) => {

  const purchase = await db.select({ id: schema.purchases.id })
    .from(schema.purchases)
    .where(eq(schema.purchases.id, id))

  if (purchase.length == 0) {
    return createError.NotFound("Não foi possivel encontrar a compra.")
  }

  return db.update(schema.purchases).set(payload).where(eq(schema.purchases.id, id))
}

export async function getPurchasesByUserId(userId: string) {
  const oneHourAgo = sql`now() - interval '1 hour'`

  return await db.select({
    id: schema.purchases.id,
    userId: schema.purchases.userId,
    gameId: schema.purchases.gameId,
    paymentMethod: schema.purchases.paymentMethod,
    paymentStatus: schema.purchases.paymentStatus,
    mpPaymentId: schema.purchases.mpPaymentId,
    paidAt: schema.purchases.paidAt,
    initPoint: schema.purchases.initPoint,
    game: {
      id: schema.games.id,
      name: schema.games.name,
      image: schema.games.image,
      price: schema.games.price
    }
  })
    .from(schema.purchases)
    .leftJoin(schema.games, eq(schema.games.id, schema.purchases.gameId))
    .where(and(
      eq(schema.purchases.userId, userId),
      isNull(schema.purchases.deletedAt),
      or(
        ne(schema.purchases.paymentStatus, 'PENDING'),
        gt(schema.purchases.createdAt, oneHourAgo)
      )
    ))
}
