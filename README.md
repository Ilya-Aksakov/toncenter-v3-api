# TON Center v3 API TypeScript Library

[![npm version](https://badge.fury.io/js/toncenter-v3-api.svg)](https://badge.fury.io/js/toncenter-v3-api)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Complete TypeScript/JavaScript library for TON Center v3 API with ALL methods support.

## 🚀 Features

- **🎯 Complete API Coverage**: All 39 TON Center v3 API methods implemented
- **🪙 Jettons API**: Token burns, masters, transfers, wallets
- **🎨 NFTs API**: Collections, items, transfers and marketplace data
- **🌐 DNS API**: .ton and .t.me domain resolution
- **🔒 Multisig API**: Multi-signature wallets and orders
- **📊 Stats API**: Blockchain analytics and top accounts
- **💼 Vesting API**: Token vesting contracts and schedules
- **⛓️ Blockchain API**: Full blockchain data access
- **🎭 Actions API**: Transaction actions and traces
- **🏦 Accounts API**: Account states and wallet information
- **🔄 Legacy v2 API**: Backward compatibility support
- **🔒 Type Safety**: Full TypeScript support with strict typing
- **🌐 Network Support**: Both mainnet and testnet
- **🗝️ API Key Support**: Secure authentication
- **📦 Modular**: Import only what you need
- **🎯 Zero Dependencies**: No external runtime dependencies

## 📦 Installation

```bash
npm install toncenter-v3-api
```

## 🎯 Quick Start

```typescript
import {
  getMasterchainInfo,
  getTransactions,
  getActions,
  getAccountStates,
  getJettonTransfers,
  getNFTCollections,
  getDNSRecords,
  getMultisigOrders,
  getTopAccountsByBalance,
  getVestingContracts,
} from "toncenter-v3-api";

async function example() {
  try {
    const apiKey = "YOUR_API_KEY";

    // Get blockchain info
    const info = await getMasterchainInfo({ apiKey });

    // Get recent transactions
    const transactions = await getTransactions({ limit: 10 }, { apiKey });

    // Get Jetton transfers
    const jettonTransfers = await getJettonTransfers(
      { limit: 10 },
      { apiKey }
    );

    // Get NFT collections
    const nftCollections = await getNFTCollections({ limit: 10 }, { apiKey });

    console.log("Blockchain info:", info);
  } catch (error) {
    console.error("API Error:", error);
  }
}
```

## 📚 Available Methods

### 🛠️ Blockchain API

Core blockchain data access methods.

- `getMasterchainInfo()` - Get masterchain information
- `getTransactions()` - Get transactions with filtering
- `getMessages()` - Get messages by criteria
- `getBlocks()` - Get blocks information
- `getAdjacentTransactions()` - Get adjacent transactions
- `getTransactionsByMessage()` - Get transactions by message
- `getPendingTransactions()` - Get pending transactions
- `getMasterchainBlockShards()` - Get masterchain block shards
- `getMasterchainBlockShardState()` - Get shard state
- `getTransactionsByMasterchainBlock()` - Get transactions by block

### 🎭 Actions API

Transaction actions and trace analysis.

- `getActions()` - Get actions by specified filter
- `getPendingActions()` - Get pending actions
- `getTraces()` - Get transaction traces with actions
- `getPendingTraces()` - Get pending traces

### 🏦 Accounts API

Account states and wallet information.

- `getAccountStates()` - Get account states by addresses
- `getAddressBook()` - Get address book metadata
- `getMetadata()` - Get account metadata
- `getWalletStates()` - Get wallet states

### 🔄 API v2 Compatibility

Legacy API v2 compatibility methods.

- `getAddressInformation()` - Get smart contract information (v2 format)
- `getWalletInformation()` - Get wallet information with version support
- `estimateFee()` - Estimate transaction fees
- `sendMessage()` - Send external messages to TON network
- `runGetMethod()` - Execute smart contract get methods

### 🪙 Jettons API

Jetton tokens ecosystem support.

- `getJettonBurns()` - Get Jetton token burns with filtering
- `getJettonMasters()` - Get Jetton master contracts
- `getJettonTransfers()` - Get Jetton token transfers
- `getJettonWallets()` - Get Jetton wallets by criteria

### 🎨 NFTs API  

Non-fungible tokens and marketplace data.

- `getNFTCollections()` - Get NFT collections
- `getNFTItems()` - Get NFT items by collection or owner
- `getNFTTransfers()` - Get NFT transfers and marketplace activity

### 🌐 DNS API

Decentralized naming system support.

- `getDNSRecords()` - Get DNS records for .ton and .t.me domains

### 🔒 Multisig API

Multi-signature wallet management.

- `getMultisigOrders()` - Get multisig orders and proposals
- `getMultisigWallets()` - Get multisig contracts with associated orders

### 📊 Stats API

Blockchain statistics and analytics.

- `getTopAccountsByBalance()` - Get list of accounts sorted by balance

### 💼 Vesting API

Token vesting and distribution tracking.

- `getVestingContracts()` - Get vesting contracts with schedules and whitelists

## 🪙 Jettons API Examples

### Get Jetton Burns

```typescript
import { getJettonBurns } from "toncenter-v3-api";

// Get recent Jetton burns
const jettonBurns = await getJettonBurns(
  {
    limit: 10,
    sort: "desc",
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get burns for specific Jetton
const specificJettonBurns = await getJettonBurns(
  {
    jetton_master: "EQD...", // Jetton master address
    start_utime: Math.floor(Date.now() / 1000) - 86400, // last 24 hours
  },
  { apiKey: "YOUR_API_KEY" }
);
```

### Get Jetton Masters

```typescript
import { getJettonMasters } from "toncenter-v3-api";

// Get all Jetton masters
const jettonMasters = await getJettonMasters(
  { limit: 20 },
  { apiKey: "YOUR_API_KEY" }
);

// Get Jetton masters by admin
const adminJettons = await getJettonMasters(
  {
    admin_address: ["EQD..."],
  },
  { apiKey: "YOUR_API_KEY" }
);
```

### Get Jetton Transfers

```typescript
import { getJettonTransfers } from "toncenter-v3-api";

// Get recent Jetton transfers
const jettonTransfers = await getJettonTransfers(
  {
    limit: 50,
    sort: "desc",
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get transfers for specific owner
const ownerTransfers = await getJettonTransfers(
  {
    owner_address: ["EQD..."],
    direction: "out", // or "in"
    limit: 100,
  },
  { apiKey: "YOUR_API_KEY" }
);
```

### Get Jetton Wallets

```typescript
import { getJettonWallets } from "toncenter-v3-api";

// Get Jetton wallets with non-zero balance
const jettonWallets = await getJettonWallets(
  {
    exclude_zero_balance: true,
    limit: 50,
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get wallets for specific Jetton
const specificJettonWallets = await getJettonWallets(
  {
    jetton_address: ["EQD..."],
    owner_address: ["EQA...", "EQB..."],
  },
  { apiKey: "YOUR_API_KEY" }
);
```

## 🎨 NFTs API Examples

### Get NFT Collections

```typescript
import { getNFTCollections } from "toncenter-v3-api";

// Get all NFT collections
const nftCollections = await getNFTCollections(
  { limit: 20 },
  { apiKey: "YOUR_API_KEY" }
);

// Get collections by owner
const ownerCollections = await getNFTCollections(
  {
    owner_address: ["EQD..."],
  },
  { apiKey: "YOUR_API_KEY" }
);
```

### Get NFT Items

```typescript
import { getNFTItems } from "toncenter-v3-api";

// Get NFT items from specific collection
const collectionItems = await getNFTItems(
  {
    collection_address: ["EQD..."],
    limit: 50,
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get NFT items by owner
const ownerItems = await getNFTItems(
  {
    owner_address: ["EQD..."],
    limit: 100,
  },
  { apiKey: "YOUR_API_KEY" }
);
```

### Get NFT Transfers

```typescript
import { getNFTTransfers } from "toncenter-v3-api";

// Get recent NFT transfers
const nftTransfers = await getNFTTransfers(
  {
    limit: 30,
    sort: "desc",
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get NFT transfers for specific collection
const collectionTransfers = await getNFTTransfers(
  {
    collection_address: "EQD...",
    start_utime: Math.floor(Date.now() / 1000) - 86400, // last 24 hours
  },
  { apiKey: "YOUR_API_KEY" }
);
```

## 🌐 DNS API Examples

### Get DNS Records

```typescript
import { getDNSRecords } from "toncenter-v3-api";

// Get DNS records for wallet
const dnsRecords = await getDNSRecords(
  {
    wallet: "EQD...", // wallet address
  },
  { apiKey: "YOUR_API_KEY" }
);

console.log("DNS domains:", dnsRecords.records);
```

## 🔒 Multisig API Examples

### Get Multisig Orders

```typescript
import { getMultisigOrders } from "toncenter-v3-api";

// Get multisig orders
const multisigOrders = await getMultisigOrders(
  {
    limit: 20,
    parse_actions: true, // Parse order actions
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get orders for specific multisig
const specificOrders = await getMultisigOrders(
  {
    multisig_address: ["EQD..."],
  },
  { apiKey: "YOUR_API_KEY" }
);
```

### Get Multisig Wallets

```typescript
import { getMultisigWallets } from "toncenter-v3-api";

// Get multisig wallets with orders
const multisigWallets = await getMultisigWallets(
  {
    include_orders: true,
    limit: 10,
  },
  { apiKey: "YOUR_API_KEY" }
);
```

## 📊 Stats API Examples

### Get Top Accounts by Balance

```typescript
import { getTopAccountsByBalance } from "toncenter-v3-api";

// Get top 100 richest accounts
const topAccounts = await getTopAccountsByBalance(
  {
    limit: 100,
  },
  { apiKey: "YOUR_API_KEY" }
);

console.log("Richest accounts:", topAccounts);
```

## 💼 Vesting API Examples

### Get Vesting Contracts

```typescript
import { getVestingContracts } from "toncenter-v3-api";

// Get all vesting contracts
const vestingContracts = await getVestingContracts(
  {
    limit: 20,
    check_whitelist: true,
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get vesting for specific wallet
const walletVesting = await getVestingContracts(
  {
    wallet_address: ["EQD..."],
  },
  { apiKey: "YOUR_API_KEY" }
);
```

## Data Types

The library is fully typed. Main types:

```typescript
import type {
  Transaction,
  Message,
  Block,
  Action,
  ActionType,
  Trace,
  TraceMeta,
  AccountStateFull,
  WalletState,
  V2AddressInformation,
  V2WalletInformation,
  GetTransactionsParams,
  GetActionsParams,
  GetTracesParams,
  GetAccountStatesParams,
  TransactionsResponse,
  ActionsResponse,
  TracesResponse,
  AccountStatesResponse,
  WalletStatesResponse,
  V2EstimateFeeResult,
  V2RunGetMethodResult,
  APIOptions,
} from "toncenter-v3-api";
```

### Main Interfaces

- `Transaction` - transaction data
- `Message` - message data
- `Block` - block data
- `Action` - action data (transfers, swaps, etc.)
- `Trace` - transaction trace data
- `AccountState` - basic account state
- `AccountStateFull` - full account state with BOC data
- `WalletState` - wallet-specific state
- `V2AddressInformation` - v2 address information format
- `V2WalletInformation` - v2 wallet information format
- `TransactionDescr` - transaction description
- `APIOptions` - API options (key and network)

### Request Parameters

- `GetTransactionsParams` - parameters for getTransactions()
- `GetMessagesParams` - parameters for getMessages()
- `GetBlocksParams` - parameters for getBlocks()
- `GetActionsParams` - parameters for getActions()
- `GetTracesParams` - parameters for getTraces()
- `GetPendingActionsParams` - parameters for getPendingActions()
- `GetPendingTracesParams` - parameters for getPendingTraces()
- `GetAccountStatesParams` - parameters for getAccountStates()
- `GetAddressBookParams` - parameters for getAddressBook()
- `GetMetadataParams` - parameters for getMetadata()
- `GetWalletStatesParams` - parameters for getWalletStates()
- `V2EstimateFeeRequest` - parameters for estimateFee()
- `V2RunGetMethodRequest` - parameters for runGetMethod()
- `V2SendMessageRequest` - parameters for sendMessage()
- And others...

### Action Types

The library supports all TON action types:

- `ton_transfer` - TON transfers
- `jetton_transfer` - Jetton transfers
- `jetton_mint` - Jetton minting
- `jetton_burn` - Jetton burning
- `jetton_swap` - Token swaps
- `nft_mint` - NFT minting
- `contract_deploy` - Smart contract deployment
- `call_contract` - Smart contract calls
- `dex_deposit_liquidity` - DEX liquidity deposits
- `dex_withdraw_liquidity` - DEX liquidity withdrawals
- `stake_deposit` - Staking deposits
- `stake_withdrawal` - Staking withdrawals
- And more...

### APIOptions Interface

```typescript
interface APIOptions {
  apiKey?: string;
  chain?: "mainnet" | "testnet"; // mainnet by default
}
```

## Error Handling

```typescript
import { getTransactions } from "toncenter-v3-api";

try {
  const result = await getTransactions(
    { limit: 10 },
    { apiKey: "YOUR_API_KEY" }
  );
  console.log(result);
} catch (error) {
  console.error("API Error:", error.message);
  // Error will contain code and description from API
}
```

## API Key

Most methods require an API key from TON Center. You can get one at [toncenter.com](https://toncenter.com).

```typescript
// Pass API key and select network
const result = await getTransactions(params, {
  apiKey: "YOUR_API_KEY",
  chain: "testnet",
});

// Mainnet only (default)
const result2 = await getTransactions(params, { apiKey: "YOUR_API_KEY" });
```

## Constants

```typescript
import { BASE_URLS, DEFAULT_CHAIN } from "toncenter-v3-api";

console.log(BASE_URLS.mainnet); // "https://toncenter.com/api/v3"
console.log(BASE_URLS.testnet); // "https://testnet.toncenter.com/api/v3"
console.log(DEFAULT_CHAIN); // "mainnet"
```

## Development

### Code Quality

This project uses ESLint and Prettier for code quality and consistent formatting:

```bash
# Install dependencies
bun install

# Check code quality
bun run lint              # ESLint check
bun run format:check      # Prettier check
bun run typecheck         # TypeScript type check
bun run check             # All quality checks

# Auto-fix issues
bun run lint:fix          # Fix ESLint issues
bun run format            # Format with Prettier
bun run fix               # Fix all issues

# Build with quality checks
bun run build             # Full build with pre-checks
bun run build:fast        # Fast build without checks
```

### Build Process

The build process includes automatic quality checks:

1. **ESLint** - Code quality and standards
2. **Prettier** - Code formatting
3. **TypeScript** - Type checking
4. **Bundle** - Create distribution file

```bash
# This runs all checks before building
bun run build

# Output:
# ✅ ESLint check passed
# ✅ Prettier check passed
# ✅ TypeScript check passed
# ✅ Bundle created: dist/index.js
```

### Scripts

```bash
# Install dependencies
bun install

# Run example
bun run example

# Build with quality checks (recommended)
bun run build

# Fast build without checks (development only)
bun run build:fast
```

## Requirements

- Node.js >= 18.0.0
- TypeScript >= 5.0.0 (peer dependency)

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with [Bun](https://bun.sh) for TON blockchain via TON Center v3 API.
