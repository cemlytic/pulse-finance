import { FastifyReply, FastifyRequest } from "fastify";
import { analyticsService } from "../services/analyticsService.js";
import { DailyFlowQueryType } from "../schemas/analyticsSchema.js";

export class AnalyticsController {
  async getDailyFlow(
    request: FastifyRequest<{ Querystring: DailyFlowQueryType }>,
    reply: FastifyReply,
  ) {
    try {
      const data = await analyticsService.getDailyFlow(request.query);
      return reply.code(200).send(data);
    } catch (error) {
      request.log.error("Failed to aggregate daily flow analytics");
      return reply.internalServerError("Could not calculate analytics.");
    }
  }
}

export const analyticsController = new AnalyticsController();
