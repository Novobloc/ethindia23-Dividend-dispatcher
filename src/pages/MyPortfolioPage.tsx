import React, { useEffect, useState } from "react";
import PortfolioStatsTable from "components/MyPortfolio/PortfolioStatsTable";
import PortfolioStatsWidget from "components/MyPortfolio/PortfolioStatsWidget";
import PortfolioStatsLineChart from "components/MyPortfolio/PortfolioStatsLineChart";
import PortfolioStatsHistory from "components/MyPortfolio/PortfolioStatsHistory";
import { getTransactionsHistory } from "api/history/getTransactions";
import { useAccount, useSignMessage, useNetwork } from "wagmi";
import { getAllAssetTransfers, getAllBalances } from "helpers/functions";
import { addPlugin, hasPlugin } from "helpers/web3";
import { activeConfig } from "../Config";

const MyPortfolioPage = () => {
  const [txns, setTxns] = useState([]);
  const [balance, setBalance]: any = useState([]);
  const [userHasPlugin, setUserHasPlugin] = useState(false);

  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  // Assuming `activeConfig` is a function that returns the active configuration
  const tokenAddress = chain?.id && activeConfig(chain?.id)?.tokenContractAddress;
  const pluginAddress = chain?.id && activeConfig(chain?.id)?.pluginContractAddress;
  console.log(activeConfig(chain?.id), "ss");

  // Set the chainId in localStorage whenever it changes
  useEffect(() => {
    if (chain?.id) localStorage.setItem("chainId", String(chain.id));
  }, [chain?.id]);

  useEffect(() => {
    console.log("Fetching data on mount...", address, isConnected, chain?.id);

    // Ensure the component is mounted before updating state
    let isMounted = true;

    const fetchData = async () => {
      if (isConnected) {
        try {
          // Fetch asset transfers
          const assetTransfers = await getAllAssetTransfers(String(address), tokenAddress);
          console.log(assetTransfers, "assetTransfers");

          // Check if the user has a plugin
          const hasPluginResponse = await hasPlugin(String(address), pluginAddress);
          console.log(hasPluginResponse, "hasPluginResponse");

          // Fetch all balances and filter by the token address
          const balanceResp = await getAllBalances(String(address));
          const balanceResponse = balanceResp?.filter((d: any) => d.contractAddress.toLowerCase() === tokenAddress?.toLowerCase());

          if (isMounted && assetTransfers && assetTransfers.length > 0) {
            setTxns(assetTransfers);
          }

          if (isMounted && balanceResponse && balanceResponse.length > 0) {
            setBalance(balanceResponse);
          }

          if (isMounted && hasPluginResponse) {
            setUserHasPlugin(true);
          }
        } catch (error) {
          // Handle error
          console.error("Error fetching data:", error);
        }
      }
    };

    // Fetch data if connected
    if (isConnected) {
      fetchData();
    }

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [isConnected, address, chain?.id, tokenAddress, pluginAddress]);

  const addPluginFn = async (e: any) => {
    e.preventDefault();
    try {
      const result = await addPlugin(String(address), pluginAddress);
      console.log(result, "addPlugin");

      if (result) {
        alert("Plugin added successfully");
      }
    } catch (error) {
      console.error("Error adding plugin:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 mt-8 mb-12">
      <div className="grid grid-cols-1">
        {/* <p>Plugin Connected: {userHasPlugin ? "YES" : "NO"}</p> */}
        <button
          onClick={addPluginFn}
          disabled={userHasPlugin}
          type="submit"
          className="flex items-center justify-center w-full px-6 py-3 mb-3 text-lg text-black rounded-md sm:mb-0 bg-yellow-300">
          {!userHasPlugin ? " Add Plugin" : "Plugin Connected"}
        </button>
      </div>
      {balance && balance.length > 0 && <PortfolioStatsWidget data={balance} />}
      {txns && txns.length > 0 && <PortfolioStatsTable data={txns} />}
    </div>
  );
};

export default MyPortfolioPage;
