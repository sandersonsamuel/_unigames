import { db } from '../db/connection';
import { schema } from '../db/schemas';
import { eq, and, isNull } from 'drizzle-orm';

export async function getDashboardOverview() {
  const purchases = await db.select({
    id: schema.purchases.id,
    game: { price: schema.games.price },
    paymentMethod: schema.purchases.paymentMethod,
  }).from(schema.purchases)
    .leftJoin(schema.games, eq(schema.purchases.gameId, schema.games.id))
    .where(and(eq(schema.purchases.paymentStatus, 'PAID'), isNull(schema.purchases.deletedAt)));

  const paymentMethodsData = schema.purchases.paymentMethod.enumValues.map((method) => {
    const methodPurchases = purchases.filter(p => p.paymentMethod === method);
    return { method, purchases: methodPurchases.length };
  });

  const ammount = purchases.reduce((acc, purchase) => acc + (purchase.game?.price || 0), 0);

  const totalCompetitors = await db.select({ id: schema.competitors.id, name: schema.competitors.name }).from(schema.competitors);
  const games = await db.select({ id: schema.games.id }).from(schema.games).where(eq(schema.games.competition, true));

  return {
    totalPuchases: purchases.length,
    paymentMethodsData,
    ammount,
    totalCompetitors: totalCompetitors.length,
    totalGames: games.length
  };
}
