// TON Center v3 API - Main Entry Point

// Export all blockchain methods and types
export * from "./src/blockchain";

// Export all actions methods and types
export * from "./src/actions";

// Export all accounts methods and types
export * from "./src/accounts";

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
} from "./src/types";

// Export constants
export * from "./src/const";

// Example usage (commented out for library usage)
/*
import { getTransactions, getMasterchainInfo, getActions, getTraces, getAccountStates } from './src';

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

  } catch (error) {
    console.error('API Error:', error);
  }
}
*/
