import { defineChain } from "viem";

export const x1 = defineChain({
  id: 195,
  name: "X1 Testnet",
  network: "x1",
  nativeCurrency: {
    decimals: 18,
    name: "OKB",
    symbol: "OKB"
  },
  rpcUrls: {
    default: {
      http: ["https://x1-testnet.blockpi.network/v1/rpc/public"],
      webSocket: ["wss://rpc.zora.energy"]
    },
    public: {
      http: ["https://x1-testnet.blockpi.network/v1/rpc/public"],
      webSocket: ["wss://rpc.zora.energy"]
    }
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://www.oklink.com/x1-test" }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 5882
    }
  }
});
