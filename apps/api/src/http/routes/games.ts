import { desc, eq, sql, and, isNull } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { db } from "../../db/connection";
import { schema } from "../../db/schemas/index";
import { gameSchema } from "../schemas/game";

export const gameRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get("/", {
    schema: {
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
    }
  }, async (_, reply) => {

    const games = await db.select().from(schema.games).orderBy(desc(schema.games.id))

    reply.status(200).send(games)
  })

  app.get("/:id", {
    schema: {
      params: z.object({
        id: z.string()
      }),
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
      tags: ["Games"],
      summary: "Get a game by id",
    }
  }, async (request, reply) => {
    const { id } = request.params;

    const game = await db.select({
      id: schema.games.id,
      name: schema.games.name,
      image: schema.games.image,
      price: schema.games.price,
      vacancies: schema.games.vacancies,
      competition: schema.games.competition,
      teamSize: schema.games.teamSize,
      description: schema.games.description,
      purchasesCount: sql`COUNT(${schema.purchases.id})`.mapWith(Number)
    })
      .from(schema.games)
      .leftJoin(schema.purchases, and(eq(schema.games.id, schema.purchases.gameId),
        isNull(schema.purchases.deletedAt),
        eq(schema.purchases.paymentStatus, "PAID")))
      .where(eq(schema.games.id, id))
      .groupBy(schema.games.id)
      .execute();

    if (!game || game.length === 0) {
      return reply.status(404).send();
    }

    reply.status(200).send(game[0]);
  });

  app.post("/", {
    schema: {
      body: gameSchema,
      response: {
        201: z.object({
          id: z.string(),
          name: z.string(),
        })
      },
      tags: ["Games"],
      summary: "Create a new game",
    }
  }, async (request, reply) => {

    const { description, image, name, price, vacancies, competition, teamSize } = request.body

    const newGame = await db.insert(schema.games).values({
      description,
      image,
      name,
      price,
      vacancies,
      competition,
      teamSize,
    }).returning({
      id: schema.games.id,
      name: schema.games.name,
    })

    reply.status(201).send(newGame[0])
  })

  app.delete("/:id", {
    schema: {
      params: z.object({
        id: z.string()
      }),
      tags: ["Games"],
      summary: "Delete a game",
      response: {
        204: z.null()
      }
    },
  }, async (request, reply) => {
    const { id } = request.params
    await db.delete(schema.games).where(eq(schema.games.id, id))
    reply.status(204).send()
  })

  app.put("/:id", {
    schema: {
      params: z.object({
        id: z.string()
      }),
      body: gameSchema,
      tags: ["Games"],
      summary: "Update a game",
      response: {
        204: z.null()
      }
    }
  }, async (request, reply) => {

    const { id } = request.params
    const { description, image, name, price, vacancies, competition, teamSize } = request.body

    await db.update(schema.games).set({
      description,
      image,
      name,
      price,
      vacancies,
      competition,
      teamSize,
    }).where(eq(schema.games.id, id))

    reply.status(204).send()
  })
}
