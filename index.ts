// TON Center v3 API - Main Entry Point

// Export all blockchain methods and types
export * from "./src/blockchain";

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
} from "./src/types";

// Export constants
export * from "./src/const";

// Example usage (commented out for library usage)
/*
import { getTransactions, getMasterchainInfo } from './src/blockchain';

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

  } catch (error) {
    console.error('API Error:', error);
  }
}
*/
