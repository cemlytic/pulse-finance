import { Type, Static } from "@sinclair/typebox";

export const MongoIdSchema = Type.String({
  pattern: "^[0-9a-fA-F]{24}$",
  description: "24-character hexadecimal MongoDB ObjectId",
});

export const CreateTransactionBodySchema = Type.Object({
  userId: Type.String({ minLength: 1 }),
  categoryId: MongoIdSchema,
  amountCents: Type.Integer({ minimum: 1 }),
  type: Type.Union([Type.Literal("INCOME"), Type.Literal("EXPENSE")]),
  description: Type.Optional(Type.String({ maxLength: 255 })),
  date: Type.Optional(Type.String({ format: "date-time" })),
});

export type CreateTransactionBodyType = Static<
  typeof CreateTransactionBodySchema
>;

export const TransactionResponseSchema = Type.Object({
  id: Type.String(),
  userId: Type.String(),
  categoryId: Type.String(),
  amountCents: Type.Integer(),
  type: Type.Union([Type.Literal("INCOME"), Type.Literal("EXPENSE")]),
  description: Type.Optional(Type.String()),
  date: Type.String(),
  createdAt: Type.String(),
});

export type TransactionResponseType = Static<typeof TransactionResponseSchema>;

export const GetTransactionsQuerySchema = Type.Object({
  userId: Type.String({ minLength: 1 }),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
  cursor: Type.Optional(Type.String()),
});

export type GetTransactionsQueryType = Static<
  typeof GetTransactionsQuerySchema
>;

export const TransactionListResponseSchema = Type.Object({
  items: Type.Array(TransactionResponseSchema),
  nextCursor: Type.Union([Type.String(), Type.Null()]),
});

export type TransactionListResponseType = Static<
  typeof TransactionListResponseSchema
>;
