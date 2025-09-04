import type {
  GetAdjacentTransactionsParams,
  TransactionsResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get parent and/or children for specified transaction.
 */
export async function getAdjacentTransactions(
  params: GetAdjacentTransactionsParams,
  options: APIOptions = {}
): Promise<TransactionsResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/adjacentTransactions`);

  // Add query parameters
  if (params.hash) url.searchParams.append("hash", params.hash);
  if (params.direction) url.searchParams.append("direction", params.direction);

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
