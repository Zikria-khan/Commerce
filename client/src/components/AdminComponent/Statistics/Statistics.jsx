import React from "react";
import './Statistics.css';  // Importing custom CSS

function Statistics() {
  const stats = [
    { title: "Total Sales", value: "$12,345" },
    { title: "Recent Orders", value: "123" },
    { title: "User Activity", value: "456" },
    { title: "Revenue", value: "$78,910" },
  ];

  return (
    <div className="statistics-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-title">{stat.title}</div>
          <div className="stat-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}

export default Statistics;
