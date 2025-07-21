import { and, count, eq, isNull } from 'drizzle-orm';
import xlsx from 'xlsx';
import { db } from '../db/connection';
import { schema } from '../db/schemas';

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

  const totalCompetitors = await db.select({ id: schema.competitors.id, name: schema.competitors.name })
    .from(schema.competitors);

  const games = await db.select({ id: schema.games.id }).from(schema.games)
    .where(eq(schema.games.competition, true));

  return {
    totalPuchases: purchases.length,
    paymentMethodsData,
    ammount,
    totalCompetitors: totalCompetitors.length,
    totalGames: games.length
  };
}

export const getGamesStats = async () => {
  let games = await db.select({
    id: schema.games.id,
    name: schema.games.name,
    price: schema.games.price,
    teamSize: schema.games.teamSize,
    teams: count(schema.purchases.id).as('teams'),
    competition: schema.games.competition,
    vacancies: schema.games.vacancies,
    image: schema.games.image,
    description: schema.games.description
  }).from(schema.games)
    .leftJoin(schema.purchases,
      and(
        eq(schema.purchases.gameId, schema.games.id),
        eq(schema.purchases.paymentStatus, "PAID"),
        isNull(schema.purchases.deletedAt)))
    .groupBy(schema.games.id)

  return games.map((game) => ({
    ...game,
    competitorsCount: game.teams * game.teamSize,
    revenue: game.teams * game.price,
    status: !game.competition ? "UNLIMITED" :
      game.competition &&
        (game.teams < (game.vacancies || 0)) ? "AVAILABLE" : "SOLD_OUT" as "UNLIMITED" | "AVAILABLE" | "SOLD_OUT"
  }))
}

export const getStudentsSheet = async (isPresent?: boolean) => {
  // const conditions = [isNotNull(schema.competitors.registration)]

  // if (typeof isPresent === 'boolean') {
  //   conditions.push(eq(schema.competitors.ticketRedeemed, isPresent))
  // }

  const students = await db.select({
    nome: schema.competitors.name,
    matricula: schema.competitors.registration,
    presente: schema.competitors.ticketRedeemed,
  })
    .from(schema.competitors)
  // .where(and(...conditions))

  const sheet = xlsx.utils.json_to_sheet(students)
  const workbook = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(workbook, sheet, "Alunos");
  xlsx.writeFile(workbook, "alunos.xlsx");

  const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

  return buffer
}
