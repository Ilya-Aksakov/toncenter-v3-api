import type {
  GetPendingActionsParams,
  ActionsResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get pending actions by specified filter.
 */
export async function getPendingActions(
  params: GetPendingActionsParams = {},
  options: APIOptions = {}
): Promise<ActionsResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/pendingActions`);

  // Add query parameters
  if (params.account) url.searchParams.append("account", params.account);

  if (params.ext_msg_hash) {
    params.ext_msg_hash.forEach((hash) =>
      url.searchParams.append("ext_msg_hash", hash)
    );
  }

  if (params.supported_action_types) {
    params.supported_action_types.forEach((type) =>
      url.searchParams.append("supported_action_types", type)
    );
  }

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
