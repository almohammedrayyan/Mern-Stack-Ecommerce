import React from "react";
import "./widgets.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Link } from "react-router-dom";
const Widgets = ({ type, title, link, icon, isMoney, url }) => {
  let data;
  const amount = 100;
  const diff = 20;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter">
          {isMoney && "$"}
          {amount}{" "}
        </span>
        <Link to={url} style={{ textDecoration: "none" }}>
          <span className="link">{link}</span>
        </Link>
      </div>
      <div className="right">{icon}</div>
    </div>
  );
};

export default Widgets;
