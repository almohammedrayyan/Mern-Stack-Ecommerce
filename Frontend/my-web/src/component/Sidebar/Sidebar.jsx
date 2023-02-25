import React, { useContext } from "react";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import "./sidebar.scss";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReorderIcon from "@mui/icons-material/Reorder";

import { Link } from "react-router-dom";
const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Crusion</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardCustomizeOutlinedIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/admin/products/list" style={{ textDecoration: "none" }}>
            <li>
              <Inventory2OutlinedIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/review" style={{ textDecoration: "none" }}>
            <li>
              <Inventory2OutlinedIcon className="icon" />
              <span>Review</span>
            </li>
          </Link>

          <li>
            <ReorderIcon className="icon" />
            <span>Orders</span>
          </li>
        </ul>
      </div>

      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
