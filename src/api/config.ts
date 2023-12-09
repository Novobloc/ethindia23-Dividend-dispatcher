export const baseURL = "https://api.1inch.dev";
export const proxyURL = "http://localhost:3000/api?url=";

export const url = proxyURL + baseURL;

export const urlConfig = {
  token: {
    GET_TOKEN_LIST: (chainId: string) => `${url}/token/v1.2/${chainId}/token-list`
  },
  portfolio: {
    GET_CHART: (token: string, vsCurrency: string, chainId: string) =>
      `/portfolio/v2/prices/token_prices/time_range?chain_id=${chainId}&contract_address=${token}&currency=${vsCurrency}&granularity=day`
  },
  history: {
    GET_TRANSACTIONS: (address: string) => `${url}/history/v2.0/history/0x5B4d77e199FE8e5090009C72d2a5581C74FEbE89/events?limit=10&chainId=137`
  }
};
