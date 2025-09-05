import type {
  GetAccountStatesParams,
  AccountStatesResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get account states by specified addresses.
 */
export async function getAccountStates(
  params: GetAccountStatesParams,
  options: APIOptions = {}
): Promise<AccountStatesResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/accountStates`);

  // Add required address parameters
  params.address.forEach((addr) => url.searchParams.append("address", addr));

  // Add optional include_boc parameter
  if (params.include_boc !== undefined)
    url.searchParams.append("include_boc", params.include_boc.toString());

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
