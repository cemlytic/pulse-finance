import { FastifyReply, FastifyRequest } from "fastify";
import { analyticsService } from "../services/analyticsService.js";
import { AnalyticsQueryType } from "../schemas/analyticsSchema.js";

export class AnalyticsController {
  async getDailyFlow(
    request: FastifyRequest<{ Querystring: AnalyticsQueryType }>,
    reply: FastifyReply,
  ) {
    try {
      const data = await analyticsService.getDailyFlow(request.query);
      return reply.code(200).send(data);
    } catch (error) {
      request.log.error(error, "Failed to aggregate daily flow analytics");
      return reply.internalServerError("Could not calculate analytics.");
    }
  }

  async getCategoryBreakDown(
    request: FastifyRequest<{ Querystring: AnalyticsQueryType }>,
    reply: FastifyReply,
  ) {
    try {
      const data = await analyticsService.getCategoryBreakDown(request.query);
      return reply.code(200).send(data);
    } catch (error) {
      request.log.error(error, "Failed to aggregate category breakdown");
      return reply.internalServerError(
        "Could not calculate category breakdown",
      );
    }
  }
}

export const analyticsController = new AnalyticsController();
