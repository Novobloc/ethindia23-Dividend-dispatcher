import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { GlobalProvider, useGlobalContext } from "./context/GlobalContext/GlobalContext";

const element = document.getElementById("root");
const root = createRoot(element!);

const Index = () => {
  const { appLoading } = useGlobalContext();
  console.log("appLoading: ", appLoading);

  return (
    <React.StrictMode>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </React.StrictMode>
  );
};

root.render(<Index />);
