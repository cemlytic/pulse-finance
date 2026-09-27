import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { transactionController } from "../controllers/transactionController.js";
import {
  CreateTransactionBodySchema,
  TransactionResponseSchema,
  GetTransactionsQuerySchema,
  TransactionListResponseSchema,
} from "../schemas/transactionSchema.js";
import { authenticate } from "../hooks/authenticate.js";

export const transactionRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();
  app.post(
    "/transactions",
    {
      preHandler: [authenticate],
      schema: {
        body: CreateTransactionBodySchema,
        response: {
          201: TransactionResponseSchema,
        },
      },
    },
    transactionController.create.bind(transactionController),
  );
  app.get(
    "/transactions",
    {
      preHandler: [authenticate],
      schema: {
        querystring: GetTransactionsQuerySchema,
        response: {
          200: TransactionListResponseSchema,
        },
      },
    },
    transactionController.list.bind(transactionController),
  );
};
