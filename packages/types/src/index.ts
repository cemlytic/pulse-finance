export type TransactionType = "INCOME" | "EXPENSE";

export interface Category {
  id: string;
  name: string;
  icon: string;
  colorHex: string;
}

export interface Transaction {
  id: string;
  userId: string;
  categoryId: string;
  amountCents: number;
  type: TransactionType;
  description?: string;
  date: string;
}

export interface DailyFlowPoint {
  day: number;
  date: string;
  totalExpenseCents: number;
  totalIncomeCents: number;
}

export interface MonthlySummaryResponse {
  month: number;
  year: number;
  currency: string;
  totalExpenseCents: number;
  totalIncomeCents: number;
  netSavingCents: number;
  dailyPoints: DailyFlowPoint[];
}
