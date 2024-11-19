import React from "react";
import './SalesTrend.css';  // Importing custom CSS

function SalesTrends() {
  return (
    <div className="sales-trends-container">
      <div className="sales-trends-title">Sales Trends</div>
      <div className="sales-trends-grid">
        <div>
          <img
            alt="Graph showing sales trends"
            height="400"
            src="https://storage.googleapis.com/a1aa/image/OlHm1TNbe4RDBC5SjXufAkAy2PXRRJTkZFYRajUfJwKptagnA.jpg"
            width="600"
          />
        </div>
        <div>
          <img
            alt="Pie chart showing revenue distribution"
            height="400"
            src="https://storage.googleapis.com/a1aa/image/Fa3INTnaPdYPAlDBJcx5Fcz0Nl8DaEfCGEDguB9tUB8ZrG4JA.jpg"
            width="600"
          />
        </div>
      </div>
    </div>
  );
}

export default SalesTrends;
