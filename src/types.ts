export interface TradesResponse {
  data: Trade[];
  pagination: Pagination;
}

export interface Trade {
    "proxy_wallet": string,
    "side": "BUY" | "SELL",
    "token_id": string,
    "condition_id": string,
    "size": number,
    "price": number,
    "timestamp": number,
    "title": string,
    "slug": string,
    "icon": string,
    "event_slug": string,
    "outcome": string,
    "outcome_index": number,
    "name": string,
    "pseudonym": string,
    "transaction_hash": string
}

export interface Pagination {
  limit: number;
  offset: number;
  has_more: boolean;
  next_cursor: string;
}

export interface AddressMap {
    [key: string]: string;
}