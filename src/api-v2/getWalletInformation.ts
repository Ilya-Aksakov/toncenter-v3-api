import type {
  GetWalletInformationParams,
  V2WalletInformation,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get wallet smart contract information (legacy v2 compatibility).
 * Supports wallets: v1r1, v1r2, v1r3, v2r1, v2r2, v3r1, v3r2, v4r1, v4r2, v5beta, v5r1.
 */
export async function getWalletInformation(
  params: GetWalletInformationParams,
  options: APIOptions = {}
): Promise<V2WalletInformation> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/walletInformation`);

  // Add required address parameter
  url.searchParams.append("address", params.address);

  // Add optional use_v2 parameter
  if (params.use_v2 !== undefined)
    url.searchParams.append("use_v2", params.use_v2.toString());

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
