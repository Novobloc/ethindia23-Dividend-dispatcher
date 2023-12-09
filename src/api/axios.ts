import axios, { InternalAxiosRequestConfig } from "axios";
import { baseURL } from "./config";

const instance = axios.create({
  baseURL
});

instance.interceptors.request.use(
  (config: any | Promise<InternalAxiosRequestConfig<any>>) => {
    const accessToken = String(import.meta.env.VITE_1INCH_API_KEY);

    const headers = {
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    };

    config.headers = headers;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
