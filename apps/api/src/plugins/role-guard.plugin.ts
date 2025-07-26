import { FastifyReply, FastifyRequest } from "fastify";
import { Role } from "../types/role.types";
import { SupabaseJWT } from "../types/supabase.types";

export const roleGuard = (allowedRoles: Role[]) => {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const user = request.user as SupabaseJWT
    if (!user || !allowedRoles.includes(user.user_metadata.role as Role)) {
      return reply.status(403).send({ message: "Acesso negado." })
    }
  }
}