import type {
  GetTransactionsParams,
  TransactionsResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get transactions by specified filter.
 */
export async function getTransactions(
  params: GetTransactionsParams = {},
  options: APIOptions = {}
): Promise<TransactionsResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/transactions`);

  // Add query parameters
  if (params.workchain !== undefined)
    url.searchParams.append("workchain", params.workchain.toString());
  if (params.shard) url.searchParams.append("shard", params.shard);
  if (params.seqno !== undefined)
    url.searchParams.append("seqno", params.seqno.toString());
  if (params.mc_seqno !== undefined)
    url.searchParams.append("mc_seqno", params.mc_seqno.toString());
  if (params.account) {
    params.account.forEach((acc) => url.searchParams.append("account", acc));
  }
  if (params.exclude_account) {
    params.exclude_account.forEach((acc) =>
      url.searchParams.append("exclude_account", acc)
    );
  }
  if (params.hash) url.searchParams.append("hash", params.hash);
  if (params.lt !== undefined)
    url.searchParams.append("lt", params.lt.toString());
  if (params.start_utime !== undefined)
    url.searchParams.append("start_utime", params.start_utime.toString());
  if (params.end_utime !== undefined)
    url.searchParams.append("end_utime", params.end_utime.toString());
  if (params.start_lt !== undefined)
    url.searchParams.append("start_lt", params.start_lt.toString());
  if (params.end_lt !== undefined)
    url.searchParams.append("end_lt", params.end_lt.toString());
  if (params.limit !== undefined)
    url.searchParams.append("limit", params.limit.toString());
  if (params.offset !== undefined)
    url.searchParams.append("offset", params.offset.toString());
  if (params.sort) url.searchParams.append("sort", params.sort);

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
