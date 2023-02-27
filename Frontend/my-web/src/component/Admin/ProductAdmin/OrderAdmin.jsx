import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import OrderList from "../OrderList";
import "./orderAdmin.scss";
const OrderAdmin = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <OrderList />
      </div>
    </div>
  );
};

export default OrderAdmin;
