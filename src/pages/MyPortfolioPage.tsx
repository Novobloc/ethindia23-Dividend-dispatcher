import React, { useEffect, useState } from "react";
import PortfolioStatsTable from "components/MyPortfolio/PortfolioStatsTable";
import PortfolioStatsWidget from "components/MyPortfolio/PortfolioStatsWidget";
import PortfolioStatsLineChart from "components/MyPortfolio/PortfolioStatsLineChart";
import PortfolioStatsHistory from "components/MyPortfolio/PortfolioStatsHistory";
import { getTransactionsHistory } from "api/history/getTransactions";
import { useAccount, useSignMessage, useNetwork } from "wagmi";

const MyPortfolioPage = () => {
  const [txns, setTxns] = useState([]);
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    console.log("Fetching transactions on mount...", address, isConnected, chain);
    // const tokenAddress = "0x3Bd86E4b4bf781C1bb3401bF5AEE7aa0d34EA8Fb";
    // let isMounted = true;

    // const fetchData = async () => {
    //   if (isConnected) {
    //     try {
    //       const data: any = await getTransactionsHistory(address, chain?.id, tokenAddress);
    //       const response = data?.items.map((i: any) => {
    //         i.details = { ...i.details, ...i.details.tokenActions[0] };
    //         return i;
    //       });

    //       console.log(response, "response");

    //       if (isMounted && response && response.length > 0) {
    //         setTxns(response);
    //       }
    //     } catch (error) {
    //       // Handle error
    //       console.error("Error fetching transactions:", error);
    //     }
    //   }
    // };

    // if (isConnected) {
    //   fetchData();
    // }

    // // Cleanup function
    // return () => {
    //   isMounted = false;
    // };
  }, [isConnected, address, chain?.id]);

  return (
    <div className="max-w-7xl mx-auto space-y-12 mt-8 mb-12">
      <PortfolioStatsWidget />
      {txns && txns.length > 0 && <PortfolioStatsTable data={txns} />}
      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <PortfolioStatsLineChart />
        <PortfolioStatsHistory />
      </div> */}
    </div>
  );
};

export default MyPortfolioPage;
