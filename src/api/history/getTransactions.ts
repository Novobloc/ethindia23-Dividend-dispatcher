import { urlConfig } from "api/config";
// import axios from "api/axios";
import axios from "axios";

export const getTransactionsHistory = async (address: any) => {
  const path = urlConfig.history.GET_TRANSACTIONS(address);
  let config: any = {
    method: "get",
    url: path
  };

  return axios.request(config);
};
