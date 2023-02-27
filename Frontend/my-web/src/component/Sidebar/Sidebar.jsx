import React from "react";
import "./sidebar.scss";

import { RxDashboard } from "react-icons/rx";
import { RiProductHuntLine } from "react-icons/ri";
import { MdRateReview } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { IoMdReorder } from "react-icons/io";

import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Zebion</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <RxDashboard className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/admin/products/list" style={{ textDecoration: "none" }}>
            <li>
              <RiProductHuntLine className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/admin/reviews" style={{ textDecoration: "none" }}>
            <li>
              <MdRateReview className="icon" />
              <span>Review</span>
            </li>
          </Link>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <HiUsers className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/orders" style={{ textDecoration: "none" }}>
            <li>
              <IoMdReorder className="icon" />
              <span>Orders</span>
            </li>
          </Link>
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
