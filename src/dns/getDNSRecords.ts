import type {
  GetDNSRecordsParams,
  DNSRecordsResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get DNS records by specified filters. Currently .ton and .t.me DNS are supported.
 */
export async function getDNSRecords(
  params: GetDNSRecordsParams,
  options: APIOptions = {}
): Promise<DNSRecordsResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/dns/records`);

  // wallet parameter is required
  url.searchParams.append("wallet", params.wallet);

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
