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
