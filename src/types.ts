// TON Center v3 API Types

export interface RequestError {
  code: number;
  error: string;
}

export interface APIOptions {
  apiKey?: string;
  chain?: "mainnet" | "testnet";
}

export interface BlockId {
  workchain: number;
  shard: string;
  seqno: number;
  root_hash: string;
  file_hash: string;
}

export interface AddressBook {
  [address: string]: {
    user_friendly?: string;
  };
}

export interface AddressMetadata {
  name?: string;
  description?: string;
  image?: string;
  symbol?: string;
}

export interface Metadata {
  [address: string]: AddressMetadata;
}

export interface MasterchainInfo {
  first: BlockId;
  last: BlockId;
}

export interface AccountState {
  hash: string;
  balance: string;
  account_status: string;
  frozen_hash: string;
  code: string;
  data: string;
}

export interface MessageContent {
  body: string;
  decoded?: DecodedContent;
  hash: string;
}

export interface DecodedContent {
  type: string;
  comment?: string;
}

export interface Message {
  msg_hash: string;
  body_hash: string;
  source: string;
  destination: string;
  value: string;
  fwd_fee: string;
  ihr_fee: string;
  import_fee: string;
  created_at: number;
  created_lt: string;
  opcode?: number;
  bounced: boolean;
  ihr_disabled: boolean;
  bounce: boolean;
  message_content: MessageContent;
  init_state?: MessageContent;
  raw_body?: string;
  value_extra_currencies?: Record<string, string>;
  in_msg_tx_hash?: string;
  out_msg_tx_hash?: string;
}

export interface ComputePhase {
  type: string;
  success: boolean;
  gas_fees: string;
  gas_used: string;
  gas_limit: string;
  exit_code?: number;
  skipped_reason?: string;
}

export interface StoragePhase {
  storage_fees_collected: string;
  storage_fees_due: string;
  status_change: string;
}

export interface CreditPhase {
  fees_collected: string;
  credit: string;
}

export interface ActionPhase {
  success: boolean;
  result_code: number;
  total_actions: number;
  skipped_actions: number;
  fwd_fees: string;
  total_fees: string;
}

export interface BouncePhase {
  type: string;
  msg_fees: string;
  req_fwd_fees: string;
}

export interface SplitInfo {
  cur_shard_pfx_len: number;
  acc_split_depth: number;
  this_addr: string;
  sibling_addr: string;
}

export interface TransactionDescr {
  type: string;
  credit_first: boolean;
  storage_ph?: StoragePhase;
  credit_ph?: CreditPhase;
  compute_ph?: ComputePhase;
  action?: ActionPhase;
  bounce?: BouncePhase;
  aborted: boolean;
  destroyed: boolean;
  split_info?: SplitInfo;
  installed: boolean;
  is_tock: boolean;
}

export interface Transaction {
  hash: string;
  lt: string;
  account: string;
  now: number;
  orig_status: string;
  end_status: string;
  total_fees: string;
  total_fees_extra_currencies?: Record<string, string>;
  description: TransactionDescr;
  block_ref: BlockId;
  in_msg?: Message;
  out_msgs: Message[];
  account_state_before: AccountState;
  account_state_after: AccountState;
  mc_block_seqno: number;
  trace_id?: string;
  trace_external_hash?: string;
  emulated?: boolean;
  prev_trans_hash: string;
  prev_trans_lt: string;
}

export interface Block {
  workchain: number;
  shard: string;
  seqno: number;
  root_hash: string;
  file_hash: string;
  mc_block_seqno: number;
  gen_utime: number;
  start_lt: string;
  end_lt: string;
  vert_seqno: number;
  vert_seqno_incr: number;
  gen_catchain_seqno: number;
  min_ref_mc_seqno: number;
  prev_key_block_seqno: number;
  gen_software_version?: number;
  gen_software_capabilities?: string;
  global_id: number;
  version: number;
  after_merge: boolean;
  before_split: boolean;
  after_split: boolean;
  want_split: boolean;
  want_merge: boolean;
  key_block: boolean;
  tx_count: number;
}

// Response types for blockchain endpoints
export interface TransactionsResponse {
  transactions: Transaction[];
  address_book: AddressBook;
}

export interface MessagesResponse {
  messages: Message[];
  address_book: AddressBook;
  metadata: Metadata;
}

export interface BlocksResponse {
  blocks: Block[];
  address_book: AddressBook;
}

// Request parameter types for blockchain endpoints
export interface GetTransactionsParams {
  workchain?: number;
  shard?: string;
  seqno?: number;
  mc_seqno?: number;
  account?: string[];
  exclude_account?: string[];
  hash?: string;
  lt?: number;
  start_utime?: number;
  end_utime?: number;
  start_lt?: number;
  end_lt?: number;
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
}

