import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { analyticsController } from "../controllers/analyticsController.js";
import {
  AnalyticsQuerySchema,
  DailyFlowResponseSchema,
  CategoryBreakdownResponseSchema,
} from "../schemas/analyticsSchema.js";
import { authenticate } from "../hooks/authenticate.js";

export const analyticsRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

  app.get(
    "/analytics/daily-flow",
    {
      preHandler: [authenticate],
      schema: {
        querystring: AnalyticsQuerySchema,
        response: {
          200: DailyFlowResponseSchema,
        },
      },
    },
    analyticsController.getDailyFlow.bind(analyticsController),
  );

  app.get(
    "/analytics/category-breakdown",
    {
      preHandler: [authenticate],
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
