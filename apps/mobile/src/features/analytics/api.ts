import type { AxiosInstance } from "axios";
import { DailyFlowPoint, CategoryBreakdownPoint } from "@pulse/types";
import type { DateRange } from "@/lib/dateRange";

export async function fetchDailyFlow(
  client: AxiosInstance,
  range: DateRange,
): Promise<DailyFlowPoint[]> {
  const { data } = await client.get<DailyFlowPoint[]>(
    "/analytics/daily-flow",
    {
      params: range,
    },
  );
  return data;
}

export async function fetchCategoryBreakdown(
  client: AxiosInstance,
  range: DateRange,
): Promise<CategoryBreakdownPoint[]> {
  const { data } = await client.get("/analytics/category-breakdown", {
    params: range,
  });
  return data;
}
