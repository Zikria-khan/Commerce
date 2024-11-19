import React from "react";
import { FaPlus, FaEdit, FaBoxes, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import './ActionButton.css';  // Assuming you have a separate CSS file for styles

function ActionButtons() {
  const navigate = useNavigate(); // Create navigate function

  // Handle click for navigating to Customer Reviews
  const handleReviewsClick = () => {
    navigate('/allReview'); // Navigate to the All Reviews page
  };

  return (
    <div className="action-buttons">
      <button className="btn btn-blue">
        <FaPlus className="icon" />
        Add Product
      </button>
      
      <button className="btn btn-yellow">
        <FaBoxes className="icon" />
        Manage Inventory
      </button>
      
      <button className="btn btn-red" onClick={handleReviewsClick}>
        <FaComments className="icon" />
        Customer Reviews
      </button>
    </div>
  );
}

export default ActionButtons;
