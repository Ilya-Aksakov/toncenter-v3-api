import type {
  GetNFTTransfersParams,
  NFTTransfersResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get NFT transfers by specified filters.
 */
export async function getNFTTransfers(
  params: GetNFTTransfersParams = {},
  options: APIOptions = {}
): Promise<NFTTransfersResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/nft/transfers`);

  if (params.owner_address) {
    params.owner_address.forEach((addr) =>
      url.searchParams.append("owner_address", addr)
    );
  }

  if (params.item_address) {
    params.item_address.forEach((addr) =>
      url.searchParams.append("item_address", addr)
    );
  }

  if (params.collection_address)
    url.searchParams.append("collection_address", params.collection_address);
  if (params.direction) url.searchParams.append("direction", params.direction);
  if (params.start_utime !== undefined)
    url.searchParams.append("start_utime", params.start_utime.toString());
  if (params.end_utime !== undefined)
    url.searchParams.append("end_utime", params.end_utime.toString());
  if (params.start_lt !== undefined)
    url.searchParams.append("start_lt", params.start_lt.toString());
  if (params.end_lt !== undefined)
    url.searchParams.append("end_lt", params.end_lt.toString());
  if (params.limit !== undefined)
    url.searchParams.append("limit", params.limit.toString());
  if (params.offset !== undefined)
    url.searchParams.append("offset", params.offset.toString());
  if (params.sort) url.searchParams.append("sort", params.sort);

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
