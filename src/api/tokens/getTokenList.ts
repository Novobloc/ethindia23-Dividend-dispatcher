import { urlConfig } from "api/config";
import axios from "api/axios";

export const getTokenList = async (chainId: any) => {
  const path = urlConfig.token.GET_TOKEN_LIST(chainId);
  let config: any = {
    method: "get",
    url: path
  };

  return axios.request(config);
};
