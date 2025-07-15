import awsLambdaFastify from '@fastify/aws-lambda'
import fastifyCors from '@fastify/cors'
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import Fastify from 'fastify'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { competitorsRoutes } from './http/routes/competitors'
import { gameRoutes } from './http/routes/games'
import { mercadoPagoRoutes } from './http/routes/mercadopago'
import { purchaseRoutes } from './http/routes/purchases'

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

export const handler = awsLambdaFastify(app)