export interface GetBlocksParams {
  workchain?: number;
  shard?: string;
  seqno?: number;
  mc_seqno?: number;
  start_utime?: number;
  end_utime?: number;
  start_lt?: number;
  end_lt?: number;
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
}

export interface GetMessagesParams {
  msg_hash?: string[];
  body_hash?: string;
  source?: string;
  destination?: string;
  opcode?: string;
  start_utime?: number;
  end_utime?: number;
  start_lt?: number;
  end_lt?: number;
  direction?: "in" | "out";
  exclude_externals?: boolean;
  only_externals?: boolean;
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
}

export interface GetAdjacentTransactionsParams {
  hash?: string;
  direction?: "in" | "out";
}

export interface GetTransactionsByMessageParams {
  msg_hash?: string;
  body_hash?: string;
  opcode?: string;
  direction?: "in" | "out";
  limit?: number;
  offset?: number;
}

export interface GetPendingTransactionsParams {
  account?: string[];
  trace_id?: string[];
}

export interface GetMasterchainBlockShardsParams {
  seqno: number;
  limit?: number;
  offset?: number;
}

export interface GetMasterchainBlockShardStateParams {
  seqno: number;
}

export interface GetTransactionsByMasterchainBlockParams {
  seqno: number;
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
}

// Actions API Types
export type ActionType =
  | "call_contract"
  | "contract_deploy"
  | "ton_transfer"
  | "auction_bid"
  | "change_dns"
  | "dex_deposit_liquidity"
  | "dex_withdraw_liquidity"
  | "delete_dns"
  | "renew_dns"
  | "election_deposit"
  | "election_recover"
  | "jetton_burn"
  | "jetton_swap"
  | "jetton_transfer"
  | "jetton_mint"
  | "nft_mint"
  | "tick_tock"
  | "stake_deposit"
  | "stake_withdrawal"
  | "stake_withdrawal_request"
  | "subscribe"
  | "unsubscribe";

export interface Action {
  action_id: string;
  trace_id: string;
  action_type: ActionType;
  success: boolean;
  mc_block_seqno: number;
  trace_end_utime: number;
  trace_end_lt: string;
  // Additional action-specific fields would go here based on action type
  [key: string]: unknown;
}

export interface GetActionsParams {
  account?: string;
  tx_hash?: string[];
  msg_hash?: string[];
  action_id?: string[];
  trace_id?: string[];
  mc_seqno?: number;
  start_utime?: number;
  end_utime?: number;
  start_lt?: number;
  end_lt?: number;
  action_type?: ActionType[];
  exclude_action_type?: ActionType[];
  supported_action_types?: string[];
  include_accounts?: boolean;
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
}

export interface ActionsResponse {
  actions: Action[];
  address_book?: AddressBook;
}

// Trace-related types
export interface TraceMeta {
  classification_state?: string;
  messages?: number;
  pending_messages?: number;
  trace_state?: string;
  transactions?: number;
}

export interface TraceNode {
  children?: TraceNode[];
  in_msg?: Message;
  in_msg_hash?: string;
  transaction?: Transaction;
  tx_hash?: string;
}

export interface Trace {
  actions?: Action[];
  end_lt?: string;
  end_utime?: number;
  external_hash?: string;
  is_incomplete?: boolean;
  mc_seqno_end?: string;
  mc_seqno_start?: string;
  start_lt?: string;
  start_utime?: number;
  trace?: TraceNode;
  trace_id?: string;
  trace_info?: TraceMeta;
  transactions?: { [key: string]: Transaction };
  transactions_order?: string[];
  warning?: string;
}

