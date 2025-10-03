import type {
  GetMasterchainBlockShardsParams,
  BlocksResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Returns all workchain blocks that appeared after previous masterchain block.
 */
export async function getMasterchainBlockShards(
  params: GetMasterchainBlockShardsParams,
  options: APIOptions = {}
): Promise<BlocksResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/masterchainBlockShards`);

  // Add required query parameter
  url.searchParams.append("seqno", params.seqno.toString());

  // Add optional query parameters
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
