import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { transactionController } from "../controllers/transactionController.js";
import {
  CreateTransactionBodySchema,
  TransactionResponseSchema,
  GetTransactionsQuerySchema,
  TransactionListResponseSchema,
} from "../schemas/transactionSchema.js";

export const transactionRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  app.post(
    "/transactions",
    {
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
