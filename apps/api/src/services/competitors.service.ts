import { db } from '../db/connection';
import { schema } from '../db/schemas';
import { and, eq, isNull } from 'drizzle-orm';

export async function getCompetitorsByPurchaseId(purchaseId: string) {
  const purchase = await db.select({
    id: schema.purchases.id,
  }).from(schema.purchases)
    .where(and(
      eq(schema.purchases.id, purchaseId),
      isNull(schema.purchases.deletedAt)))

  if (!purchase || purchase.length === 0) {
    return null;
  }

  const competitors = await db.select({
    id: schema.competitors.id,
    name: schema.competitors.name,
    registration: schema.competitors.registration,
  }).from(schema.competitors).where(eq(schema.competitors.purchaseId, purchaseId))

  return competitors;
}

export async function getAllCompetitors() {
  return await db.select({
    id: schema.competitors.id,
    name: schema.competitors.name,
    registration: schema.competitors.registration,
    ticketRedeemed: schema.competitors.ticketRedeemed
  }).from(schema.competitors)
}

export async function setTicketRedeemed(competitorId: string) {
  const competitor = await db.select({
    ticketRedeemed: schema.competitors.ticketRedeemed
  }).from(schema.competitors).where(eq(schema.competitors.id, competitorId))

  if (competitor[0]?.ticketRedeemed === true) {
    return { error: 'Ticket ja resgatado!' };
  }

  await db.update(schema.competitors).set({
    ticketRedeemed: true
  }).where(eq(schema.competitors.id, competitorId))

  return { success: true };
}
