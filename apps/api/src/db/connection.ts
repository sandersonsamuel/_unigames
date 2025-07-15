import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env.js'
import { schema } from './schemas/index.js'

export const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, {
  schema,
  casing: 'snake_case',
})
