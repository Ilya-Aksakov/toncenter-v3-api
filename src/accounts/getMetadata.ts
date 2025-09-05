import type {
  GetMetadataParams,
  Metadata,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get metadata for specified addresses.
 */
export async function getMetadata(
  params: GetMetadataParams,
  options: APIOptions = {}
): Promise<Metadata> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/metadata`);

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
