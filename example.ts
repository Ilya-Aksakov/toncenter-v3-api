// TON Center v3 API - Usage Examples

import {
  getTransactions,
  getMasterchainInfo,
  getBlocks,
  getMessages,
  getActions,
  getPendingActions,
  getPendingTraces,
  getTraces,
} from "./index";

async function main() {
  const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key

  console.log("🚀 TON Center v3 API Examples\n");

  try {
    // Example 1: Get masterchain info (mainnet)
    console.log("📊 Getting masterchain info (mainnet)...");
    const mainnetInfo = await getMasterchainInfo({ apiKey: API_KEY });
    console.log("First block:", mainnetInfo.first.seqno);
    console.log("Last block:", mainnetInfo.last.seqno);
    console.log("");

    // Example 2: Get masterchain info (testnet)
    console.log("📊 Getting masterchain info (testnet)...");
    const testnetInfo = await getMasterchainInfo({
      apiKey: API_KEY,
      chain: "testnet",
    });
    console.log("Testnet first block:", testnetInfo.first.seqno);
    console.log("Testnet last block:", testnetInfo.last.seqno);
    console.log("");

    // Example 3: Get recent transactions
    console.log("📝 Getting recent transactions...");
    const transactions = await getTransactions(
      {
        limit: 5,
        sort: "desc",
      },
      { apiKey: API_KEY }
    );
    console.log(`Found ${transactions.transactions.length} transactions`);
    console.log("");

    // Example 4: Get recent blocks
    console.log("🔗 Getting recent blocks...");
    const blocks = await getBlocks(
      {
        limit: 3,
        sort: "desc",
      },
      { apiKey: API_KEY }
    );
    console.log(`Found ${blocks.blocks.length} blocks`);
    console.log("");

    // Example 5: Get recent messages
    console.log("📬 Getting recent messages...");
    const messages = await getMessages(
      {
        limit: 3,
        sort: "desc",
      },
      { apiKey: API_KEY }
    );
    console.log(`Found ${messages.messages.length} messages`);
    console.log("");

    // Example 6: Get recent actions
    console.log("⚡ Getting recent actions...");
    const actions = await getActions(
      {
        limit: 5,
        sort: "desc",
      },
      { apiKey: API_KEY }
    );
    console.log(`Found ${actions.actions.length} actions`);
    if (actions.actions.length > 0) {
      console.log(
        "Action types:",
        actions.actions.map((a) => a.action_type).join(", ")
      );
    }
    console.log("");

    // Example 7: Get specific action types
    console.log("💎 Getting jetton transfer actions...");
    const jettonActions = await getActions(
      {
        action_type: ["jetton_transfer"],
        limit: 3,
        sort: "desc",
      },
      { apiKey: API_KEY }
    );
    console.log(`Found ${jettonActions.actions.length} jetton transfers`);
    console.log("");

    // Example 8: Get actions with accounts info
    console.log("👥 Getting actions with account info...");
    const actionsWithAccounts = await getActions(
      {
        limit: 2,
        include_accounts: true,
        sort: "desc",
      },
      { apiKey: API_KEY }
    );
    console.log(
      `Found ${actionsWithAccounts.actions.length} actions with accounts`
    );
    if (actionsWithAccounts.address_book) {
      console.log(
        `Address book contains ${
          Object.keys(actionsWithAccounts.address_book).length
        } addresses`
      );
    }
    console.log("");

    // Example 9: Get pending actions
    console.log("⏳ Getting pending actions...");
    const pendingActions = await getPendingActions(
      {
        supported_action_types: ["jetton_transfer", "ton_transfer"],
      },
      { apiKey: API_KEY }
    );
    console.log(`Found ${pendingActions.actions.length} pending actions`);
    console.log("");

    // Example 10: Get traces with actions
    console.log("🔍 Getting traces with actions...");
    const traces = await getTraces(
      {
        limit: 3,
        include_actions: true,
        sort: "desc",
      },
      { apiKey: API_KEY }
    );
    console.log(`Found ${traces.traces.length} traces`);
    if (traces.traces.length > 0 && traces.traces[0].actions) {
      console.log(`First trace has ${traces.traces[0].actions.length} actions`);
    }
    console.log("");

    // Example 11: Get pending traces
    console.log("⏳ Getting pending traces...");
    const pendingTraces = await getPendingTraces({}, { apiKey: API_KEY });
    console.log(`Found ${pendingTraces.traces.length} pending traces`);
    console.log("");

    // Example 12: Get traces by time range
    console.log("⏰ Getting traces from last hour...");
    const recentTraces = await getTraces(
      {
        start_utime: Math.floor(Date.now() / 1000) - 3600, // last hour
        limit: 5,
        sort: "desc",
      },
      { apiKey: API_KEY, chain: "testnet" }
    );
    console.log(`Found ${recentTraces.traces.length} traces from last hour`);
    console.log("");

    console.log("✅ All examples completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

main().catch(console.error);
