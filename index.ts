// TON Center v3 API - Main Entry Point

// Export all blockchain methods and types
export * from "./src/blockchain";

// Export all actions methods and types
export * from "./src/actions";

// Export all accounts methods and types
export * from "./src/accounts";

// Export all api-v2 compatibility methods and types
export * from "./src/api-v2";

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
  runGetMethod
} from './src';

async function example() {
  try {
    // Get masterchain info (mainnet by default)
    const info = await getMasterchainInfo({ apiKey: 'YOUR_API_KEY' });
    console.log('Masterchain info:', info);

    // Get recent transactions from testnet
    const transactions = await getTransactions(
      { limit: 10, sort: 'desc' },
      { apiKey: 'YOUR_API_KEY', chain: 'testnet' }
    );
    console.log('Recent transactions:', transactions);

    // Get recent actions
    const actions = await getActions(
      { limit: 10, sort: 'desc' },
      { apiKey: 'YOUR_API_KEY' }
    );
    console.log('Recent actions:', actions);

    // Get traces
    const traces = await getTraces(
      { limit: 5, include_actions: true },
      { apiKey: 'YOUR_API_KEY' }
    );
    console.log('Traces:', traces);

    // Get account states
    const accountStates = await getAccountStates(
      { address: ['EQD6NM...', 'EQBx...'] },
      { apiKey: 'YOUR_API_KEY' }
    );
    console.log('Account states:', accountStates);

    // Get address information (v2 compatibility)
    const addressInfo = await getAddressInformation(
      { address: 'EQD6NM...', use_v2: true },
      { apiKey: 'YOUR_API_KEY' }
    );
    console.log('Address info:', addressInfo);

    // Run get method
    const methodResult = await runGetMethod(
      {
        address: 'EQD6NM...',
        method: 'get_wallet_data',
        stack: []
      },
      { apiKey: 'YOUR_API_KEY' }
    );
    console.log('Method result:', methodResult);

  } catch (error) {
    console.error('API Error:', error);
  }
}
*/