export interface TracesResponse {
  traces: Trace[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

// Parameters for actions methods
export interface GetPendingActionsParams {
  account?: string;
  ext_msg_hash?: string[];
  supported_action_types?: string[];
}

export interface GetPendingTracesParams {
  account?: string;
  ext_msg_hash?: string[];
}

export interface GetTracesParams {
  account?: string;
  trace_id?: string[];
  tx_hash?: string[];
  msg_hash?: string[];
  mc_seqno?: number;
  start_utime?: number;
  end_utime?: number;
  start_lt?: number;
  end_lt?: number;
  include_actions?: boolean;
  supported_action_types?: string[];
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
}

// Accounts API Types
export interface AccountStateFull {
  account_state_hash?: string;
  address?: string;
  balance?: string;
  code_boc?: string;
  code_hash?: string;
  contract_methods?: number[];
  data_boc?: string;
  data_hash?: string;
  extra_currencies?: { [key: string]: string };
  frozen_hash?: string;
  last_transaction_hash?: string;
  last_transaction_lt?: string;
  status?: string;
}

export interface AccountStatesResponse {
  accounts: AccountStateFull[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface WalletState {
  address?: string;
  balance?: string;
  code_hash?: string;
  extra_currencies?: { [key: string]: string };
  is_signature_allowed?: boolean;
  is_wallet?: boolean;
  last_transaction_hash?: string;
  last_transaction_lt?: string;
  seqno?: number;
  status?: string;
  wallet_id?: number;
  wallet_type?: string;
}

export interface WalletStatesResponse {
  wallets: WalletState[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

// Parameters for accounts methods
export interface GetAccountStatesParams {
  address: string[];
  include_boc?: boolean;
}

export interface GetAddressBookParams {
  address: string[];
}

export interface GetMetadataParams {
  address: string[];
}

export interface GetWalletStatesParams {
  address: string[];
}

// API/v2 Types - Legacy compatibility methods
export interface V2AddressInformation {
  balance: string;
  code: string;
  data: string;
  frozen_hash: string;
  last_transaction_hash: string;
  last_transaction_lt: string;
  status: string;
}

export interface V2WalletInformation {
  balance: string;
  last_transaction_hash: string;
  last_transaction_lt: string;
  seqno: number;
  status: string;
  wallet_id: number;
  wallet_type: string;
}

export interface V2EstimateFeeRequest {
  address: string;
  body: string;
  ignore_chksig?: boolean;
  init_code?: string;
  init_data?: string;
}

export interface V2EstimatedFee {
  fwd_fee: number;
  gas_fee: number;
  in_fwd_fee: number;
  storage_fee: number;
}

export interface V2EstimateFeeResult {
  destination_fees: V2EstimatedFee[];
  source_fees: V2EstimatedFee;
}

export interface V2SendMessageRequest {
  boc: string;
}

export interface V2SendMessageResult {
  message_hash: string;
  message_hash_norm: string;
}

export interface V2StackEntity {
  type: string;
  value: unknown;
}

export interface V2RunGetMethodRequest {
  address: string;
  method: string;
  stack?: V2StackEntity[];
}

export interface V2RunGetMethodResult {
  gas_used?: number;
  stack: V2StackEntity[];
  exit_code?: number;
}

// Parameters for api/v2 methods
export interface GetAddressInformationParams {
  address: string;
  use_v2?: boolean;
}

export interface GetWalletInformationParams {
  address: string;
  use_v2?: boolean;
}

// Jettons API Types
export interface JettonBurn {
  amount: string;
  custom_payload?: string;
  jetton_master: string;
  jetton_wallet: string;
  owner: string;
  query_id?: string;
  response_destination?: string;
  trace_id?: string;
  transaction_aborted: boolean;
  transaction_hash: string;
  transaction_lt: string;
  transaction_now: number;
}

export interface JettonMaster {
  address: string;
  admin_address?: string;
  code_hash: string;
  data_hash: string;
  jetton_content?: { [key: string]: unknown };
  jetton_wallet_code_hash: string;
  last_transaction_lt: string;
  mintable: boolean;
  total_supply: string;
}

export interface JettonTransfer {
  amount: string;
  custom_payload?: string;
  destination: string;
  forward_payload?: string;
  forward_ton_amount?: string;
  jetton_master: string;
  query_id?: string;
  response_destination?: string;
  source: string;
  source_wallet: string;
  trace_id?: string;
  transaction_aborted: boolean;
  transaction_hash: string;
  transaction_lt: string;
  transaction_now: number;
}

export interface JettonWallet {
  address: string;
  balance: string;
  code_hash: string;
  data_hash: string;
  jetton: string;
  last_transaction_lt: string;
  owner: string;
}

export interface JettonBurnsResponse {
  jetton_burns: JettonBurn[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface JettonMastersResponse {
  jetton_masters: JettonMaster[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface JettonTransfersResponse {
  jetton_transfers: JettonTransfer[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface JettonWalletsResponse {
  jetton_wallets: JettonWallet[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

// NFTs API Types
export interface NFTCollection {
  address: string;
  code_hash: string;
  collection_content?: { [key: string]: unknown };
  data_hash: string;
  last_transaction_lt: string;
  next_item_index?: string;
  owner_address?: string;
}

export interface NFTItem {
  address: string;
  auction_contract_address?: string;
  code_hash: string;
  collection_address?: string;
  content?: { [key: string]: unknown };
  data_hash: string;
  index?: string;
  init: boolean;
  last_transaction_lt: string;
  on_sale: boolean;
  owner_address?: string;
  real_owner?: string;
  sale_contract_address?: string;
}

export interface NFTTransfer {
  custom_payload?: string;
  forward_amount?: string;
  forward_payload?: string;
  new_owner: string;
  nft_address: string;
  nft_collection?: string;
  old_owner: string;
  query_id?: string;
  response_destination?: string;
  trace_id?: string;
  transaction_aborted: boolean;
  transaction_hash: string;
  transaction_lt: string;
  transaction_now: number;
}

export interface NFTCollectionsResponse {
  nft_collections: NFTCollection[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface NFTItemsResponse {
  nft_items: NFTItem[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface NFTTransfersResponse {
  nft_transfers: NFTTransfer[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

// DNS API Types
export interface DNSRecord {
  dns_next_resolver?: string;
  dns_site_adnl?: string;
  dns_storage_bag_id?: string;
  dns_wallet?: string;
  domain: string;
  nft_item_address?: string;
  nft_item_owner?: string;
}

export interface DNSRecordsResponse {
  records: DNSRecord[];
  address_book?: AddressBook;
}

// Multisig API Types
export interface MultisigOrder {
  address: string;
  approvals_mask: string;
  approvals_num: number;
  code_hash: string;
  data_hash: string;
  expiration_date?: number;
  last_transaction_lt: string;
  multisig_address: string;
  order_boc?: string;
  order_seqno: string;
  sent_for_execution: boolean;
  signers: string[];
  threshold: number;
}

export interface Multisig {
  address: string;
  code_hash: string;
  data_hash: string;
  last_transaction_lt: string;
  next_order_seqno?: string;
  orders?: MultisigOrder[];
  proposers: string[];
  signers: string[];
  threshold: number;
}

export interface MultisigOrderResponse {
  orders: MultisigOrder[];
  address_book?: AddressBook;
}

export interface MultisigResponse {
  multisigs: Multisig[];
  address_book?: AddressBook;
}

// Stats API Types
export interface AccountBalance {
  account: string;
  balance: string;
}

export type TopAccountsByBalanceResponse = AccountBalance[];

// Vesting API Types
export interface VestingContract {
  address: string;
  cliff_duration: number;
  owner_address: string;
  sender_address: string;
  start_time: number;
  total_amount: string;
  total_duration: number;
  unlock_period: number;
  whitelist: string[];
}

export interface VestingContractsResponse {
  vesting_contracts: VestingContract[];
  address_book?: AddressBook;
}

// Parameters interfaces
export interface GetJettonBurnsParams {
  address?: string[];
  jetton_wallet?: string[];
  jetton_master?: string;
  start_utime?: number;
  end_utime?: number;
  start_lt?: number;
  end_lt?: number;
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
}

export interface GetJettonMastersParams {
  address?: string[];
  admin_address?: string[];
  limit?: number;
  offset?: number;
}

export interface GetJettonTransfersParams {
  owner_address?: string[];
  jetton_wallet?: string[];
  jetton_master?: string;
  direction?: "in" | "out";
  start_utime?: number;
  end_utime?: number;
  start_lt?: number;
  end_lt?: number;
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
}

export interface GetJettonWalletsParams {
  address?: string[];
  owner_address?: string[];
  jetton_address?: string[];
  exclude_zero_balance?: boolean;
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
}

export interface GetNFTCollectionsParams {
  collection_address?: string[];
  owner_address?: string[];
  limit?: number;
  offset?: number;
}

export interface GetNFTItemsParams {
  address?: string[];
  owner_address?: string[];
  collection_address?: string[];
  index?: string[];
  limit?: number;
  offset?: number;
}

export interface GetNFTTransfersParams {
  owner_address?: string[];
  item_address?: string[];
  collection_address?: string;
  direction?: "in" | "out";
  start_utime?: number;
  end_utime?: number;
  start_lt?: number;
  end_lt?: number;
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
}

export interface GetDNSRecordsParams {
  wallet: string;
}

export interface GetMultisigOrdersParams {
  address?: string[];
  multisig_address?: string[];
  parse_actions?: boolean;
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
}

export interface GetMultisigWalletsParams {
  address?: string[];
  wallet_address?: string[];
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
  include_orders?: boolean;
}

export interface GetTopAccountsByBalanceParams {
  limit?: number;
  offset?: number;
}

export interface GetVestingContractsParams {
  contract_address?: string[];
  wallet_address?: string[];
  check_whitelist?: boolean;
  limit?: number;
  offset?: number;
}
