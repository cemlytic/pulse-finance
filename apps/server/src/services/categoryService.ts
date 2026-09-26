import { CategoryModel } from "../models/Category.js";
import { CategoryResponseType } from "../schemas/categorySchema.js";

export class CategoryService {
  async getAllCategories(): Promise<CategoryResponseType[]> {
    const categories = await CategoryModel.find()
      .sort({
        isDefault: -1,
        name: 1,
      })
      .lean();

    return categories.map((cat) => ({
      id: cat._id.toString(),
      name: cat.name,
      icon: cat.icon,
      colorHex: cat.colorHex,
      isDefault: cat.isDefault,
    }));
  }
}

export const categoryService = new CategoryService();
