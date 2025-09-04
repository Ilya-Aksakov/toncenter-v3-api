import type {
  GetTransactionsByMessageParams,
  TransactionsResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get transactions whose inbound/outbound message has the specified hash.
 */
export async function getTransactionsByMessage(
  params: GetTransactionsByMessageParams = {},
  options: APIOptions = {}
): Promise<TransactionsResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/transactionsByMessage`);

  // Add query parameters
  if (params.msg_hash) url.searchParams.append("msg_hash", params.msg_hash);
  if (params.body_hash) url.searchParams.append("body_hash", params.body_hash);
  if (params.opcode) url.searchParams.append("opcode", params.opcode);
  if (params.direction) url.searchParams.append("direction", params.direction);
  if (params.limit !== undefined)
    url.searchParams.append("limit", params.limit.toString());
  if (params.offset !== undefined)
    url.searchParams.append("offset", params.offset.toString());

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
