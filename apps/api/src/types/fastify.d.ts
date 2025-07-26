import { SupabaseJWT } from './supabase.types'

declare module 'fastify' {
  interface FastifyRequest {
    user: SupabaseJWT
  }
}
