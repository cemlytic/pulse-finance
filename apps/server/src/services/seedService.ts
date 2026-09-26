import { CategoryModel } from "../models/Category.js";
import { DEFAULT_CATEGORIES } from "../constants/defaultCategories.js";

export const seedDefaultCategories = async (): Promise<void> => {
  try {
    const existingCount = await CategoryModel.countDocuments();

    if (existingCount > 0) return;

    console.log(
      "No categories found in the database. Seeding default categories...",
    );
    await CategoryModel.insertMany(DEFAULT_CATEGORIES);
    console.log("Default categories created successfully.");
  } catch (error) {
    console.error("Error seeding default categories:", error);
  }
};
