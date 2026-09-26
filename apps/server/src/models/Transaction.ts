import { Schema, model, Document, Types } from "mongoose";

export type TransactionType = "INCOME" | "EXPENSE";

export interface ITransaction extends Document {
  userId: string;
  categoryId: Types.ObjectId;
  amountCents: number;
  type: TransactionType;
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    amountCents: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} must be cent",
      },
    },
    type: {
      type: String,
      enum: ["INCOME", "EXPENSE"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 255,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

transactionSchema.index({ userId: 1, date: -1 });

export const TransactionModel = model<ITransaction>(
  "Transaction",
  transactionSchema,
);
