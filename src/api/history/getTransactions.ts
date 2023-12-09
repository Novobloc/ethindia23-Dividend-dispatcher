import { urlConfig } from "api/config";
import axios from "api/axios";

export const getTransactionsHistory = async (address: any, chainId: any, tokenAddress: any) => {
  const path = urlConfig.history.GET_TRANSACTIONS(address, chainId, tokenAddress);
  let config: any = {
    method: "get",
    url: path
  };

  return axios.request(config);
};
