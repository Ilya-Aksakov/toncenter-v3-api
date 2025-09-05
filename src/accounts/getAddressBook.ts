import type {
  GetAddressBookParams,
  AddressBook,
  RequestError,
  APIOptions,
} from "../types";
import { BASE_URLS, DEFAULT_CHAIN } from "../const";

/**
 * Get address book for specified addresses.
 */
export async function getAddressBook(
  params: GetAddressBookParams,
  options: APIOptions = {}
): Promise<AddressBook> {
  const { apiKey, chain = DEFAULT_CHAIN } = options;
  const url = new URL(`${BASE_URLS[chain]}/addressBook`);

  // Add required address parameters
  params.address.forEach((addr) => url.searchParams.append("address", addr));

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
