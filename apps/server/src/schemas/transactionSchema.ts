import { Type, Static, Union } from "@sinclair/typebox";

export const createTransactionBodySchema = Type.Object({
  userId: Type.String({ minLength: 1 }),
  categoryId: Type.String({ minLength: 24, maxLength: 24 }),
  amountCents: Type.Integer({ minimum: 1 }),
  type: Type.Union([Type.Literal("INCOME"), Type.Literal("EXPENSE")]),
  description: Type.Optional(Type.String({ maxLength: 255 })),
  date: Type.Optional(Type.String({ format: "date-time" })),
});

export type CreateTransactionBodyType = Static<
  typeof createTransactionBodySchema
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
  userId: Type.String(),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
  cursor: Type.Optional(Type.String()),
});

export type GetTransactionsQueryType = Static<
  typeof GetTransactionsQuerySchema
>;
