import React from "react";
import "./widgets.scss";

import { Link } from "react-router-dom";
const Widgets = ({ type, title, link, icon, isMoney, url, amount }) => {
  let data;
  // const amount = 100;
  const diff = 20;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter">{amount} </span>
        <Link to={url} style={{ textDecoration: "none" }}>
          <span className="link">{link}</span>
        </Link>
      </div>
      <div className="right">{icon}</div>
    </div>
  );
};

export default Widgets;
