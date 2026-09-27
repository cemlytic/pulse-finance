import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { CategoryListResponseSchema } from "../schemas/categorySchema.js";
import { categoryController } from "../controllers/categoryController.js";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { authenticate } from "../hooks/authenticate.js";

export const categoryRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();
  app.get(
    "/categories",
    {
      preHandler: [authenticate],
      schema: { response: { 200: CategoryListResponseSchema } },
    },
    categoryController.getCategories.bind(categoryController),
  );
};
