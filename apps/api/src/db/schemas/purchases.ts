import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { games } from "./games"

export const paymentStatus = pgEnum("payment_status", ['PENDING', 'PAID', 'CANCELLED'])
export const paymentMethod = pgEnum("payment_method", ['PIX', 'CARD'])

export const purchases = pgTable("purchases", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull(),
  gameId: uuid().notNull().references(() => games.id),
  paymentMethod: paymentMethod('payment_method'),
  paymentStatus: paymentStatus('payment_status').notNull().default('PENDING'),
  mpPaymentId: varchar(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
})