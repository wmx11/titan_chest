export type Project = {
  name: string;
  address?: string;
  abi_id?: number;
  token_id?: number;
  token_pair_id?: number;
  network_id?: number;
  assets_token_id?: number;
  holders_endpoint?: string;
  average_holdings_endpoint?: string;
  enabled?: boolean;
};
