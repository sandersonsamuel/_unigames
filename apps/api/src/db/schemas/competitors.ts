import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { purchases } from "./purchases.js";

export const competitors = pgTable("competitors", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  registration: varchar(),
  ticketRedeemed: boolean().default(false),
  purchaseId: uuid().references(() => purchases.id),
})