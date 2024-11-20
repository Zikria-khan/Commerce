import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Reviewpage.css";

// Child Component for displaying a single review
const ReviewCard = ({ review }) => {
  const defaultProfileImage = "https://placekitten.com/150/150"; // Placeholder image

  return (
    <div className="review-card flex items-start p-6 border-b border-gray-300 bg-white shadow-sm rounded-lg mb-6">
      <div className="review-profile relative">
        <img
          src={review.userId?.profileImage || defaultProfileImage}
          alt="Profile"
          className="w-16 h-16 rounded-full mr-6"
        />
        <p className="absolute top-full left-0 mt-2 text-sm font-medium text-gray-600 text-center">
          {review.userId?.name || "Anonymous"}
        </p>
      </div>
      <div className="review-details">
        <div className="flex items-center mb-3">
          <h4 className="font-semibold text-xl mr-3">
            {review.userId?.name || "Anonymous"}
          </h4>
          <div className="flex text-yellow-500">
            {Array.from({ length: review.rating }, (_, i) => (
              <i key={i} className="fas fa-star"></i>
            ))}
            {Array.from({ length: 5 - review.rating }, (_, i) => (
              <i key={i} className="far fa-star"></i>
            ))}
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-2">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700">{review.reviewText}</p>
      </div>
    </div>
  );
};

// Parent Component
const Reviews = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionError, setSubmissionError] = useState(null);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch(
        `https://commerce-theta-murex-23.vercel.app/api/reviews/product/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setReviews(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching reviews");
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId") || "12345"; // Replace with actual user logic
    const reviewData = {
      productId,
      userId,
      rating: parseInt(newReview.rating),
      reviewText: newReview.comment,
    };

    try {
      const response = await fetch("https://commerce-theta-murex-23.vercel.app/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the review");
      }

      const savedReview = await response.json();
      setReviews((prevReviews) => [savedReview, ...prevReviews]);
      setNewReview({ rating: 0, comment: "" });
      setSubmissionError(null);
    } catch (error) {
      setSubmissionError("Error submitting review");
    }
  };

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Product Reviews</h1>

      {/* Back to Shop Button */}
      <button
        onClick={() => navigate("/shoppingpage")}
        className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 mb-8 block mx-auto"
      >
        Back to Shop
      </button>

      {reviews && reviews.length === 0 ? (
        <p className="text-center text-xl">No reviews yet for this product.</p>
      ) : (
        reviews?.map((review) => <ReviewCard key={review._id} review={review} />)
      )}

      {/* Review Submission Form */}
      <form onSubmit={handleSubmit} className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Leave a Review</h2>
        {submissionError && (
          <p className="text-red-500 mb-4 text-lg">{submissionError}</p>
        )}
        <div className="mb-5">
          <label htmlFor="rating" className="block text-lg font-medium text-gray-700 mb-2">
            Rating:
          </label>
          <select
            id="rating"
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select a rating
            </option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="comment" className="block text-lg font-medium text-gray-700 mb-2">
            Comment:
          </label>
          <textarea
            id="comment"
            name="comment"
            value={newReview.comment}
            onChange={handleInputChange}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Reviews;
