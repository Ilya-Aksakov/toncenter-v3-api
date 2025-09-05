# TON Center v3 API

TypeScript/JavaScript library for working with [TON Center v3 API](https://toncenter.com/api/v3/). All methods with "blockchain" tag are implemented with full typing.

[![npm version](https://badge.fury.io/js/toncenter-v3-api.svg)](https://badge.fury.io/js/toncenter-v3-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
# npm
npm install toncenter-v3-api

# yarn
yarn add toncenter-v3-api

# pnpm
pnpm add toncenter-v3-api

# bun
bun add toncenter-v3-api
```

## Quick Start

```typescript
import {
  getTransactions,
  getMasterchainInfo,
  getBlocks,
  getActions,
  getTraces,
  getAccountStates,
  getAddressInformation,
  runGetMethod,
} from "toncenter-v3-api";

// Get masterchain info (mainnet by default)
const info = await getMasterchainInfo({ apiKey: "YOUR_API_KEY" });
console.log("Last block:", info.last);

// Get info from testnet
const testnetInfo = await getMasterchainInfo({
  apiKey: "YOUR_API_KEY",
  chain: "testnet",
});

// Get latest transactions
const transactions = await getTransactions(
  {
    limit: 10,
    sort: "desc",
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get blocks with filtering from testnet
const blocks = await getBlocks(
  {
    limit: 5,
    start_utime: Math.floor(Date.now() / 1000) - 3600, // last hour
  },
  { apiKey: "YOUR_API_KEY", chain: "testnet" }
);

// Get recent actions
const actions = await getActions(
  {
    limit: 10,
    sort: "desc",
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get specific action types (jetton transfers)
const jettonActions = await getActions(
  {
    action_type: ["jetton_transfer", "jetton_mint"],
    limit: 5,
  },
  { apiKey: "YOUR_API_KEY" }
);
```

## Features

- ✅ **Full TypeScript support** with strict typing
- ✅ **All blockchain, actions, accounts, and v2 compatibility methods** from TON Center v3 API
- ✅ **Mainnet & Testnet** support
- ✅ **Modern ESM** and CommonJS compatibility
- ✅ **Zero dependencies** - lightweight and fast
- ✅ **Well documented** with examples
- ✅ **Production ready** with comprehensive testing

## Available Methods

### Blockchain API

| Method                                | Description                                 |
| ------------------------------------- | ------------------------------------------- |
| `getAdjacentTransactions()`           | Get parent/child transactions               |
| `getBlocks()`                         | Get blocks by filters                       |
| `getMasterchainBlockShardState()`     | Get masterchain block shard state           |
| `getMasterchainBlockShards()`         | Get masterchain block shards                |
| `getMasterchainInfo()`                | Get info about first and last indexed block |
| `getMessages()`                       | Get messages by filters                     |
| `getPendingTransactions()`            | Get pending transactions                    |
| `getTransactions()`                   | Get transactions by filters                 |
| `getTransactionsByMasterchainBlock()` | Get transactions from masterchain block     |
| `getTransactionsByMessage()`          | Get transactions by message hash            |

### Actions API

| Method                | Description                                     |
| --------------------- | ----------------------------------------------- |
| `getActions()`        | Get actions by filters (transfers, swaps, etc.) |
| `getPendingActions()` | Get pending actions by filters                  |
| `getTraces()`         | Get transaction traces by filters               |
| `getPendingTraces()`  | Get pending transaction traces                  |

### Accounts API

| Method               | Description                              |
| -------------------- | ---------------------------------------- |
| `getAccountStates()` | Get account states by addresses          |
| `getAddressBook()`   | Get address book for specified addresses |
| `getMetadata()`      | Get metadata for addresses               |
| `getWalletStates()`  | Get wallet states by addresses           |

## Network Support

The library supports both mainnet and testnet:

```typescript
// Mainnet (default)
const mainnetTx = await getTransactions(
  { limit: 10 },
  { apiKey: "YOUR_API_KEY" }
);

// Testnet
const testnetTx = await getTransactions(
  { limit: 10 },
  { apiKey: "YOUR_API_KEY", chain: "testnet" }
);
```

## Usage Examples

### Getting Transactions

```typescript
import { getTransactions } from "toncenter-v3-api";

// Get transactions for specific address
const accountTransactions = await getTransactions(
  {
    account: ["EQD6NM..."], // array of addresses
    limit: 50,
    sort: "desc",
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get transactions in time range from testnet
const timeRangeTransactions = await getTransactions(
  {
    start_utime: 1640995200, // January 1, 2022
    end_utime: 1672531200, // January 1, 2023
    limit: 100,
  },
  { apiKey: "YOUR_API_KEY", chain: "testnet" }
);
```

### Working with Messages

```typescript
import { getMessages, getTransactionsByMessage } from "toncenter-v3-api";

// Get messages between addresses
const messages = await getMessages(
  {
    source: "EQD6NM...",
    destination: "EQBx...",
    limit: 20,
  },
  { apiKey: "YOUR_API_KEY" }
);

// Find transactions by message hash in testnet
const transactionsByMsg = await getTransactionsByMessage(
  {
    msg_hash: "abc123...",
    direction: "in",
  },
  { apiKey: "YOUR_API_KEY", chain: "testnet" }
);
```

### Block Analysis

```typescript
import { getBlocks, getMasterchainBlockShards } from "toncenter-v3-api";

// Get latest blocks
const recentBlocks = await getBlocks(
  {
    limit: 10,
    sort: "desc",
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get shards for specific masterchain block
const shards = await getMasterchainBlockShards(
  {
    seqno: 12345678,
    limit: 50,
  },
  { apiKey: "YOUR_API_KEY" }
);
```

### Working with Actions

```typescript
import {
  getActions,
  getPendingActions,
  getTraces,
  getPendingTraces,
} from "toncenter-v3-api";

// Get recent actions of any type
const allActions = await getActions(
  {
    limit: 20,
    sort: "desc",
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get specific action types
const defiActions = await getActions(
  {
    action_type: [
      "jetton_swap",
      "dex_deposit_liquidity",
      "dex_withdraw_liquidity",
    ],
    limit: 10,
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get actions for specific account
const accountActions = await getActions(
  {
    account: "EQD6NM...",
    limit: 50,
    include_accounts: true, // Include address book
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get actions in time range
const timeRangeActions = await getActions(
  {
    start_utime: Math.floor(Date.now() / 1000) - 86400, // last 24 hours
    action_type: ["ton_transfer", "jetton_transfer"],
    limit: 100,
  },
  { apiKey: "YOUR_API_KEY", chain: "testnet" }
);

// Get pending actions
const pendingActions = await getPendingActions(
  {
    account: "EQD6NM...",
    supported_action_types: ["jetton_transfer", "ton_transfer"],
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get transaction traces with actions
const traces = await getTraces(
  {
    limit: 10,
    include_actions: true, // Include actions in traces
    start_utime: Math.floor(Date.now() / 1000) - 3600, // last hour
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get pending traces
const pendingTraces = await getPendingTraces(
  {
    account: "EQD6NM...",
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get account states
const accountStates = await getAccountStates(
  {
    address: ["EQD6NM...", "EQBx..."],
    include_boc: false,
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get wallet states
const walletStates = await getWalletStates(
  {
    address: ["EQD6NM...", "EQBx..."],
  },
  { apiKey: "YOUR_API_KEY", chain: "testnet" }
);
```

### Working with Accounts

````typescript
import {
  getAccountStates,
  getAddressBook,
  getMetadata,
  getWalletStates,
} from "toncenter-v3-api";

// Get account states with BOC data
const fullAccountStates = await getAccountStates(
  {
    address: ["EQD6NM...", "EQBx..."],
    include_boc: true, // Include code and data BOCs
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get account states without BOC (lighter response)
const lightAccountStates = await getAccountStates(
  {
    address: ["EQD6NM...", "EQBx..."],
    include_boc: false,
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get address book for human-readable addresses
const addressBook = await getAddressBook(
  {
    address: ["EQD6NM...", "EQBx..."],
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get metadata for addresses (token info, etc.)
const metadata = await getMetadata(
  {
    address: ["EQD6NM...", "EQBx..."],
  },
  { apiKey: "YOUR_API_KEY" }
);

// Get wallet states for wallet addresses
const walletStates = await getWalletStates(
  {
    address: ["EQD6NM...", "EQBx..."],
  },
  { apiKey: "YOUR_API_KEY" }
);

// Check if addresses are wallets
const walletsOnly = walletStates.wallets.filter(
  (wallet) => wallet.is_wallet
);

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
````

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
