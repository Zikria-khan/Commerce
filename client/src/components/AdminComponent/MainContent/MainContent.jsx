import React from "react";
import Statistics from "./../Statistics/Statistics";
import ActionButtons from "./../ActionButton/ActionButton";
import OrdersList from "./../OrderList/OrderList";
import SalesTrends from "./../SalesTrend/SalesTrend";
import "./MainContent.css";  // Optional CSS for MainContent styling

function MainContent() {
  return (
    <div className="main-content">
      <Statistics />
      <SalesTrends/>
    </div>
  );
}

export default MainContent;
