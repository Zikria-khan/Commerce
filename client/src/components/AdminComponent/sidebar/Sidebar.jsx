import React from "react";
import { FaBox, FaShoppingCart, FaUsers, FaChartLine, FaCogs, FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  // Function to handle navigation to All Products
  const handleProductClick = () => {
    navigate('/allproducts');
  };

  // Function to handle navigation to Orders
  const handleOrdersClick = () => {
    navigate('/orders'); // Redirects to orders page
  };

  // Function to handle navigation to All Reviews
  const handleReviewsClick = () => {
    navigate('/allReview');
  };

  // Function to handle navigation to Users
  const handleUsersClick = () => {
    navigate('/users');
  };

  // Function to handle navigation to Reports
  const handleReportsClick = () => {
    navigate('/reports'); // Redirects to reports page
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">Admin Dashboard</div>
      <nav className="sidebar-nav">
        <ul>
          <li className="sidebar-item" onClick={handleProductClick}> 
            <FaBox className="sidebar-icon" /> Products
          </li>
          <li className="sidebar-item" onClick={handleOrdersClick}>
            <FaShoppingCart className="sidebar-icon" /> Orders
          </li>
          <li className="sidebar-item" onClick={handleUsersClick}>
            <FaUsers className="sidebar-icon" /> Users
          </li>
          <li className="sidebar-item" onClick={handleReportsClick}>
            <FaChartLine className="sidebar-icon" /> Reports
          </li>
          <li className="sidebar-item">
            <FaCogs className="sidebar-icon" /> Settings
          </li>
          <li className="sidebar-item" onClick={handleReviewsClick}>
            <FaCommentDots className="sidebar-icon" /> Customer Reviews
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
