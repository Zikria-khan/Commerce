import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles
import './ProductList.css';
import { ToastContainer } from 'react-toastify';

const ProductList = ({ category, sortBy }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false); // Track button state

  // Fetch products by category and sorting
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://commerce-theta-murex-23.vercel.app/api/products/category/${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        // Sort products based on sortBy state
        const sortedData = data.sort((a, b) => {
          if (sortBy === 'price') {
            return a.price.value - b.price.value;
          }
          return a.name.localeCompare(b.name); // Default sorting by name
        });

        setProducts(sortedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category, sortBy]); // Fetch when category or sortBy changes

  // Handle adding product to the cart
  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to add products to your cart.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    const shippingAddress = 'Default Shipping Address'; // Replace with dynamic address if available
    const totalPrice = 100; // Replace with actual total price calculation for the product

    const cartData = {
      userId,
      productId,
      quantity: 1, // Default to 1, you can modify this as needed
      shippingAddress,
      totalPrice, // Pass total price of product
    };

    try {
      setAddingToCart(true);
      const response = await fetch('https://commerce-theta-murex-23.vercel.app/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add product to cart');
      }

      toast.success('Product added to cart successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="loading-message">Loading products...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={product.images[0].url} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>${product.price.value.toFixed(2)}</p>
            </div>
            <div className="button-container">
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product._id)}
                disabled={addingToCart} // Disable button while processing
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              <button
                className="view-detail-button"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Toast container to show toasts */}
      <ToastContainer />
    </>
  );
};

export default ProductList;
