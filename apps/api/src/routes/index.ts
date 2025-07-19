import fp from 'fastify-plugin';
import { gameRoutes } from './games.routes';
import { purchaseRoutes } from './purchases.routes';
import { mercadoPagoRoutes } from './mercadopago.routes';
import { competitorsRoutes } from './competitors.routes';
import { dashboardRoutes } from './dashboard.routes';
import z from 'zod/v4';

export default fp(async (app) => {
  app.register(gameRoutes, {
    prefix: "games"
  })

  app.register(purchaseRoutes, {
    prefix: "purchases"
  })

  app.register(mercadoPagoRoutes, {
    prefix: "mp"
  })

  app.register(competitorsRoutes, {
    prefix: "competitors"
  })

  app.register(dashboardRoutes, {
    prefix: "dashboard"
  })

  app.get('/health', {
    schema: {
      response: {
        200: z.string().default("ok")
      },
      tags: ["App"],
      summary: "Health check",
      description: "Checks if the API is running and returns a simple 'Ok!' message."
    }
  }, (_, reply) => {
    reply.send('Ok!')
  })
})