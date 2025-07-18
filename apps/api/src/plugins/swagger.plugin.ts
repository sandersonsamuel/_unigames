import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fp from 'fastify-plugin';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export default fp(async (app) => {
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
})