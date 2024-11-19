import React from "react";
import Sidebar from "./../AdminComponent/sidebar/Sidebar";
import MainContent from "./../AdminComponent/MainContent/MainContent";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <Sidebar className="sidebar" />
      <MainContent className="main-content" />
    </div>
  );
}

export default AdminDashboard;
