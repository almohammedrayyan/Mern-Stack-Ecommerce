import React from "react";
import "./widgets.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
const Widgets = ({ type }) => {
  let data;
  const amount = 100;
  const diff = 20;
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 99, 71, 0.4)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Orders",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgb(250,250,210)",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Earnings",
        isMoney: false,
        link: "View all Earning",
        icon: (
          <AttachMoneyIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgb(152,251,152)",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "Balance",
        isMoney: false,
        link: "View all Balance",
        icon: (
          <AccountBalanceIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgb(216,191,216)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"}
          {amount}{" "}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon /> {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widgets;
