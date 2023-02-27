import React, { useEffect, Fragment } from "react";
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
import { getAdminProduct } from "../../actions/productActions";
import { getAllOrders } from "../../actions/orderActions";
import { getAllUsers } from "../../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
const Chart = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.allOrders);

  // const { users } = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
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
