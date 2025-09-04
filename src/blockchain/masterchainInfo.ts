import type { MasterchainInfo, RequestError, APIOptions } from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get first and last indexed block.
 */
export async function getMasterchainInfo(
  options: APIOptions = {}
): Promise<MasterchainInfo> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/masterchainInfo`);

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
