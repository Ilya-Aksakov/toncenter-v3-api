// TON Center v3 API - Main Entry Point

// Export all blockchain methods and types
export * from "./src/blockchain";

// Export all actions methods and types
export * from "./src/actions";

// Export all accounts methods and types
export * from "./src/accounts";

// Export all api-v2 compatibility methods and types
export * from "./src/api-v2";

// Export all jettons methods and types
export * from "./src/jettons";

// Export all NFTs methods and types
export * from "./src/nfts";

// Export all DNS methods and types
export * from "./src/dns";

// Export all multisig methods and types
export * from "./src/multisig";

// Export all stats methods and types
export * from "./src/stats";

// Export all vesting methods and types
export * from "./src/vesting";

// Export types (excluding APIOptions to avoid conflict)
export type {
  RequestError,
  BlockId,
  AddressBook,
  AddressMetadata,
  Metadata,
  MasterchainInfo,
  AccountState,
  MessageContent,
  DecodedContent,
  Message,
  ComputePhase,
  StoragePhase,
  CreditPhase,
  ActionPhase,
  BouncePhase,
  SplitInfo,
  TransactionDescr,
  Transaction,
  Block,
  TransactionsResponse,
  MessagesResponse,
  BlocksResponse,
  GetTransactionsParams,
  GetBlocksParams,
  GetMessagesParams,
  GetAdjacentTransactionsParams,
  GetTransactionsByMessageParams,
  GetPendingTransactionsParams,
  GetMasterchainBlockShardsParams,
  GetMasterchainBlockShardStateParams,
  GetTransactionsByMasterchainBlockParams,
  // Actions types
  Action,
  ActionType,
  GetActionsParams,
  ActionsResponse,
  GetPendingActionsParams,
  GetPendingTracesParams,
  GetTracesParams,
  Trace,
  TraceMeta,
  TraceNode,
  TracesResponse,
  // Accounts types
  AccountStateFull,
  AccountStatesResponse,
  WalletState,
  WalletStatesResponse,
  GetAccountStatesParams,
  GetAddressBookParams,
  GetMetadataParams,
  GetWalletStatesParams,
  // API/v2 types
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
  // Jettons types
  JettonBurn,
  JettonMaster,
  JettonTransfer,
  JettonWallet,
  JettonBurnsResponse,
  JettonMastersResponse,
  JettonTransfersResponse,
  JettonWalletsResponse,
  GetJettonBurnsParams,
  GetJettonMastersParams,
  GetJettonTransfersParams,
  GetJettonWalletsParams,
  // NFTs types
  NFTCollection,
  NFTItem,
  NFTTransfer,
  NFTCollectionsResponse,
  NFTItemsResponse,
  NFTTransfersResponse,
  GetNFTCollectionsParams,
  GetNFTItemsParams,
  GetNFTTransfersParams,
  // DNS types
  DNSRecord,
  DNSRecordsResponse,
  GetDNSRecordsParams,
  // Multisig types
  MultisigOrder,
  Multisig,
  MultisigOrderResponse,
  MultisigResponse,
  GetMultisigOrdersParams,
  GetMultisigWalletsParams,
  // Stats types
  AccountBalance,
  TopAccountsByBalanceResponse,
  GetTopAccountsByBalanceParams,
  // Vesting types
  VestingContract,
  VestingContractsResponse,
  GetVestingContractsParams,
} from "./src/types";

// Export constants
export * from "./src/const";

// Example usage (commented out for library usage)
/*
import {
  getTransactions,
  getMasterchainInfo,
  getActions,
  getTraces,
  getAccountStates,
  getAddressInformation,
  runGetMethod,
  getJettonTransfers,
  getNFTCollections,
  getDNSRecords,
  getMultisigOrders,
  getTopAccountsByBalance,
  getVestingContracts,
} from 'toncenter-v3-api';

async function example() {
  try {
    const apiKey = 'YOUR_API_KEY';

    // Blockchain API
    const info = await getMasterchainInfo({ apiKey });
    const transactions = await getTransactions({ limit: 10 }, { apiKey });

    // Actions API
    const actions = await getActions({ limit: 10 }, { apiKey });
    const traces = await getTraces({ limit: 5, include_actions: true }, { apiKey });

    // Accounts API
    const accounts = await getAccountStates({ address: ['EQD6NM...'] }, { apiKey });

    // API v2 Compatibility
    const addressInfo = await getAddressInformation({ address: 'EQD6NM...' }, { apiKey });

    // Jettons API
    const jettonTransfers = await getJettonTransfers({ limit: 10 }, { apiKey });

    // NFTs API
    const nftCollections = await getNFTCollections({ limit: 10 }, { apiKey });

    // DNS API
    const dnsRecords = await getDNSRecords({ wallet: 'EQD6NM...' }, { apiKey });

    // Multisig API
    const multisigOrders = await getMultisigOrders({ limit: 10 }, { apiKey });

    // Stats API
    const topAccounts = await getTopAccountsByBalance({ limit: 10 }, { apiKey });

    // Vesting API
    const vestingContracts = await getVestingContracts({ limit: 10 }, { apiKey });

  } catch (error) {
    console.error('API Error:', error);
  }
}
*/
