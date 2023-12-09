import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart: React.FC<any> = ({ chartData, chartOptions }) => {
  const [state, setState] = useState({
    chartData: chartData,
    chartOptions: chartOptions
  });

  useEffect(() => {
    setState({
      chartData: chartData,
      chartOptions: chartOptions
    });
  }, [chartData, chartOptions]);

  return <ReactApexChart options={state.chartOptions} series={state.chartData} type="line" width="100%" height="100%" />;
};

export default LineChart;
