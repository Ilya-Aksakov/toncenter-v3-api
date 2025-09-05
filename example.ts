import {
  getMasterchainInfo,
  getTransactions,
  getBlocks,
  getMessages,
  getActions,
  getPendingActions,
  getTraces,
  getPendingTraces,
  getAccountStates,
  getWalletStates,
  getWalletInformation,
  estimateFee,
  runGetMethod,
  type APIOptions,
} from "./index";

async function main() {
  try {
    console.log("🚀 TON Center v3 API Library Example");
    console.log("====================================");

    // Basic configuration
    const options: APIOptions = {
      // apiKey: "your-api-key-here", // Uncomment to use API key
      chain: "mainnet", // Default: "mainnet", also supports "testnet"
    };

    const testnetOptions: APIOptions = {
      chain: "testnet",
    };

    // 1. Get masterchain info
    console.log("\n1. Getting masterchain info...");
    const mainnetInfo = await getMasterchainInfo(options);
    console.log("First block:", mainnetInfo.first?.seqno || "N/A");
    console.log("Last block:", mainnetInfo.last?.seqno || "N/A");
    console.log("");

    // Example with testnet
    console.log("2. Getting testnet masterchain info...");
    const testnetInfo = await getMasterchainInfo(testnetOptions);
    console.log("Testnet first block:", testnetInfo.first?.seqno || "N/A");
    console.log("Testnet last block:", testnetInfo.last?.seqno || "N/A");
    console.log("");

    // 3. Get recent transactions
    console.log("3. Getting recent transactions...");
    const transactions = await getTransactions(
      {
        limit: 5,
        sort: "desc",
      },
      options
    );
    console.log(`Found ${transactions.transactions?.length || 0} transactions`);
    console.log("");

    // 4. Get recent blocks
    console.log("4. Getting recent blocks...");
    const blocks = await getBlocks({ limit: 3 }, options);
    console.log(`Found ${blocks.blocks?.length || 0} blocks`);
    console.log("");

    // 5. Get recent messages
    console.log("5. Getting recent messages...");
    const messages = await getMessages({ limit: 3 }, options);
    console.log(`Found ${messages.messages?.length || 0} messages`);
    console.log("");

    // 6. Actions API examples
    console.log("6. Getting actions...");
    const actions = await getActions({ limit: 5 }, options);
    console.log(`Found ${actions.actions?.length || 0} actions`);
    if (actions.actions && actions.actions.length > 0) {
      console.log(
        "Action types:",
        actions.actions.map((a) => a.type).join(", ")
      );
    }
    console.log("");

    // Example 7: Get jetton transfers
    console.log("7. Getting jetton transfers...");
    const jettonActions = await getActions(
      {
        limit: 5,
        action_type: ["jetton_transfer"],
      },
      options
    );
    console.log(`Found ${jettonActions.actions?.length || 0} jetton transfers`);
    console.log("");

    // Example 8: Get actions with accounts
    console.log("8. Getting actions with accounts...");
    const actionsWithAccounts = await getActions(
      {
        limit: 3,
        account: "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
      },
      options
    );
    console.log(
      `Found ${actionsWithAccounts.actions?.length || 0} actions with accounts`
    );
    console.log("");

    // Example 9: Pending actions
    console.log("9. Getting pending actions...");
    const pendingActions = await getPendingActions({}, options);
    console.log(`Found ${pendingActions.actions?.length || 0} pending actions`);
    console.log("");

    // Example 10: Traces
    console.log("10. Getting traces...");
    const traces = await getTraces({ limit: 3 }, options);
    console.log(`Found ${traces.traces?.length || 0} traces`);
    if (traces.traces && traces.traces.length > 0 && traces.traces[0].actions) {
      console.log(`First trace has ${traces.traces[0].actions.length} actions`);
    }
    console.log("");

    // Example 11: Pending traces
    console.log("11. Getting pending traces...");
    const pendingTraces = await getPendingTraces({}, options);
    console.log(`Found ${pendingTraces.traces?.length || 0} pending traces`);
    console.log("");

    // Example 12: Recent traces (last hour)
    console.log("12. Getting recent traces from last hour...");
    const oneHourAgo = Math.floor(Date.now() / 1000) - 3600;
    const recentTraces = await getTraces(
      { limit: 5, start_utime: oneHourAgo },
      options
    );
    console.log(
      `Found ${recentTraces.traces?.length || 0} traces from last hour`
    );
    console.log("");

    // 13. Accounts API examples
    console.log("13. Checking account states...");
    const accountStates = await getAccountStates(
      {
        address: [
          "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
          "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c",
        ],
      },
      options
    );
    console.log(`Found ${accountStates.accounts?.length || 0} account states`);
    console.log("");

    // Example 14: Wallet information (v2 compatibility)
    console.log("14. Getting wallet information (v2 API)...");
    const walletInfo = await getWalletInformation(
      {
        address: "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
      },
      options
    );
    console.log(`Account status: ${walletInfo.status || "unknown"}`);
    console.log(`Balance: ${walletInfo.balance || 0} nanoTON`);
    console.log("");

    // Example 15: Wallet states
    console.log("15. Getting wallet states...");
    const walletStates = await getWalletStates(
      {
        address: ["EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs"],
      },
      options
    );
    console.log(`Found ${walletStates.wallets?.length || 0} wallet states`);
    if (walletStates.wallets && walletStates.wallets.length > 0) {
      console.log(
        `First wallet type: ${walletStates.wallets[0].wallet_type || "unknown"}`
      );
    }
    console.log("");

    // Example 16: Fee estimation (v2 compatibility)
    console.log("16. Estimating fees...");
    const feeEstimate = await estimateFee(
      {
        address: "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
        body: "te6cckEBAQEADgAAGGhlbGxvIHdvcmxkIQ==",
        init_code: "",
        init_data: "",
        ignore_chksig: true,
      },
      options
    );
    console.log(`Source fees: ${feeEstimate.source_fees?.gas_fee || 0} gas`);
    console.log(
      `Destination fees count: ${feeEstimate.destination_fees?.length || 0}`
    );
    console.log("");

    // Example 17: Run get method (v2 compatibility)
    console.log("17. Running get method...");
    const methodResult = await runGetMethod(
      {
        address: "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
        method: "seqno",
        stack: [],
      },
      options
    );
    console.log(`Stack size: ${methodResult.stack?.length || 0}`);
    console.log("");

    // Other API methods are available but commented out for brevity
    // You can uncomment and modify these examples as needed:

    // Example 18: Jettons API
    // const jettonInfo = await getJettonInfo({ address: "jetton_address" }, options);

    // Example 19: NFTs API
    // const nftCollections = await getNftCollections({ limit: 5 }, options);

    // Example 20: DNS API
    // const dnsInfo = await getDnsInfo({ domain: "example.ton" }, options);

    // Example 21: Send message (v2 compatibility) - COMMENTED OUT for safety
    // const messageResult = await sendMessage(
    //   { boc: "te6cckEBAQEADgAAGGhlbGxvIHdvcmxkIRF2Z7E=" },
    //   { apiKey: "your-key", chain: "testnet" }
    // );

    console.log("✅ All examples completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Run the example
main();
