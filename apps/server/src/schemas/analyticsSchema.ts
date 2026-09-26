import { Type, Static } from "@sinclair/typebox";

export const DailyFlowQuerySchema = Type.Object({
  userId: Type.String({ minLength: 1 }),
  startDate: Type.String({ format: "date-time" }),
  endDate: Type.String({ format: "date-time" }),
});

export type DailyFlowQueryType = Static<typeof DailyFlowQuerySchema>;

export const DailyFlowPontSchema = Type.Object({
  date: Type.String(),
  expenseCents: Type.Integer(),
  incomeCents: Type.Integer(),
  netCents: Type.Integer(),
});

export const DailyFlowResponseSchema = Type.Array(DailyFlowPontSchema);
export type DailyFlowPointType = Static<typeof DailyFlowPontSchema>;
