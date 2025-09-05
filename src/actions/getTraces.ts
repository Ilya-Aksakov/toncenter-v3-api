import type {
  GetTracesParams,
  TracesResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get traces by specified filter.
 */
export async function getTraces(
  params: GetTracesParams = {},
  options: APIOptions = {}
): Promise<TracesResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/traces`);

  // Add query parameters
  if (params.account) url.searchParams.append("account", params.account);

  if (params.trace_id) {
    params.trace_id.forEach((id) => url.searchParams.append("trace_id", id));
  }

  if (params.tx_hash) {
    params.tx_hash.forEach((hash) => url.searchParams.append("tx_hash", hash));
  }

  if (params.msg_hash) {
    params.msg_hash.forEach((hash) =>
      url.searchParams.append("msg_hash", hash)
    );
  }

  if (params.mc_seqno !== undefined)
    url.searchParams.append("mc_seqno", params.mc_seqno.toString());

  if (params.start_utime !== undefined)
    url.searchParams.append("start_utime", params.start_utime.toString());

  if (params.end_utime !== undefined)
    url.searchParams.append("end_utime", params.end_utime.toString());

  if (params.start_lt !== undefined)
    url.searchParams.append("start_lt", params.start_lt.toString());

  if (params.end_lt !== undefined)
    url.searchParams.append("end_lt", params.end_lt.toString());

  if (params.include_actions !== undefined)
    url.searchParams.append(
      "include_actions",
      params.include_actions.toString()
    );

  if (params.supported_action_types) {
    params.supported_action_types.forEach((type) =>
      url.searchParams.append("supported_action_types", type)
    );
  }

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
