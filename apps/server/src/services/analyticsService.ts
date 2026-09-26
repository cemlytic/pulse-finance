import { TransactionModel } from "../models/Transaction.js";
import { DailyFlowPoint, CategoryBreakdownPoint } from "@pulse/types";
import { AnalyticsQueryType } from "../schemas/analyticsSchema.js";

interface RawCategoryAggregation {
  categoryId: string;
  categoryName: string;
  icon: string;
  colorHex: string;
  totalCents: number;
}

export class AnalyticsService {
  async getDailyFlow(query: AnalyticsQueryType): Promise<DailyFlowPoint[]> {
    const { userId, startDate, endDate } = query;

    const pipelineResult = await TransactionModel.aggregate<DailyFlowPoint>([
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
          totalExpenseCents: {
            $sum: {
              $cond: [{ $eq: ["$type", "EXPENSE"] }, "$amountCents", 0],
            },
          },
          totalIncomeCents: {
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
          totalExpenseCents: 1,
          totalIncomeCents: 1,
          netSavingCents: { $subtract: ["$incomeCents", "$expenseCents"] },
        },
      },

      { $sort: { date: 1 } },
    ]);

    return pipelineResult;
  }

  async getCategoryBreakDown(
    query: AnalyticsQueryType,
  ): Promise<CategoryBreakdownPoint[]> {
    const { userId, startDate, endDate } = query;

    const rawData = await TransactionModel.aggregate<RawCategoryAggregation>([
      {
        $match: {
          userId: userId,
          type: "EXPENSE",
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },

      {
        $group: {
          _id: "$categoryId",
          totalCents: { $sum: "$amountCents" },
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },

      {
        $unwind: "$categoryDetails",
      },

      {
        $project: {
          _id: 0,
          categoryId: { $toString: "$_id" },
          categoryName: "$categoryDetails.name",
          icon: "$categoryDetails.icon",
          colorHex: "$categoryDetails.colorHex",
          totalCents: 1,
        },
      },

      {
        $sort: { totalCents: -1 },
      },
    ]);

    const grandTotalCents = rawData.reduce(
      (acc, curr) => acc + curr.totalCents,
      0,
    );

    return rawData.map((item) => ({
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      icon: item.icon,
      colorHex: item.colorHex,
      totalCents: item.totalCents,
      percentage:
        grandTotalCents > 0
          ? Number(((item.totalCents / grandTotalCents) * 100).toFixed(1))
          : 0,
    }));
  }
}

export const analyticsService = new AnalyticsService();
