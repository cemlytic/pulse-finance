import { Type, Static } from "@sinclair/typebox";

export const CategoryResponseSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  icon: Type.String(),
  colorHex: Type.String(),
  isDefault: Type.Boolean(),
});

export const CategoryListResponseSchema = Type.Array(CategoryResponseSchema);
export type CategoryResponseType = Static<typeof CategoryResponseSchema>;
