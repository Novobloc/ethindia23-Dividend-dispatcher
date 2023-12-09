import React from "react";
import PortfolioStatsTable from "components/PortfolioStatsTable";
import PortfolioStatsWidget from "components/PortfolioStatsWidget";

const MyPortfolioPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <PortfolioStatsWidget />
      <PortfolioStatsTable />
    </div>
  );
};

export default MyPortfolioPage;
