import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import './OrderList.css';  // Importing custom CSS for styles

function OrdersList() {
  const navigate = useNavigate(); // Initialize navigate function
  const orders = [
    { id: "#12345", customer: "John Doe", date: "2023-10-01", status: "Shipped", total: "$123.45" },
    { id: "#12346", customer: "Jane Smith", date: "2023-10-02", status: "Pending", total: "$234.56" },
    { id: "#12347", customer: "Alice Johnson", date: "2023-10-03", status: "Cancelled", total: "$345.67" },
    { id: "#12348", customer: "Bob Brown", date: "2023-10-04", status: "Shipped", total: "$456.78" },
  ];

  // Navigate back to Admin Dashboard
  const handleBackClick = () => {
    navigate('/admindashboard'); // Adjust the route as needed
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div className="orders-title">Orders</div>
        <button className="btn btn-back" onClick={handleBackClick}>Back to Admin Dashboard</button>
      </div>

      <table className="orders-table">
        <thead>
          <tr className="table-header">
            <th className="table-cell">Order ID</th>
            <th className="table-cell">Customer</th>
            <th className="table-cell">Date</th>
            <th className="table-cell">Status</th>
            <th className="table-cell">Total</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="table-cell">{order.id}</td>
              <td className="table-cell">{order.customer}</td>
              <td className="table-cell">{order.date}</td>
              <td className="table-cell">{order.status}</td>
              <td className="table-cell">{order.total}</td>
              <td className="table-cell">
                <button className="btn btn-view">View</button>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersList;
