import type {
  GetActionsParams,
  ActionsResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get actions by specified filter.
 */
export async function getActions(
  params: GetActionsParams = {},
  options: APIOptions = {}
): Promise<ActionsResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/actions`);

  // Add query parameters
  if (params.account) url.searchParams.append("account", params.account);

  if (params.tx_hash) {
    params.tx_hash.forEach((hash) => url.searchParams.append("tx_hash", hash));
  }

  if (params.msg_hash) {
    params.msg_hash.forEach((hash) =>
      url.searchParams.append("msg_hash", hash)
    );
  }

  if (params.action_id) {
    params.action_id.forEach((id) => url.searchParams.append("action_id", id));
  }

  if (params.trace_id) {
    params.trace_id.forEach((id) => url.searchParams.append("trace_id", id));
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

  if (params.action_type) {
    params.action_type.forEach((type) =>
      url.searchParams.append("action_type", type)
    );
  }

  if (params.exclude_action_type) {
    params.exclude_action_type.forEach((type) =>
      url.searchParams.append("exclude_action_type", type)
    );
  }

  if (params.supported_action_types) {
    params.supported_action_types.forEach((type) =>
      url.searchParams.append("supported_action_types", type)
    );
  }

  if (params.include_accounts !== undefined)
    url.searchParams.append(
      "include_accounts",
      params.include_accounts.toString()
    );

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
