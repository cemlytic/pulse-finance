export type TransactionType = "INCOME" | "EXPENSE";

export interface Category {
  id: string;
  name: string;
  icon: string;
  colorHex: string;
  isDefault?: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  categoryId: string;
  amountCents: number;
  type: TransactionType;
  description?: string;
  date: string;
  createdAt?: string;
}

export interface CreateTransactionInput {
  categoryId: string;
  amountCents: number;
  type: TransactionType;
  description?: string;
  date?: string;
}

export interface TransactionListResponse {
  items: Transaction[];
  nextCursor: string | null;
}

export interface DailyFlowPoint {
  day?: number;
  date: string;
  totalExpenseCents: number;
  totalIncomeCents: number;
  netSavingCents?: number;
}

export interface CategoryBreakdownPoint {
  categoryId: string;
  categoryName: string;
  icon: string;
  colorHex: string;
  totalCents: number;
  percentage: number;
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
