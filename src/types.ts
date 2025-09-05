// TON Center v3 API Types - Generated from official Swagger documentation

export interface RequestError {
  code: number;
  error: string;
}

export interface APIOptions {
  apiKey?: string;
  chain?: "mainnet" | "testnet";
}

// Basic building blocks
export interface BlockId {
  seqno: number;
  shard: string;
  workchain: number;
}

export interface AddressBookRow {
  domain?: string;
  user_friendly?: string;
}

export interface AddressBook {
  [address: string]: AddressBookRow;
}

export interface TokenInfo {
  description?: string;
  extra?: { [key: string]: unknown };
  image?: string;
  name?: string;
  nft_index?: string;
  symbol?: string;
  type?: string;
  valid?: boolean;
}

export interface AddressMetadata {
  is_indexed?: boolean;
  token_info?: TokenInfo[];
}

export interface Metadata {
  [address: string]: AddressMetadata;
}

export interface MsgSize {
  bits: string;
  cells: string;
}

// Account related types
export interface AccountState {
  account_status?: string;
  balance?: string;
  code_boc?: string;
  code_hash?: string;
  data_boc?: string;
  data_hash?: string;
  extra_currencies?: { [key: string]: string };
  frozen_hash?: string;
  hash?: string;
}

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

// Account balance for stats
export interface AccountBalance {
  account?: string;
  balance?: string;
}

// Message related types
export interface DecodedContent {
  comment?: string;
  type?: string;
}

export interface MessageContent {
  body?: string;
  decoded?: DecodedContent;
  hash?: string;
}

export interface Message {
  bounce?: boolean;
  bounced?: boolean;
  created_at?: string;
  created_lt?: string;
  destination?: string;
  fwd_fee?: string;
  hash?: string;
  hash_norm?: string;
  ihr_disabled?: boolean;
  ihr_fee?: string;
  import_fee?: string;
  in_msg_tx_hash?: string;
  init_state?: MessageContent;
  message_content?: MessageContent;
  opcode?: number;
  out_msg_tx_hash?: string;
  source?: string;
  value?: string;
  value_extra_currencies?: { [key: string]: string };
}

// Transaction phases
export interface CreditPhase {
  credit?: string;
  credit_extra_currencies?: { [key: string]: string };
  due_fees_collected?: string;
}

export interface ComputePhase {
  account_activated?: boolean;
  exit_arg?: number;
  exit_code?: number;
  gas_credit?: string;
  gas_fees?: string;
  gas_limit?: string;
  gas_used?: string;
  mode?: number;
  msg_state_used?: boolean;
  reason?: string;
  skipped?: boolean;
  success?: boolean;
  vm_final_state_hash?: string;
  vm_init_state_hash?: string;
  vm_steps?: number;
}

export interface StoragePhase {
  status_change?: string;
  storage_fees_collected?: string;
  storage_fees_due?: string;
}

export interface ActionPhase {
  action_list_hash?: string;
  msgs_created?: number;
  no_funds?: boolean;
  result_arg?: number;
  result_code?: number;
  skipped_actions?: number;
  spec_actions?: number;
  status_change?: string;
  success?: boolean;
  tot_actions?: number;
  tot_msg_size?: MsgSize;
  total_action_fees?: string;
  total_fwd_fees?: string;
  valid?: boolean;
}

export interface BouncePhase {
  fwd_fees?: string;
  msg_fees?: string;
  msg_size?: MsgSize;
  req_fwd_fees?: string;
  type?: string;
}

export interface SplitInfo {
  acc_split_depth?: number;
  cur_shard_pfx_len?: number;
  sibling_addr?: string;
  this_addr?: string;
}

export interface TransactionDescr {
  aborted?: boolean;
  action?: ActionPhase;
  bounce?: BouncePhase;
  compute_ph?: ComputePhase;
  credit_first?: boolean;
  credit_ph?: CreditPhase;
  destroyed?: boolean;
  installed?: boolean;
  is_tock?: boolean;
  split_info?: SplitInfo;
  storage_ph?: StoragePhase;
  type?: string;
}

export interface Transaction {
  account?: string;
  account_state_after?: AccountState;
  account_state_before?: AccountState;
  block_ref?: BlockId;
  description?: TransactionDescr;
  emulated?: boolean;
  end_status?: string;
  hash?: string;
  in_msg?: Message;
  lt?: string;
  mc_block_seqno?: number;
  now?: number;
  orig_status?: string;
  out_msgs?: Message[];
  prev_trans_hash?: string;
  prev_trans_lt?: string;
  total_fees?: string;
  total_fees_extra_currencies?: { [key: string]: string };
  trace_external_hash?: string;
  trace_id?: string;
}

