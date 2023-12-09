import React, { useEffect, useState } from "react";
import PortfolioStatsTable from "components/MyPortfolio/PortfolioStatsTable";
import PortfolioStatsWidget from "components/MyPortfolio/PortfolioStatsWidget";
import PortfolioStatsLineChart from "components/MyPortfolio/PortfolioStatsLineChart";
import PortfolioStatsHistory from "components/MyPortfolio/PortfolioStatsHistory";
import { getTransactionsHistory } from "api/history/getTransactions";
import { useAccount, useSignMessage, useNetwork } from "wagmi";
import { getAllAssetTransfers, getAllBalances } from "helpers/functions";

const MyPortfolioPage = () => {
  const [txns, setTxns] = useState([]);
  const [balance, setBalance] = useState([]);
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    console.log("Fetching transactions on mount...", address, isConnected, chain?.id);
    const tokenAddress = "0x4CD37E6cFf2720B85bE07bABd7438EA72c9F6E57";
    let isMounted = true;

    const fetchData = async () => {
      if (isConnected) {
        try {
          const response = await getAllAssetTransfers(String(address), tokenAddress);
          console.log(response, "response");

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

  return (
    <div className="max-w-7xl mx-auto space-y-12 mt-8 mb-12">
      {balance && balance.length > 0 && <PortfolioStatsWidget data={balance} />}
      {txns && txns.length > 0 && <PortfolioStatsTable data={txns} />}
      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <PortfolioStatsLineChart />
        <PortfolioStatsHistory />
      </div> */}
    </div>
  );
};

export default MyPortfolioPage;
