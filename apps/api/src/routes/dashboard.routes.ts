import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { dashboardOverviewSchema } from '../schemas/dashboard.schema';
import { getDashboardOverview, getStudentsSheet } from '../services/dashboard.service';
import { getAllCompetitors } from "../services/competitors.service";

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
        200: z.object({
          competitors: z.array(z.object({
            id: z.string(),
            name: z.string(),
            registration: z.string().nullable(),
            ticketRedeemed: z.boolean().nullable()
          })),
          competitorsPresent: z.number(),
          competitorsAbsent: z.number(),
          competitorsStudents: z.number()
        })
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
