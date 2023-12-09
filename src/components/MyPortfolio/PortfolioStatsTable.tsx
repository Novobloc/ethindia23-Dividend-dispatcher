import React from "react";
import { tableData } from "constants/mockData";
import TableComponent from "utils/TableComponent";

const PortfolioStatsTable = ({ data }: any) => {
  return (
    <div>
      <TableComponent tableData={data} />
    </div>
  );
};

export default PortfolioStatsTable;
