import type {
  GetMultisigOrdersParams,
  MultisigOrderResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get multisig orders by specified filters.
 */
export async function getMultisigOrders(
  params: GetMultisigOrdersParams = {},
  options: APIOptions = {}
): Promise<MultisigOrderResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/multisig/orders`);

  if (params.address) {
    params.address.forEach((addr) => url.searchParams.append("address", addr));
  }

  if (params.multisig_address) {
    params.multisig_address.forEach((addr) =>
      url.searchParams.append("multisig_address", addr)
    );
  }

  if (params.parse_actions !== undefined)
    url.searchParams.append("parse_actions", params.parse_actions.toString());
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
