import { FastifyRequest, FastifyReply } from 'fastify'

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const ignoredPaths = [
      { path: '/games', method: 'GET' },
      { path: '/mp/webhook', method: 'POST' },
      { path: '/health', method: 'GET' },
    ];

    const url = request.raw.url ?? '';
    const method = request.method;

    if (
      ignoredPaths.some(
        route => url === route.path && method === route.method
      )
    ) {
      return;
    }

    await request.jwtVerify()
  } catch {
    return reply.status(401).send({
      message: "Unauthorized"
    })
  }
}