// Block related types
export interface Block {
  after_merge?: boolean;
  after_split?: boolean;
  before_split?: boolean;
  created_by?: string;
  end_lt?: string;
  file_hash?: string;
  flags?: number;
  gen_catchain_seqno?: number;
  gen_utime?: string;
  global_id?: number;
  key_block?: boolean;
  master_ref_seqno?: number;
  masterchain_block_ref?: BlockId;
  min_ref_mc_seqno?: number;
  prev_blocks?: BlockId[];
  prev_key_block_seqno?: number;
  rand_seed?: string;
  root_hash?: string;
  seqno?: number;
  shard?: string;
  start_lt?: string;
  tx_count?: number;
  validator_list_hash_short?: number;
  version?: number;
  vert_seqno?: number;
  vert_seqno_incr?: boolean;
  want_merge?: boolean;
  want_split?: boolean;
  workchain?: number;
}

export interface MasterchainInfo {
  first?: Block;
  last?: Block;
}

// Actions and traces
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
  accounts?: string[];
  action_id?: string;
  details?: unknown;
  end_lt?: string;
  end_utime?: number;
  start_lt?: string;
  start_utime?: number;
  success?: boolean;
  trace_end_lt?: string;
  trace_end_utime?: number;
  trace_external_hash?: string;
  trace_external_hash_norm?: string;
  trace_id?: string;
  trace_mc_seqno_end?: number;
  transactions?: string[];
  type?: string;
}

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

// Jettons
export interface JettonWalletMintlessInfo {
  amount?: string;
  custom_payload_api_uri?: string[];
  expire_at?: number;
  start_from?: number;
}

export interface JettonBurn {
  amount?: string;
  custom_payload?: string;
  jetton_master?: string;
  jetton_wallet?: string;
  owner?: string;
  query_id?: string;
  response_destination?: string;
  trace_id?: string;
  transaction_aborted?: boolean;
  transaction_hash?: string;
  transaction_lt?: string;
  transaction_now?: number;
}

export interface JettonMaster {
  address?: string;
  admin_address?: string;
  code_hash?: string;
  data_hash?: string;
  jetton_content?: { [key: string]: unknown };
  jetton_wallet_code_hash?: string;
  last_transaction_lt?: string;
  mintable?: boolean;
  total_supply?: string;
}

export interface JettonTransfer {
  amount?: string;
  custom_payload?: string;
  destination?: string;
  forward_payload?: string;
  forward_ton_amount?: string;
  jetton_master?: string;
  query_id?: string;
  response_destination?: string;
  source?: string;
  source_wallet?: string;
  trace_id?: string;
  transaction_aborted?: boolean;
  transaction_hash?: string;
  transaction_lt?: string;
  transaction_now?: number;
}

export interface JettonWallet {
  address?: string;
  balance?: string;
  code_hash?: string;
  data_hash?: string;
  jetton?: string;
  last_transaction_lt?: string;
  mintless_info?: JettonWalletMintlessInfo;
  owner?: string;
}

// NFTs
export interface NFTCollection {
  address?: string;
  code_hash?: string;
  collection_content?: { [key: string]: unknown };
  data_hash?: string;
  last_transaction_lt?: string;
  next_item_index?: string;
  owner_address?: string;
}

export interface NFTItem {
  address?: string;
  auction_contract_address?: string;
  code_hash?: string;
  collection?: NFTCollection;
  collection_address?: string;
  content?: { [key: string]: unknown };
  data_hash?: string;
  index?: string;
  init?: boolean;
  last_transaction_lt?: string;
  on_sale?: boolean;
  owner_address?: string;
  real_owner?: string;
  sale_contract_address?: string;
}

export interface NFTTransfer {
  custom_payload?: string;
  forward_amount?: string;
  forward_payload?: string;
  new_owner?: string;
  nft_address?: string;
  nft_collection?: string;
  old_owner?: string;
  query_id?: string;
  response_destination?: string;
  trace_id?: string;
  transaction_aborted?: boolean;
  transaction_hash?: string;
  transaction_lt?: string;
  transaction_now?: number;
}

// DNS
export interface DNSRecord {
  dns_next_resolver?: string;
  dns_site_adnl?: string;
  dns_storage_bag_id?: string;
  dns_wallet?: string;
  domain?: string;
  nft_item_address?: string;
  nft_item_owner?: string;
}

