import React, { useEffect, useState } from "react";
import PortfolioStatsTable from "components/MyPortfolio/PortfolioStatsTable";
import PortfolioStatsWidget from "components/MyPortfolio/PortfolioStatsWidget";
import PortfolioStatsLineChart from "components/MyPortfolio/PortfolioStatsLineChart";
import PortfolioStatsHistory from "components/MyPortfolio/PortfolioStatsHistory";
import { getTransactionsHistory } from "api/history/getTransactions";

const MyPortfolioPage = () => {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    console.log("Fetching transactions on mount...");
    (async () => {
      const data1: any = await getTransactionsHistory("0x5B4d77e199FE8e5090009C72d2a5581C74FEbE89");
      const response = data1?.items.map((i: any) => {
        i.details = { ...i.details, ...i.details.tokenActions[0] };
        return i;
      });
      console.log(response, "response");

      if (response && response.length > 0) setTxns(response);
    })();
  }, []);

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
