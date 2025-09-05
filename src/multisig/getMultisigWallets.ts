import type {
  GetMultisigWalletsParams,
  MultisigResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get multisig contracts by specified filters with associated orders.
 */
export async function getMultisigWallets(
  params: GetMultisigWalletsParams = {},
  options: APIOptions = {}
): Promise<MultisigResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/multisig/wallets`);

  if (params.address) {
    params.address.forEach((addr) => url.searchParams.append("address", addr));
  }

  if (params.wallet_address) {
    params.wallet_address.forEach((addr) =>
      url.searchParams.append("wallet_address", addr)
    );
  }

  if (params.limit !== undefined)
    url.searchParams.append("limit", params.limit.toString());
  if (params.offset !== undefined)
    url.searchParams.append("offset", params.offset.toString());
  if (params.sort) url.searchParams.append("sort", params.sort);
  if (params.include_orders !== undefined)
    url.searchParams.append("include_orders", params.include_orders.toString());

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