// Multisig
export interface OrderAction {
  body_raw?: number[];
  destination?: string;
  error?: string;
  parsed?: boolean;
  parsed_body?: unknown;
  parsed_body_type?: string;
  send_mode?: number;
  value?: string;
}

export interface MultisigOrder {
  actions?: OrderAction[];
  address?: string;
  approvals_mask?: string;
  approvals_num?: number;
  code_hash?: string;
  data_hash?: string;
  expiration_date?: number;
  last_transaction_lt?: string;
  multisig_address?: string;
  order_boc?: string;
  order_seqno?: string;
  sent_for_execution?: boolean;
  signers?: string[];
  threshold?: number;
}

export interface Multisig {
  address?: string;
  code_hash?: string;
  data_hash?: string;
  last_transaction_lt?: string;
  next_order_seqno?: string;
  orders?: MultisigOrder[];
  proposers?: string[];
  signers?: string[];
  threshold?: number;
}

// Vesting
export interface VestingInfo {
  address?: string;
  cliff_duration?: number;
  owner_address?: string;
  sender_address?: string;
  start_time?: number;
  total_amount?: string;
  total_duration?: number;
  unlock_period?: number;
  whitelist?: string[];
}

// Type alias for backward compatibility
export type VestingContract = VestingInfo;

// API v2 compatibility types
export interface V2AddressInformation {
  balance?: string;
  code?: string;
  data?: string;
  frozen_hash?: string;
  last_transaction_hash?: string;
  last_transaction_lt?: string;
  status?: string;
}

export interface V2WalletInformation {
  balance?: string;
  last_transaction_hash?: string;
  last_transaction_lt?: string;
  seqno?: number;
  status?: string;
  wallet_id?: number;
  wallet_type?: string;
}

export interface V2EstimateFeeRequest {
  address?: string;
  body?: string;
  ignore_chksig?: boolean;
  init_code?: string;
  init_data?: string;
}

export interface V2EstimatedFee {
  fwd_fee?: number;
  gas_fee?: number;
  in_fwd_fee?: number;
  storage_fee?: number;
}

export interface V2EstimateFeeResult {
  destination_fees?: V2EstimatedFee[];
  source_fees?: V2EstimatedFee;
}

export interface V2SendMessageRequest {
  boc?: string;
}

export interface V2SendMessageResult {
  message_hash?: string;
  message_hash_norm?: string;
}

export interface V2StackEntity {
  type?: string;
  value?: unknown;
}

export interface V2RunGetMethodRequest {
  address?: string;
  method?: string;
  stack?: V2StackEntity[];
}

export interface V2RunGetMethodResult {
  gas_used?: number;
  stack?: V2StackEntity[];
  exit_code?: number;
}

// Response types
export interface TransactionsResponse {
  transactions?: Transaction[];
  address_book?: AddressBook;
}

export interface MessagesResponse {
  messages?: Message[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface BlocksResponse {
  blocks?: Block[];
}

export interface AccountStatesResponse {
  accounts?: AccountStateFull[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface WalletStatesResponse {
  wallets?: WalletState[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface ActionsResponse {
  actions?: Action[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface TracesResponse {
  traces?: Trace[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface JettonBurnsResponse {
  jetton_burns?: JettonBurn[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface JettonMastersResponse {
  jetton_masters?: JettonMaster[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface JettonTransfersResponse {
  jetton_transfers?: JettonTransfer[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface JettonWalletsResponse {
  jetton_wallets?: JettonWallet[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface NFTCollectionsResponse {
  nft_collections?: NFTCollection[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface NFTItemsResponse {
  nft_items?: NFTItem[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface NFTTransfersResponse {
  nft_transfers?: NFTTransfer[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export interface DNSRecordsResponse {
  records?: DNSRecord[];
  address_book?: AddressBook;
}

export interface MultisigOrderResponse {
  orders?: MultisigOrder[];
  address_book?: AddressBook;
}

export interface MultisigResponse {
  multisigs?: Multisig[];
  address_book?: AddressBook;
}

export type TopAccountsByBalanceResponse = AccountBalance[];

export interface VestingContractsResponse {
  vesting_contracts?: VestingInfo[];
  address_book?: AddressBook;
}

// Parameter interfaces for all API methods
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

export interface GetAddressInformationParams {
  address: string;
  use_v2?: boolean;
}

export interface GetWalletInformationParams {
  address: string;
  use_v2?: boolean;
}

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
