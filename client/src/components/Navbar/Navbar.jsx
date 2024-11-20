import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css"; // Import the CSS file for styles

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0); // State for cart count
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the menu
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("https://commerce-theta-murex-23.vercel.app/api/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.name) {
            setUser(data);
          } else {
            console.error("Error fetching user profile:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [token]);

  // Fetch the cart count for the user
  useEffect(() => {
    if (token) {
      const userId = localStorage.getItem('userId') || 'defaultUserId'; // Assuming you store userId in localStorage
      fetch(`https://commerce-theta-murex-23.vercel.app/api/cart/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCartCount(data.reduce((total, item) => total + item.quantity, 0)); // Calculate total cart items
          }
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        });
    }
  }, [token]);

  const handleCartClick = () => {
    navigate("/shoppingcart");
  };

  const handleUserClick = () => {
    navigate("/profile");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner-container">
        <Link to="/homepage" className="navbar-logo">
          E-Shop
        </Link>
        {/* Hamburger menu icon for mobile */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <nav className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/homepage">Home</Link>
          <Link to="/shoppingpage">Shop</Link>
          <Link to="/shoppingcart">Cart</Link>
          <Link to="/about">Contact us</Link>
          <Link to="/orderhistory">History</Link>
          <Link to="/report">Report</Link>
        </nav>
        <div className="navbar-icons">
          <div className="navbar-cart-icon" onClick={handleCartClick}>
            <FaShoppingCart className="navbar-icon" />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span> // Display the cart count as a badge
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
