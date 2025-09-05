import type {
  GetAddressInformationParams,
  V2AddressInformation,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get smart contract information (legacy v2 compatibility).
 */
export async function getAddressInformation(
  params: GetAddressInformationParams,
  options: APIOptions = {}
): Promise<V2AddressInformation> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/addressInformation`);

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
