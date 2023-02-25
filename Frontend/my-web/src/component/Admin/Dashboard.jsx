import React from "react";
import { Link } from "react-router-dom";
import Chart from "../Chart/Chart";
import Featured from "../Featured/Featured";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Widgets/Widget";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import "./dashboard.css";
const Dashboard = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{25000}
            </p>
          </div>
        </div>
        {/* <Navbar /> */}
        <div className="widgets">
          <Widgets
            title="Order"
            link="View all"
            url="/orders"
            icon={
              <AttachMoneyIcon
                className="icon"
                style={{
                  color: "green",
                  backgroundColor: "rgb(152,251,152)",
                }}
              />
            }
          />
          <Widgets
            type="earning"
            title="Product"
            link="View all"
            url="/admin/Products"
            icon={
              <ShoppingCartIcon
                className="icon"
                style={{
                  color: "goldenrod",
                  backgroundColor: "rgb(250,250,210)",
                }}
              />
            }
          />
          <Widgets
            type="balance"
            title="User"
            link="View All"
            url="/admin/User"
            icon={
              <AccountBalanceIcon
                className="icon"
                style={{
                  color: "purple",
                  backgroundColor: "rgb(216,191,216)",
                }}
              />
            }
          />
        </div>
        <div className="charts">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
