import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./OrderDetails.css"
const OrderDetails = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const navigate = useNavigate(); // For navigation

  // Fake order details (you can replace this with an actual API call)
  const fakeDetails = {
    shippingAddress: "1234 Main St, Springfield, IL, 62701",
    items: [
      { name: "Product 1", quantity: 1, price: "$50.00" },
      { name: "Product 2", quantity: 2, price: "$25.00" }
    ],
    trackingNumber: "1Z9999999999999999"
  };

  useEffect(() => {
    // Fetch order details based on orderId here (API call)
    // For now, we use fake details
  }, [orderId]);

  const handleBack = () => {
    navigate('/orderhistory'); // Navigate back to the order history page
  };

  return (
    <div className="order-detail-page">
      <button onClick={handleBack}>Back to Order History</button>
      <h2>Order Details - {orderId}</h2>
      <p><strong>Shipping Address:</strong> {fakeDetails.shippingAddress}</p>
      <h3>Items:</h3>
      <ul>
        {fakeDetails.items.map((item, index) => (
          <li key={index}>
            {item.name} (x{item.quantity}) - {item.price}
          </li>
        ))}
      </ul>
      <p><strong>Tracking Number:</strong> {fakeDetails.trackingNumber}</p>
    </div>
  );
};

export default OrderDetails;
