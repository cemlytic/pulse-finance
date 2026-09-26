import { TransactionModel } from "../models/Transaction.js";
import {
  DailyFlowPointType,
  DailyFlowQueryType,
} from "../schemas/analyticsSchema.js";

export class AnalyticsService {
  async getDailyFlow(query: DailyFlowQueryType): Promise<DailyFlowPointType[]> {
    const { userId, startDate, endDate } = query;

    const pipelineResult = await TransactionModel.aggregate([
      {
        $match: {
          userId: userId,
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },

      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          expenseCents: {
            $sum: {
              $cond: [{ $eq: ["$type", "EXPENSE"] }, "$amountCents", 0],
            },
          },
          incomeCents: {
            $sum: {
              $cond: [{ $eq: ["$type", "INCOME"] }, "$amountCents", 0],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          date: "$_id",
          expenseCents: 1,
          incomeCents: 1,
          netCents: { $subtract: ["$incomeCents", "$expenseCents"] },
        },
      },

      { $sort: { date: 1 } },
    ]);

    return pipelineResult;
  }
}

export const analyticsService = new AnalyticsService();
