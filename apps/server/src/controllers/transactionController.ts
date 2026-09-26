import { FastifyReply, FastifyRequest } from "fastify";
import { transactionService } from "../services/transactionService.js";
import {
  CreateTransactionBodyType,
  GetTransactionsQueryType,
} from "../schemas/transactionSchema.js";

export class TransactionController {
  async create(
    request: FastifyRequest<{ Body: CreateTransactionBodyType }>,
    reply: FastifyReply,
  ) {
    try {
      const transaction = await transactionService.createTransaction(
        request.body,
      );
      return reply.code(201).send(transaction);
    } catch (error: any) {
      if (error.message === "CATEGORY_NOT_FOUND") {
        return reply.badRequest("Invalid category id");
      }
      request.log.error(error, "Error creating transaction");
      return reply.internalServerError("Could ot save transaction");
    }
  }

  async list(
    request: FastifyRequest<{ Querystring: GetTransactionsQueryType }>,
    reply: FastifyReply,
  ) {
    try {
      const transactions = await transactionService.getTransactionByUser(
        request.query,
      );
      return reply.code(200).send(transactions);
    } catch (error: any) {
      if (error.message === "INVALID_CURSOR") {
        return reply.badRequest("Malformed pagination cursor");
      }
      request.log.error(error, "error listing transactions");
      return reply.internalServerError("Could not fetch transactions");
    }
  }
}

export const transactionController = new TransactionController();
