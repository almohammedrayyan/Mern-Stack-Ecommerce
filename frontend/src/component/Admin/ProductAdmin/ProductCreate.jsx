import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import NewProduct from "../NewProduct";

const ProductCreate = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <NewProduct />
      </div>
    </div>
  );
};

export default ProductCreate;
