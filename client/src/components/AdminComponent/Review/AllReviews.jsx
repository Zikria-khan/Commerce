import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";  // For navigation
import './AllReviews.css'; // Custom CSS for styling

function GetAllReviews() {
  const [reviews, setReviews] = useState([]);

  // Fetch all reviews from the API or database (mocked here)
  useEffect(() => {
    // Replace with actual API call to fetch reviews
    const fetchedReviews = [
      { id: 1, user: "John Doe", product: "Product 1", rating: 4, reviewText: "Great product!", date: "2024-11-01" },
      { id: 2, user: "Jane Smith", product: "Product 2", rating: 5, reviewText: "Excellent quality!", date: "2024-11-02" },
      { id: 3, user: "Alice Johnson", product: "Product 3", rating: 3, reviewText: "Average product.", date: "2024-11-03" },
      { id: 4, user: "Bob Brown", product: "Product 4", rating: 2, reviewText: "Not worth the price.", date: "2024-11-04" },
    ];
    setReviews(fetchedReviews);
  }, []);

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h2>All Reviews</h2>
        <Link to="/adminDashboard" className="btn btn-back">Back to Dashboard</Link>
      </div>

      <table className="reviews-table">
        <thead>
          <tr>
            <th>Review ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Rating</th>
            <th>Review Text</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.user}</td>
              <td>{review.product}</td>
              <td>{review.rating}</td>
              <td>{review.reviewText}</td>
              <td>{review.date}</td>
              <td>
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

export default GetAllReviews;
