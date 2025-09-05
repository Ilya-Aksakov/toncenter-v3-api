import type {
  GetJettonBurnsParams,
  JettonBurnsResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get Jetton burns by specified filters.
 */
export async function getJettonBurns(
  params: GetJettonBurnsParams = {},
  options: APIOptions = {}
): Promise<JettonBurnsResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/jetton/burns`);

  // Add address parameters
  if (params.address) {
    params.address.forEach((addr) => url.searchParams.append("address", addr));
  }

  // Add jetton_wallet parameters
  if (params.jetton_wallet) {
    params.jetton_wallet.forEach((wallet) =>
      url.searchParams.append("jetton_wallet", wallet)
    );
  }

  // Add optional parameters
  if (params.jetton_master)
    url.searchParams.append("jetton_master", params.jetton_master);
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
