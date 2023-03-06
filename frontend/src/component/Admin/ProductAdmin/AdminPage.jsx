import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import UserList from "../UserList";
import "./adminPage.scss";
const AdminPage = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <UserList />
      </div>
    </div>
  );
};

export default AdminPage;
