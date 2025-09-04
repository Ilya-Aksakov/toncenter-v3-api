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
```

## Features

- ✅ **Full TypeScript support** with strict typing
- ✅ **All blockchain methods** from TON Center v3 API
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

## Data Types

The library is fully typed. Main types:

```typescript
import type {
  Transaction,
  Message,
  Block,
  GetTransactionsParams,
  TransactionsResponse,
  APIOptions,
} from "toncenter-v3-api";
```

### Main Interfaces

- `Transaction` - transaction data
- `Message` - message data
- `Block` - block data
- `AccountState` - account state
- `TransactionDescr` - transaction description
- `APIOptions` - API options (key and network)

### Request Parameters

- `GetTransactionsParams` - parameters for getTransactions()
- `GetMessagesParams` - parameters for getMessages()
- `GetBlocksParams` - parameters for getBlocks()
- And others...

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
