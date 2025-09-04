// Example usage of TON Center v3 API
import {
  getTransactions,
  getMasterchainInfo,
  getBlocks,
  getMessages,
} from "./index";

async function exampleUsage() {
  const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your API key

  try {
    console.log("🚀 Starting work with TON Center v3 API...\n");

    // Get masterchain info (mainnet by default)
    console.log("📊 Getting masterchain info (mainnet)...");
    const info = await getMasterchainInfo({ apiKey: API_KEY });
    console.log("Last block seqno:", info.last.seqno);
    console.log("Last block hash:", info.last.root_hash, "\n");

    // Get masterchain info from testnet
    console.log("📊 Getting masterchain info (testnet)...");
    const testnetInfo = await getMasterchainInfo({
      apiKey: API_KEY,
      chain: "testnet",
    });
    console.log("Testnet last block seqno:", testnetInfo.last.seqno);
    console.log("Testnet last block hash:", testnetInfo.last.root_hash, "\n");

    // Get latest blocks
    console.log("🧱 Getting latest blocks...");
    const blocks = await getBlocks(
      {
        limit: 3,
        sort: "desc",
      },
      { apiKey: API_KEY }
    );
    console.log(`Found blocks: ${blocks.blocks.length}`);
    blocks.blocks.forEach((block, i) => {
      console.log(
        `${i + 1}. Block ${block.seqno} (workchain: ${block.workchain})`
      );
    });
    console.log();

    // Get latest transactions
    console.log("💳 Getting latest transactions...");
    const transactions = await getTransactions(
      {
        limit: 5,
        sort: "desc",
      },
      { apiKey: API_KEY }
    );
    console.log(`Found transactions: ${transactions.transactions.length}`);
    transactions.transactions.forEach((tx, i) => {
      console.log(
        `${i + 1}. Transaction ${tx.hash.slice(0, 8)}... (lt: ${tx.lt})`
      );
    });
    console.log();

    // Get latest messages from testnet
    console.log("📧 Getting latest messages (testnet)...");
    const messages = await getMessages(
      {
        limit: 3,
        sort: "desc",
      },
      { apiKey: API_KEY, chain: "testnet" }
    );
    console.log(`Found messages: ${messages.messages.length}`);
    messages.messages.forEach((msg, i) => {
      console.log(
        `${i + 1}. Message ${msg.msg_hash.slice(0, 8)}... (value: ${msg.value})`
      );
    });

    console.log("\n✅ Example completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Run example only if file is executed directly
if (import.meta.main) {
  exampleUsage();
}
