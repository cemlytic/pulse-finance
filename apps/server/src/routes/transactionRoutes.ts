import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { Type } from "@sinclair/typebox";
import { transactionController } from "../controllers/transactionController.js";
import {
  createTransactionBodySchema,
  TransactionResponseSchema,
  GetTransactionsQuerySchema,
} from "../schemas/transactionSchema.js";

export const transactionRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
) => {
  app.post(
    "/transactions",
    {
      schema: {
        body: createTransactionBodySchema,
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
          200: Type.Array(TransactionResponseSchema),
        },
      },
    },
    transactionController.list.bind(transactionController),
  );
};
