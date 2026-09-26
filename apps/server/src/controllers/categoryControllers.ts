import { FastifyReply, FastifyRequest } from "fastify";
import { categoryService } from "../services/categoryService.js";

export class CategoryController {
  async getCategories(request: FastifyRequest, reply: FastifyReply) {
    try {
      const categories = await categoryService.getAllCategories();
      return reply.code(200).send(categories);
    } catch (error) {
      request.log.error(error, "Failed to retrieve categories");
      return reply.internalServerError("Could not fetch categories");
    }
  }
}

export const categoryController = new CategoryController();
