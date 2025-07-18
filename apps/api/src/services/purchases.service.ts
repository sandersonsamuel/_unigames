import { db } from '../db/connection';
import { schema } from '../db/schemas';
import { eq, and, isNull } from 'drizzle-orm';

export async function createPurchase(data: { userId: string, gameId: string }) {
  const game = await db.select().from(schema.games).where(eq(schema.games.id, data.gameId));
  if (!game || game.length === 0) {
    return null;
  }
  const purchase = await db.insert(schema.purchases).values(data).returning({ id: schema.purchases.id });
  return purchase[0];
}

export async function getPurchasesByUserId(userId: string) {
  return await db.select({
    id: schema.purchases.id,
    userId: schema.purchases.userId,
    gameId: schema.purchases.gameId,
    paymentMethod: schema.purchases.paymentMethod,
    paymentStatus: schema.purchases.paymentStatus,
    mpPaymentId: schema.purchases.mpPaymentId,
    paidAt: schema.purchases.paidAt,
  }).from(schema.purchases).where(and(eq(schema.purchases.userId, userId), isNull(schema.purchases.deletedAt)));
}
