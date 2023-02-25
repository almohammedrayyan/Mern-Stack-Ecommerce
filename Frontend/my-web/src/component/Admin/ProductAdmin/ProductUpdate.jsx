import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import UpdateProduct from "../UpdateProduct";
import "./productUpdate.scss";
const ProductUpdate = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <UpdateProduct />
      </div>
    </div>
  );
};

export default ProductUpdate;
