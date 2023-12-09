import React from "react";
import PortfolioStatsTable from "components/PortfolioStatsTable";
import PortfolioStatsWidget from "components/PortfolioStatsWidget";
import PortfolioStatsLineChart from "components/PortfolioStatsLineChart";
import PortfolioStatsHistory from "components/PortfolioStatsHistory";

const MyPortfolioPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-12 mt-8 mb-12">
      <PortfolioStatsWidget />
      <PortfolioStatsTable />
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <PortfolioStatsLineChart />
        <PortfolioStatsHistory />
      </div>
    </div>
  );
};

export default MyPortfolioPage;
