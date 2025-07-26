import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { getCompetitorsByPurchaseId, setTicketRedeemed } from '../services/competitors.service';
import { roleGuard } from "../plugins/role-guard.plugin";
import { Role } from "../types/role.types";

export const competitorsRoutes: FastifyPluginAsyncZod = async (app) => {

  app.get('/:purchaseId', {
    schema: {
      params: z.object({ purchaseId: z.string() }),
      tags: ["Competitors"],
      summary: "Get competitors by purchaseId",
      response: {
        200: z.array(z.object({ id: z.string(), name: z.string(), registration: z.string().nullable() })),
        404: z.object({ message: z.string() })
      }
    },
    preHandler: [roleGuard([Role.GAMER])]
  }, async (request, reply) => {
    const { purchaseId } = request.params;
    const competitors = await getCompetitorsByPurchaseId(purchaseId);
    if (!competitors) {
      return reply.status(404).send({ message: "Purchase not found" });
    }
    return reply.status(200).send(competitors);
  });

  app.patch('/:competitorId', {
    schema: {
      params: z.object({ competitorId: z.string() }),
      tags: ["Competitors"],
      summary: "Set ticketRedeemed",
      response: {
        204: z.null(),
        403: z.object({ message: z.string() })
      }
    },
    preHandler: [roleGuard([Role.ADMIN])]
  }, async (request, reply) => {
    const { competitorId } = request.params;
    const result = await setTicketRedeemed(competitorId);
    if (result.error) {
      return reply.status(403).send({ message: result.error });
    }
    return reply.status(204).send();
  });
}
