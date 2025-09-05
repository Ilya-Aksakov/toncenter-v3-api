// TON Center v3 API - API/v2 Compatibility Methods

export { getAddressInformation } from "./getAddressInformation";
export { getWalletInformation } from "./getWalletInformation";
export { estimateFee } from "./estimateFee";
export { sendMessage } from "./sendMessage";
export { runGetMethod } from "./runGetMethod";

// Re-export constants and types for convenience
export { BASE_URLS, DEFAULT_CHAIN } from "../const";
export type { Chain, APIOptions } from "../const";

// Re-export api-v2 related types for convenience
export type {
  V2AddressInformation,
  V2WalletInformation,
  V2EstimateFeeRequest,
  V2EstimatedFee,
  V2EstimateFeeResult,
  V2SendMessageRequest,
  V2SendMessageResult,
  V2StackEntity,
  V2RunGetMethodRequest,
  V2RunGetMethodResult,
  GetAddressInformationParams,
  GetWalletInformationParams,
  RequestError,
} from "../types";
