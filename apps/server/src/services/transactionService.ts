import { Types } from "mongoose";
import { TransactionModel } from "../models/Transaction.js";
import { CategoryModel } from "../models/Category.js";
import {
  CreateTransactionBodyType,
  TransactionResponseType,
  GetTransactionsQueryType,
} from "../schemas/transactionSchema.js";

export class TransactionService {
  async createTransaction(
    data: CreateTransactionBodyType,
  ): Promise<TransactionResponseType> {
    const categoryExists = await CategoryModel.exists({ _id: data.categoryId });
    if (!categoryExists) throw new Error("CATEGORY_NOT_FOUND");

    const newTransaction = await TransactionModel.create({
      userId: data.userId,
      categoryId: new Types.ObjectId(data.categoryId),
      amountCents: data.amountCents,
      type: data.type,
      description: data.description,
      date: data.date ? new Date(data.date) : new Date(),
    });

    return {
      id: newTransaction._id.toString(),
      userId: newTransaction.userId,
      categoryId: newTransaction.categoryId.toString(),
      amountCents: newTransaction.amountCents,
      type: newTransaction.type,
      description: newTransaction.description,
      date: newTransaction.date.toISOString(),
      createdAt: newTransaction.createdAt.toISOString(),
    };
  }

  async getTransactionByUser(
    query: GetTransactionsQueryType,
  ): Promise<TransactionResponseType[]> {
    const filter: Record<string, any> = { userId: query.userId };

    if (query.cursor) {
      filter._id = { $lt: new Types.ObjectId(query.cursor) };
    }

    const limit = query.limit || 20;
    const transactions = await TransactionModel.find(filter)
      .sort({ date: -1, _id: -1 })
      .limit(limit)
      .lean();

    return transactions.map((t) => ({
      id: t._id.toString(),
      userId: t.userId,
      categoryId: t.categoryId.toString(),
      amountCents: t.amountCents,
      type: t.type,
      description: t.description,
      date: t.date.toISOString(),
      createdAt: t.createdAt.toISOString(),
    }));
  }
}

export const transactionService = new TransactionService();
