import React from "react";
import Chart from "../Chart/Chart";
import Featured from "../Featured/Featured";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Widgets/Widget";
import "./dashboard.css";
const Dashboard = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets">
          <Widgets type="user" />
          <Widgets type="order" />
          <Widgets type="earning" />
          <Widgets type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart />
        </div>
        {/* <div className="listContianer">
      <div className="listTitle">Latest Transaction</div>
      <Tables />
    </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
