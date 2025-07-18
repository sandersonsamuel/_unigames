import { db } from '../db/connection';
import { schema } from '../db/schemas';
import { desc, eq, sql, and, isNull } from 'drizzle-orm';

export async function listGames() {
  return await db.select().from(schema.games).orderBy(desc(schema.games.id));
}

export async function getGameById(id: string) {
  const game = await db.select({
    id: schema.games.id,
    name: schema.games.name,
    image: schema.games.image,
    price: schema.games.price,
    vacancies: schema.games.vacancies,
    competition: schema.games.competition,
    teamSize: schema.games.teamSize,
    description: schema.games.description,
    purchasesCount: sql`COUNT(${schema.purchases.id})`.mapWith(Number)
  })
    .from(schema.games)
    .leftJoin(schema.purchases, and(eq(schema.games.id, schema.purchases.gameId),
      isNull(schema.purchases.deletedAt),
      eq(schema.purchases.paymentStatus, "PAID")))
    .where(eq(schema.games.id, id))
    .groupBy(schema.games.id)
    .execute();
  return game[0] || null;
}

export async function createGame(data: any) {
  const newGame = await db.insert(schema.games).values(data).returning({
    id: schema.games.id,
    name: schema.games.name,
  });
  return newGame[0];
}

export async function deleteGame(id: string) {
  await db.delete(schema.games).where(eq(schema.games.id, id));
}

export async function updateGame(id: string, data: any) {
  await db.update(schema.games).set(data).where(eq(schema.games.id, id));
}
