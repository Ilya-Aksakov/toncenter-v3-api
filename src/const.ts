// TON Center v3 API Constants

export const BASE_URLS = {
  mainnet: "https://toncenter.com/api/v3",
  testnet: "https://testnet.toncenter.com/api/v3",
} as const;

export type Chain = "mainnet" | "testnet";

export interface APIOptions {
  apiKey?: string;
  chain?: Chain;
}

export const DEFAULT_CHAIN: Chain = "mainnet";
