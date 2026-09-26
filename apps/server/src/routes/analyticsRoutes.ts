import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { analyticsController } from "../controllers/analyticsController.js";
import {
  DailyFlowQuerySchema,
  DailyFlowResponseSchema,
} from "../schemas/analyticsSchema.js";

export const analyticsRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  app.get(
    "/analytics/daily-flow",
    {
      schema: {
        querystring: DailyFlowQuerySchema,
        response: {
          200: DailyFlowResponseSchema,
        },
      },
    },
    analyticsController.getDailyFlow,
  );
};
