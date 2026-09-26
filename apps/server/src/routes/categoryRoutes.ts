import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { CategoryModel } from "../models/Category.js";
import { CategoryListResponseSchema } from "../schemas/categorySchema.js";
import { categoryController } from "../controllers/categoryControllers.js";

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
