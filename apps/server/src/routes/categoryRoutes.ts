import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { CategoryListResponseSchema } from "../schemas/categorySchema.js";
import { categoryController } from "../controllers/categoryController.js";

export const categoryRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  app.get(
    "/categories",
    {
      schema: { response: { 200: CategoryListResponseSchema } },
    },
    categoryController.getCategories.bind(categoryController),
  );
};
