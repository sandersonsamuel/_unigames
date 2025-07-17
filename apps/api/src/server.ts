import fastifyCors from '@fastify/cors'
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import Fastify from 'fastify'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { env } from './env'
import { competitorsRoutes } from './http/routes/competitors'
import { dashboardRoutes } from './http/routes/dashboard'
import { gameRoutes } from './http/routes/games'
import { mercadoPagoRoutes } from './http/routes/mercadopago'
import { purchaseRoutes } from './http/routes/purchases'
import { fastifyJwt } from '@fastify/jwt'
import { authMiddleware } from './http/middlewares/auth'

const app = Fastify()

app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "PATCH", "POST", "PUT", "DELETE"]
});

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.addHook('onRequest', authMiddleware)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Unigames API',
      description: 'API for unigames event',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform
}
)

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

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

app.get('/health', (_, reply) => {
  reply.send('Ok!')
})

app.listen({ port: env.PORT, host: "0.0.0.0" }, (_, url) => {
  console.log(`Server running in ${url}`)
})
