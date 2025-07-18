import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { dashboardOverviewSchema } from '../schemas/dashboard.schema';
import { getDashboardOverview } from '../services/dashboard.service';

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
}
