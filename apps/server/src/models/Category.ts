import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  icon: string;
  colorHex: string;
  isDefault: boolean;
  createdAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      default: "tag",
    },
    colorHex: {
      type: String,
      required: true,
      default: "#6B7280",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel = model<ICategory>("Category", categorySchema);
