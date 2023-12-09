import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { GlobalProvider, useGlobalContext } from "context/GlobalContext/GlobalContext";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [alchemyProvider({ apiKey: String(process.env.REACT_APP_ALCHEMY_ID) }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: String(process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID),
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});
const element = document.getElementById("root");
const root = createRoot(element!);

const Index = () => {
  const { appLoading } = useGlobalContext();
  console.log("appLoading: ", appLoading);

  return (
    <React.StrictMode>
      <GlobalProvider>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <App />
          </RainbowKitProvider>
        </WagmiConfig>
      </GlobalProvider>
    </React.StrictMode>
  );
};

root.render(<Index />);
