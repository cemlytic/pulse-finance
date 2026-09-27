import { Types } from "mongoose";
import {
  Transaction,
  CreateTransactionInput,
  TransactionListResponse,
} from "@pulse/types";
import { TransactionModel } from "../models/Transaction.js";
import { CategoryModel } from "../models/Category.js";
import { GetTransactionsQueryType } from "../schemas/transactionSchema.js";

interface DecodedCursor {
  date: Date;
  id: string;
}

const encodeCursor = (date: Date, id: string): string =>
  Buffer.from(`${date.toISOString()}|${id}`, "utf8").toString("base64url");

const decodeCursor = (cursor: string): DecodedCursor => {
  try {
    const raw = Buffer.from(cursor, "base64url").toString("utf8");
    const [isoDate, id] = raw.split("|");
    const date = new Date(isoDate);
    if (!isoDate || !id || Number.isNaN(date.getTime())) {
      throw new Error("malformed");
    }
    return { date, id };
  } catch (error) {
    throw new Error("INVALID_CURSOR");
  }
};

export class TransactionService {
  async createTransaction(
    userId: string,
    data: CreateTransactionInput,
  ): Promise<Transaction> {
    const categoryExists = await CategoryModel.exists({ _id: data.categoryId });
    if (!categoryExists) throw new Error("CATEGORY_NOT_FOUND");

    const newTransaction = await TransactionModel.create({
      userId: userId,
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
    userId: string,
    query: GetTransactionsQueryType,
  ): Promise<TransactionListResponse> {
    const filter: Record<string, any> = { userId };

    if (query.cursor) {
      const { date, id } = decodeCursor(query.cursor);
      filter.$or = [
        { date: { $lt: date } },
        { date: date, _id: { $lt: new Types.ObjectId(id) } },
      ];
    }

    const limit = query.limit || 20;
    const transactions = await TransactionModel.find(filter)
      .sort({ date: -1, _id: -1 })
      .limit(limit + 1)
      .lean();

    const hasMore = transactions.length > limit;
    const pageItems = hasMore ? transactions.slice(0, limit) : transactions;

    const last = pageItems[pageItems.length - 1];
    const nextCursor =
      hasMore && last ? encodeCursor(last.date, last._id.toString()) : null;

    return {
      items: pageItems.map((t) => ({
        id: t._id.toString(),
        userId: t.userId,
        categoryId: t.categoryId.toString(),
        amountCents: t.amountCents,
        type: t.type,
        description: t.description,
        date: t.date.toISOString(),
        createdAt: t.createdAt.toISOString(),
      })),
      nextCursor,
    };
  }
}

export const transactionService = new TransactionService();
