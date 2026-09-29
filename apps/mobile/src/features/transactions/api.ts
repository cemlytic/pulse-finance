import type { AxiosInstance } from "axios";
import type {
  Transaction,
  CreateTransactionInput,
  TransactionListResponse,
} from "@pulse/types";

export async function createTransaction(
  client: AxiosInstance,
  input: CreateTransactionInput,
): Promise<Transaction> {
  const { data } = await client.post("/transactions", input);
  return data;
}

interface FetchTransactionParams {
  cursor?: string;
  limit?: number;
}

export async function fetchTransactions(
  client: AxiosInstance,
  params?: FetchTransactionParams,
): Promise<TransactionListResponse> {
  const { data } = await client.get("/transactions", {
    params,
  });
  return data;
}
