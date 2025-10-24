import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { listGames, getGameById, createGame, deleteGame, updateGame } from '../services/games.service';
import { gameSchema } from "../schemas/game.schema";
import { roleGuard } from "../plugins/role-guard.plugin";
import { Role } from "../types/role.types";

export const gameRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get('/', {
    schema: {
      querystring: z.object({
        competition: z.string().optional(),
      }),
      response: {
        200: z.array(z.object({
          id: z.string(),
          name: z.string(),
          image: z.string(),
          price: z.number(),
          vacancies: z.number().nullable(),
          competition: z.boolean().nullable(),
          teamSize: z.number(),
          description: z.string(),
        }))
      },
      tags: ["Games"],
      summary: "List all games",
    },
  }, async (request, reply) => {
    const { competition } = request.query;
    console.log(competition);
    const isCompetition = competition === undefined ? undefined : competition === 'true';
    const games = await listGames(isCompetition);
    
    reply.status(200).send(games);
  });

  app.get('/:id', {
    schema: {
      params: z.object({ id: z.string() }),
      response: {
        200: z.object({
          id: z.string(),
          name: z.string(),
          image: z.string(),
          price: z.number(),
          vacancies: z.number().nullable(),
          competition: z.boolean().nullable(),
          teamSize: z.number(),
          description: z.string(),
          purchasesCount: z.number(),
        })
      },
      preHandler: [roleGuard([Role.ADMIN, Role.GAMER])],
      tags: ["Games"],
      summary: "Get a game by id",
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const game = await getGameById(id);
    if (!game) return reply.status(404).send();
    reply.status(200).send(game);
  });

  app.post('/', {
    schema: {
      body: gameSchema,
      response: {
        201: z.object({ id: z.string(), name: z.string() })
      },
      tags: ["Games"],
      summary: "Create a new game",
    },
    preHandler: [roleGuard([Role.ADMIN])]
  }, async (request, reply) => {
    const newGame = await createGame(request.body);
    reply.status(201).send(newGame);
  });

  app.delete('/:id', {
    schema: {
      params: z.object({ id: z.string() }),
      tags: ["Games"],
      summary: "Delete a game",
      response: { 204: z.null() }
    },
    preHandler: [roleGuard([Role.ADMIN])]
  }, async (request, reply) => {
    await deleteGame(request.params.id);
    reply.status(204).send();
  });

  app.put('/:id', {
    schema: {
      params: z.object({ id: z.string() }),
      body: gameSchema,
      tags: ["Games"],
      summary: "Update a game",
      response: { 204: z.null() }
    },
    preHandler: [roleGuard([Role.ADMIN])]
  }, async (request, reply) => {
    await updateGame(request.params.id, request.body);
    reply.status(204).send();
  });
}
