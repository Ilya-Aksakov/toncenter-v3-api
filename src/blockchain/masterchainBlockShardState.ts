import type {
  GetMasterchainBlockShardStateParams,
  BlocksResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get masterchain block shard state. Same as /api/v2/shards.
 */
export async function getMasterchainBlockShardState(
  params: GetMasterchainBlockShardStateParams,
  options: APIOptions = {}
): Promise<BlocksResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/masterchainBlockShardState`);

  // Add required query parameter
  url.searchParams.append("seqno", params.seqno.toString());

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
