import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Chart from "../Chart/Chart";
import Featured from "../Featured/Featured";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Widgets/Widget";
import { BiShoppingBag } from "react-icons/bi";
import { BiMoney } from "react-icons/bi";
import { MdOutlineAccountBalance } from "react-icons/md";
import { getAdminProduct } from "../../actions/productActions";
import { getAllOrders } from "../../actions/orderActions";
import { getAllUsers } from "../../actions/userActions";
import "./dashboard.css";
const Dashboard = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
        </div>
        {/* <Navbar /> */}
        <div className="widgets">
          <Widgets
            title="Order"
            link="View all"
            amount={orders && orders.length}
            url="/orders"
            icon={
              <BiMoney
                className="icon"
                style={{
                  color: "green",
                  backgroundColor: "rgb(152,251,152)",
                }}
              />
            }
          />
          <Widgets
            type="earning"
            title="Product"
            link="View all"
            amount={products && products.length}
            url="/admin/products/list"
            icon={
              <BiShoppingBag
                className="icon"
                style={{
                  color: "goldenrod",
                  backgroundColor: "rgb(250,250,210)",
                }}
              />
            }
          />
          <Widgets
            type="balance"
            title="Users"
            link="View All"
            amount={users && users.length}
            url="/admin/users"
            icon={
              <MdOutlineAccountBalance
                className="icon"
                style={{
                  color: "purple",
                  backgroundColor: "rgb(216,191,216)",
                }}
              />
            }
          />
        </div>
        <div className="charts">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
