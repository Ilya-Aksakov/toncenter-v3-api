import type {
  GetMessagesParams,
  MessagesResponse,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get messages by specified filters.
 */
export async function getMessages(
  params: GetMessagesParams = {},
  options: APIOptions = {}
): Promise<MessagesResponse> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/messages`);

  // Add query parameters
  if (params.msg_hash) {
    params.msg_hash.forEach((hash) =>
      url.searchParams.append("msg_hash", hash)
    );
  }
  if (params.body_hash) url.searchParams.append("body_hash", params.body_hash);
  if (params.source) url.searchParams.append("source", params.source);
  if (params.destination)
    url.searchParams.append("destination", params.destination);
  if (params.opcode) url.searchParams.append("opcode", params.opcode);
  if (params.start_utime !== undefined)
    url.searchParams.append("start_utime", params.start_utime.toString());
  if (params.end_utime !== undefined)
    url.searchParams.append("end_utime", params.end_utime.toString());
  if (params.start_lt !== undefined)
    url.searchParams.append("start_lt", params.start_lt.toString());
  if (params.end_lt !== undefined)
    url.searchParams.append("end_lt", params.end_lt.toString());
  if (params.direction) url.searchParams.append("direction", params.direction);
  if (params.exclude_externals !== undefined)
    url.searchParams.append(
      "exclude_externals",
      params.exclude_externals.toString()
    );
  if (params.only_externals !== undefined)
    url.searchParams.append("only_externals", params.only_externals.toString());
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
