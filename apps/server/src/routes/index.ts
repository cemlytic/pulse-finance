import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { categoryRoutes } from "./categoryRoutes.js";
import { transactionRoutes } from "./transactionRoutes.js";
import { analyticsRoutes } from "./analyticsRoutes.js";

export const appRouter: FastifyPluginAsync = async (app: FastifyInstance) => {
  await app.register(categoryRoutes);
  await app.register(transactionRoutes);
  await app.register(analyticsRoutes);
};
