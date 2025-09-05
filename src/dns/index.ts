// TON Center v3 API - DNS Methods

export { getDNSRecords } from "./getDNSRecords";

// Re-export constants and types for convenience
export { BASE_URLS, DEFAULT_CHAIN } from "../const";
export type { Chain, APIOptions } from "../const";

// Re-export dns-related types for convenience
export type {
  DNSRecord,
  DNSRecordsResponse,
  GetDNSRecordsParams,
  RequestError,
} from "../types";
