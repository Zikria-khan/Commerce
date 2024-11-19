import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css'; // Import your CSS file for styling

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) {
          throw new Error('Invalid product ID');
        }

        const response = await fetch(`http://localhost:8000/api/products/${productId}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error('Failed to fetch product details');
        }

        const data = await response.json();
        setProduct(data.product); // Assuming data contains the product object
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const { name, description, price, rating, stock, images, category, brand, discount, dimensions } = product;
  const productPrice = parseFloat(price.value);
  const productCurrency = price.currency;
  const discountedPrice = discount && discount.percentage > 0
    ? productPrice * (1 - discount.percentage / 100)
    : productPrice;

  return (
    <div className="product-detail-container">
      <h1 className="product-name">{name || 'No Name Available'}</h1>
      <p className="product-description">{description || 'No Description Available'}</p>
      <p className="product-price">
        Price: {productCurrency} {isNaN(productPrice) ? 'Price Not Available' : productPrice.toFixed(2)}
        {discount && discount.percentage > 0 && (
          <span className="discount-price"> (Discounted: {discountedPrice.toFixed(2)})</span>
        )}
      </p>
      <p className="product-brand">Brand: {brand || 'No Brand Available'}</p>
      <p className="product-category">Category: {category || 'No Category Available'}</p>
      <p className="product-stock">Stock: {stock ? stock.quantity : 'Out of Stock'}</p>
      {discount && discount.percentage > 0 && (
        <p className="product-discount">Discount: {discount.percentage}% off until {new Date(discount.validUntil).toLocaleDateString()}</p>
      )}
      <p className="product-rating">Average Rating: {rating?.average || 'N/A'} ({rating?.totalReviews || 0} reviews)</p>

      {/* Display product images */}
      <div className="product-images">
        {images && images.length > 0 ? (
          images.map((img, index) => (
            <img key={index} src={img.url} alt={`${name} image ${index + 1}`} className="product-image" />
          ))
        ) : (
          <img src="https://via.placeholder.com/150" alt="Placeholder" className="product-image" />
        )}
      </div>

      {/* Product dimensions */}
      <div className="product-dimensions">
        {dimensions && (
          <>
            <p>Weight: {dimensions.weight} {dimensions.unit}</p>
            <p>Dimensions: {dimensions.length} x {dimensions.width} x {dimensions.height} {dimensions.unit}</p>
          </>
        )}
      </div>

      {/* Button to navigate to the review section */}
      <button className="review-button" onClick={() => navigate(`/reviews/${productId}`)}>
        View Reviews
      </button>
    </div>
  );
};

export default ProductDetail;
