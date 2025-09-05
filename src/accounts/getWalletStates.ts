import type {
  GetWalletStatesParams,
  WalletStatesResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get wallet states for specified addresses.
 */
export async function getWalletStates(
  params: GetWalletStatesParams,
  options: APIOptions = {}
): Promise<WalletStatesResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/walletStates`);

  // Add required address parameters
  params.address.forEach((addr) => url.searchParams.append("address", addr));

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
