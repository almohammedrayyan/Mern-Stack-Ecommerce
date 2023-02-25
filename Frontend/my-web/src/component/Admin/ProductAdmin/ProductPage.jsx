import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import ProductList from "../ProductList";
import "./productPage.scss";
const ProductPage = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;
