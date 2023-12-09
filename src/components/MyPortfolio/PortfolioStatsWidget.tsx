import React from "react";
import Widget from "utils/WidgetComponent";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";

const PortfolioStatsWidget = ({ data }: any) => {
  console.log(data, "PortfolioStatsWidget");

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget icon={<MdBarChart className="h-7 w-7" />} title={"Shares"} subtitle={"$340.5"} />
        <Widget icon={<IoDocuments className="h-6 w-6" />} title={"My Shares %"} subtitle={"$642.39"} />
        <Widget icon={<MdBarChart className="h-7 w-7" />} title={"Dividend"} subtitle={"$574.34"} />
      </div>
    </div>
  );
};

export default PortfolioStatsWidget;
