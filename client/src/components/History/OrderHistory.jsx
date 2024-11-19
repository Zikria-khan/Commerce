import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css'; // Import custom CSS for the component
import Navbar from '../Navbar/Navbar';

const orders = [
  { id: "123456", date: "2023-10-01", status: "Shipped", total: "$150.00" },
  // Add other orders...
];

const OrderHistory = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Navigate to order details page when clicking "View Details"
  const handleViewDetails = (orderId) => {
    navigate(`/order/${orderId}`); // Redirect to the OrderDetailPage with the order ID
  };

  // Navigate back to the shop page
  const handleBackToShop = () => {
    navigate('/shoppingpage'); // Redirect to the shop page
  };

  return (
    <div className="order-history">
      <Navbar/>

      <main className="order-history-main">
        <h1>Order History</h1>
        <div className="order-history-table-container">
          <table className="order-history-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                  <td>{order.total}</td>
                  <td>
                    <button onClick={() => handleViewDetails(order.id)} className="view-details">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back to Shop Button */}
        <div className="back-to-shop">
          <button onClick={handleBackToShop} className="back-to-shop-btn">
            Back to Shop
          </button>
        </div>
      </main>

      <footer className="order-history-footer">
        <div className="container">
          &copy; 2023 E-commerce. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default OrderHistory;
