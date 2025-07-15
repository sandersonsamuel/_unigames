import Fastify from 'fastify'
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'
import { env } from './env'
import { gameRoutes } from './http/routes/games'
import { purchaseRoutes } from './http/routes/purchases'
import { mercadoPagoRoutes } from './http/routes/mercadopago'
import { competitorsRoutes } from './http/routes/competitors'

const app = Fastify()

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

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

app.get('/health', (_, reply) => {
  reply.send('Ok!')
})

app.listen({ port: env.PORT }, (_, url) => {
  console.log(`Server running in ${url}`)
})
