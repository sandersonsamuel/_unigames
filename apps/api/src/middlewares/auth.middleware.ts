import { FastifyRequest, FastifyReply } from 'fastify'

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const ignoredPaths = ['/mp/webhook', '/health'];
    const url = request.raw.url ?? '';

    if (ignoredPaths.some(path => url.startsWith(path))) {
      return;
    }

    await request.jwtVerify()
  } catch {
    return reply.status(401).send({
      message: "Unauthorized"
    })
  }
}