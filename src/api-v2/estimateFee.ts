import type {
  V2EstimateFeeRequest,
  V2EstimateFeeResult,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Estimate fees required for query processing.
 * Fields body, init-code and init-data accepted in serialized format (b64-encoded).
 */
export async function estimateFee(
  request: V2EstimateFeeRequest,
  options: APIOptions = {}
): Promise<V2EstimateFeeResult> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/estimateFee`);

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
