import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { analyticsController } from "../controllers/analyticsController.js";
import {
  AnalyticsQuerySchema,
  DailyFlowResponseSchema,
  CategoryBreakdownResponseSchema,
} from "../schemas/analyticsSchema.js";

export const analyticsRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  app.get(
    "/analytics/daily-flow",
    {
      schema: {
        querystring: AnalyticsQuerySchema,
        response: {
          200: DailyFlowResponseSchema,
        },
      },
    },
    analyticsController.getDailyFlow,
  );

  app.get(
    "/analytics/category-breakdown",
    {
      schema: {
        querystring: AnalyticsQuerySchema,
        response: {
          200: CategoryBreakdownResponseSchema,
        },
      },
    },
    analyticsController.getCategoryBreakDown.bind(analyticsController),
  );
};
