import type { AxiosInstance } from "axios";
import type { Category } from "@pulse/types";

export async function fetchCategories(
  client: AxiosInstance,
): Promise<Category[]> {
  const { data } = await client.get<Category[]>("/categories");
  return data;
}
