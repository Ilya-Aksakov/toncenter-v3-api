import type {
  V2RunGetMethodRequest,
  V2RunGetMethodResult,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Run get method of smart contract.
 * Stack supports only `num`, `cell` and `slice` types.
 */
export async function runGetMethod(
  request: V2RunGetMethodRequest,
  options: APIOptions = {}
): Promise<V2RunGetMethodResult> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/runGetMethod`);

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
