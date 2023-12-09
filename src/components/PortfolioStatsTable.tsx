import React from "react";
import { tableData } from "constants/mockData";
import TableComponent from "utils/TableComponent";

const PortfolioStatsTable = () => {
  return (
    <div>
      <TableComponent tableData={tableData} />
    </div>
  );
};

export default PortfolioStatsTable;
