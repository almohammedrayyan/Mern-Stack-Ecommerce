import React, { Fragment } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Doughnut, Line } from "react-chartjs-2";

const Chart = () => {
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 25000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [1, 0],
      },
    ],
  };
  return (
    <Fragment>
      <div className="chart">
        <div className="title">Last 5 month (Revenue)</div>
        <Line data={lineState} width="800px" height="500px" />
      </div>
      <div className="chart">
        <div className="title">Last 5 month (Revenue)</div>
        <Doughnut data={doughnutState} width="200px" />
      </div>
    </Fragment>
  );
};

export default Chart;
