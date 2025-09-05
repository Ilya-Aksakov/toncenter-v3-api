import type {
  GetJettonMastersParams,
  JettonMastersResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get Jetton masters by specified filters.
 */
export async function getJettonMasters(
  params: GetJettonMastersParams = {},
  options: APIOptions = {}
): Promise<JettonMastersResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/jetton/masters`);

  // Add address parameters
  if (params.address) {
    params.address.forEach((addr) => url.searchParams.append("address", addr));
  }

  // Add admin_address parameters
  if (params.admin_address) {
    params.admin_address.forEach((addr) =>
      url.searchParams.append("admin_address", addr)
    );
  }

  // Add optional parameters
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
