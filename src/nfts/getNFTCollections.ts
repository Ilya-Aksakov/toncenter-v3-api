import type {
  GetNFTCollectionsParams,
  NFTCollectionsResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get NFT collections by specified filters.
 */
export async function getNFTCollections(
  params: GetNFTCollectionsParams = {},
  options: APIOptions = {}
): Promise<NFTCollectionsResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/nft/collections`);

  if (params.collection_address) {
    params.collection_address.forEach((addr) =>
      url.searchParams.append("collection_address", addr)
    );
  }

  if (params.owner_address) {
    params.owner_address.forEach((addr) =>
      url.searchParams.append("owner_address", addr)
    );
  }

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
