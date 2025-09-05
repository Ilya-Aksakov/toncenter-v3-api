import type {
  GetJettonWalletsParams,
  JettonWalletsResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get Jetton wallets by specified filters.
 */
export async function getJettonWallets(
  params: GetJettonWalletsParams = {},
  options: APIOptions = {}
): Promise<JettonWalletsResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/jetton/wallets`);

  // Add address parameters
  if (params.address) {
    params.address.forEach((addr) => url.searchParams.append("address", addr));
  }

  // Add owner_address parameters
  if (params.owner_address) {
    params.owner_address.forEach((addr) =>
      url.searchParams.append("owner_address", addr)
    );
  }

  // Add jetton_address parameters
  if (params.jetton_address) {
    params.jetton_address.forEach((addr) =>
      url.searchParams.append("jetton_address", addr)
    );
  }

  // Add optional parameters
  if (params.exclude_zero_balance !== undefined)
    url.searchParams.append(
      "exclude_zero_balance",
      params.exclude_zero_balance.toString()
    );
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
