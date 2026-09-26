import { Type, Static } from "@sinclair/typebox";

export const AnalyticsQuerySchema = Type.Object({
  userId: Type.String({ minLength: 1 }),
  startDate: Type.String({ format: "date-time" }),
  endDate: Type.String({ format: "date-time" }),
});

export type AnalyticsQueryType = Static<typeof AnalyticsQuerySchema>;

export const DailyFlowPointSchema = Type.Object({
  date: Type.String(),
  expenseCents: Type.Integer(),
  incomeCents: Type.Integer(),
  netCents: Type.Integer(),
});

export const DailyFlowResponseSchema = Type.Array(DailyFlowPointSchema);

export const CategoryBreakdownPointSchema = Type.Object({
  categoryId: Type.String(),
  categoryName: Type.String(),
  icon: Type.String(),
  colorHex: Type.String(),
  totalCents: Type.Integer(),
  percentage: Type.Number(),
});

export const CategoryBreakdownResponseSchema = Type.Array(
  CategoryBreakdownPointSchema,
);
