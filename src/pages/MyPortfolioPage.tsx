import React from "react";
import PortfolioStatsTable from "../components/PortfolioStatsTable";
import PortfolioStatsWidget from "../components/PortfolioStatsWidget";

const MyPortfolioPage = () => {
  return (
    <div>
      <PortfolioStatsWidget />
      <PortfolioStatsTable />
    </div>
  );
};

export default MyPortfolioPage;
