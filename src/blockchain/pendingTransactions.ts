import type {
  GetPendingTransactionsParams,
  TransactionsResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get pending transactions by specified filter.
 */
export async function getPendingTransactions(
  params: GetPendingTransactionsParams = {},
  options: APIOptions = {}
): Promise<TransactionsResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/pendingTransactions`);

  // Add query parameters
  if (params.account) {
    params.account.forEach((acc) => url.searchParams.append("account", acc));
  }
  if (params.trace_id) {
    params.trace_id.forEach((id) => url.searchParams.append("trace_id", id));
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const error: RequestError = await response.json();
    throw new Error(`API Error ${error.code}: ${error.error}`);
  }

  return response.json();
}
