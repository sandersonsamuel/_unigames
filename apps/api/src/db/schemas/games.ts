import { boolean, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const games = pgTable("games", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  description: varchar().notNull(),
  image: varchar().notNull(),
  price: integer().notNull(),
  vacancies: integer(),
  competition: boolean().default(true),
  teamSize: integer().notNull(),
})