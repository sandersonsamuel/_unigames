import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { env } from './env'
import swaggerPlugin from './plugins/swagger.plugin'
import routes from './routes'

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

// app.addHook('onRequest', authMiddleware)

app.register(swaggerPlugin)

app.register(routes)

app.listen({ port: env.PORT, host: "0.0.0.0" }, (_, url) => {
  console.log(`Server running in ${url}`)
})
