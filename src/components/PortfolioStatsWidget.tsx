import React from "react";
import { stats } from "constants/mockData";
import Widget from "utils/Widget";

const PortfolioStatsWidget = () => {
  return (
    <div>
      <Widget data={stats} />
    </div>
  );
};

export default PortfolioStatsWidget;
