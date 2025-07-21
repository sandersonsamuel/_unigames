import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { dashboardGetGamesStatsSchema, dashboardOverviewSchema, dashboardTicketsSchema } from '../schemas/dashboard.schema';
import { getAllCompetitors } from "../services/competitors.service";
import { getDashboardOverview, getGamesStats, getStudentsSheet } from '../services/dashboard.service';

export const dashboardRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get('/overview', {
    schema: {
      summary: "Get Dashboard Overview",
      description: "Fetches an overview of the dashboard including total purchases, payment methods data, and total amount.",
      tags: ["Dashboard"],
      response: { 200: dashboardOverviewSchema }
    }
  }, async (_, reply) => {
    const overview = await getDashboardOverview();
    reply.status(200).send(overview);
  });

  app.get("/tickets", {
    schema: {
      response: {
        200: dashboardTicketsSchema
      },
      tags: ["Dashboard"],
      summary: "Get competitors"
    }
  }, async (_, reply) => {
    const competitors = await getAllCompetitors();
    const competitorsPresent = competitors.filter((competitor) => competitor.ticketRedeemed).length;
    const competitorsAbsent = competitors.filter((competitor) => !competitor.ticketRedeemed).length;
    const competitorsStudents = competitors.filter((competitor) => competitor.registration).length;

    reply.status(200).send({
      competitors,
      competitorsPresent,
      competitorsAbsent,
      competitorsStudents
    });
  })

  app.get("/games", {
    schema: {
      tags: ["Dashboard"],
      summary: "Get game stats",
      response: {
        200: z.array(dashboardGetGamesStatsSchema)
      }
    }
  }, async (_, reply) => {
    const games = await getGamesStats()
    reply.status(200).send(games)
  })

  app.get('/competitors/sheet', {
    schema: {
      querystring: z.object({
        isPresent: z
          .string()
          .optional()
          .transform((val) => {
            if (val === "true") return true
            if (val === "false") return false
            return undefined
          }),
      }),
      tags: ["Dashboard"],
      summary: "Get students sheet",
    }
  }, async (request, reply) => {

    const { isPresent } = request.query
    const buffer = await getStudentsSheet(isPresent);

    reply
      .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
      .header("Content-Disposition", 'attachment; filename="unigames-participantes.xlsx"')
      .send(buffer);
  })
}
