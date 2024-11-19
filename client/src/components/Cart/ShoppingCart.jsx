import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { toast } from 'react-toastify';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId') || 'defaultUserId';

    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/cart/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        setCartItems(data || []);
        setLoading(false);
        toast.success('Cart loaded successfully!');
      } catch (error) {
        setError('Error fetching cart items');
        setLoading(false);
        toast.error('Failed to load cart items.');
      }
    };

    fetchCartItems();
  }, []);

  const handleDeleteItem = (cartId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== cartId));
    toast.info('Item deleted from cart.');
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.productId?.price?.value || 0;
    return total + price * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleBackToShop = () => {
    navigate('/shoppingpage');
  };

  const handleCheckout = async () => {
    try {
      const phoneNumber = '03497174815'; // Replace with actual customer phone number

      const response = await fetch('http://localhost:8000/create-jazzcash-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: subtotal,
          phoneNumber,
          cartItems: cartItems.map((item) => ({
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Payment initiated! Redirecting...');
        window.location.href = data.paymentLink;
      } else {
        toast.error(`Payment failed: ${data.message}`);
      }
    } catch (error) {
      toast.error('Error initiating payment.');
    }
  };

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="shopping-cart-container">
      <h1 className="shopping-cart-header">Shopping Cart</h1>
      <div className="cart-content">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty. Start shopping now!</p>
        ) : (
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                cartId={item._id}
                image={item.productId?.images?.[0]?.url || 'default-image-url.jpg'}
                name={item.productId?.name || 'Unknown Product'}
                price={item.productId?.price || { value: 0, currency: 'USD' }}
                quantity={item.quantity}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
        )}
        <div className="checkout-section">
          <p className="subtotal">
            Subtotal ({totalItems} items): ${subtotal.toFixed(2)}
          </p>
          <button
            className="checkout-button"
            disabled={cartItems.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
        <div className="back-to-shop">
          <button className="back-button" onClick={handleBackToShop}>
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
