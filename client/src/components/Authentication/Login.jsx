import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Store the token, user ID, and role in localStorage
        localStorage.setItem("token", data.token);  // Assuming the API returns a token
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("role", data.user.role);  // Store the role in localStorage

        // Check role and redirect accordingly
        const userRole = data.user.role;
        if (userRole === "admin") {
          navigate("/admindashboard");  // Redirect to admin dashboard
        } else if (userRole === "customer") {
          navigate("/homepage");  // Redirect to homepage for customers
        } else {
          alert("Unknown role");
        }
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <div className="logo">
          <img
            src="/image1.png" // Point to the logo in the public folder
            alt="Amazon logo"
            className="logo-image"
          />
        </div>
        <h2 className="title">Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">
              Log in
            </button>
          </div>
          <div className="terms">
            <p>
              By logging in, you agree to Amazon's{" "}
              <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
            </p>
          </div>
        </form>
        <div className="login-link">
          <p>
            New to Amazon? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
