import React, { useEffect, useState } from "react";
import PortfolioStatsTable from "components/MyPortfolio/PortfolioStatsTable";
import PortfolioStatsWidget from "components/MyPortfolio/PortfolioStatsWidget";
import PortfolioStatsLineChart from "components/MyPortfolio/PortfolioStatsLineChart";
import PortfolioStatsHistory from "components/MyPortfolio/PortfolioStatsHistory";
import { getTransactionsHistory } from "api/history/getTransactions";
import { useAccount, useSignMessage, useNetwork } from "wagmi";
import { getAllAssetTransfers, getAllBalances } from "helpers/functions";
import { addPlugin, hasPlugin } from "helpers/web3";

const MyPortfolioPage = () => {
  const [txns, setTxns] = useState([]);
  const [balance, setBalance] = useState([]);
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const tokenAddress = "0x4CD37E6cFf2720B85bE07bABd7438EA72c9F6E57";
  const pluginAddress = "0x235Ae9aAE2D5D62223807fF229907cE02fE67B6b";
  const [userHasPlugin, setUserHasPlugin] = useState(false);

  useEffect(() => {
    console.log("Fetching transactions on mount...", address, isConnected, chain?.id);
    let isMounted = true;

    const fetchData = async () => {
      if (isConnected) {
        try {
          const response = await getAllAssetTransfers(String(address), tokenAddress);
          console.log(response, "response");

          const hasPluginResponse = await hasPlugin(String(address), pluginAddress);
          console.log(hasPluginResponse, "hasPluginResponse");

          const balanceResp = await getAllBalances(String(address));
          const balanceResponse: any = balanceResp?.filter((d: any) => d.contractAddress.toLowerCase() === tokenAddress.toLowerCase());

          // const data: any = await getTransactionsHistory(address, chain?.id, tokenAddress);
          // const response = data?.items.map((i: any) => {
          //   i.details = { ...i.details, ...i.details.tokenActions[0] };
          //   return i;
          // });

          // console.log(response, "response");

          if (isMounted && response && response.length > 0) {
            setTxns(response);
          }

          if (isMounted && balanceResponse && balanceResponse.length > 0) {
            setBalance(balanceResponse);
          }

          if (hasPluginResponse) setUserHasPlugin(true);
        } catch (error) {
          // Handle error
          console.error("Error fetching transactions:", error);
        }
      }
    };

    if (isConnected) {
      fetchData();
    }

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [isConnected, address, chain?.id]);

  const addPluginFn = async (e: any) => {
    e.preventDefault();
    const divds = await addPlugin(String(address), pluginAddress);
    console.log(divds, "setDividend");
    if (divds) {
      alert("Dividend is set successfully");
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
