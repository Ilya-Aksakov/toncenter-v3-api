import type {
  V2SendMessageRequest,
  V2SendMessageResult,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Send an external message to the TON network.
 * Message should be in BOC base64 format.
 */
export async function sendMessage(
  request: V2SendMessageRequest,
  options: APIOptions = {}
): Promise<V2SendMessageResult> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/message`);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  const response = await fetch(url.toString(), {
    method: "POST",
    headers,
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error: RequestError = await response.json();
    throw new Error(`API Error ${error.code}: ${error.error}`);
  }

  return response.json();
}
