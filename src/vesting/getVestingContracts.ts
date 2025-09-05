import type {
  GetVestingContractsParams,
  VestingContractsResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get vesting contracts by specified filters.
 */
export async function getVestingContracts(
  params: GetVestingContractsParams = {},
  options: APIOptions = {}
): Promise<VestingContractsResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/vesting`);

  if (params.contract_address) {
    params.contract_address.forEach((addr) =>
      url.searchParams.append("contract_address", addr)
    );
  }

  if (params.wallet_address) {
    params.wallet_address.forEach((addr) =>
      url.searchParams.append("wallet_address", addr)
    );
  }

  if (params.check_whitelist !== undefined)
    url.searchParams.append(
      "check_whitelist",
      params.check_whitelist.toString()
    );
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
