import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./Homepage.css"; 
import Navbar from '../Navbar/Navbar'; 

const Homepage = () => {
  const navigate = useNavigate(); // Navigate function to move between pages

  // Function to handle navigation on "Shop Now" button click
  const handleShopNow = () => {
    navigate('/shoppingpage'); // Redirect to shopping page
  };

  return (
    <>
      <Navbar />
      <div
        className="hero-section"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHNob3BwaW5nfGVufDB8fHx8MTY3MzY0NzYwNw&ixlib=rb-1.2.1&q=80&w=1080')",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-heading">Welcome to Our Store</h1>
          <div className="button-group">
            <button className="shop-now-btn custom-button" onClick={handleShopNow}>Shop Now</button>
            <button className="register-now-btn custom-button">Register Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
