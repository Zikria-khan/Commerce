import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './CartItem.css';

const CartItem = ({ image, name, price, cartId, quantity, onDelete }) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity]);

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setItemQuantity(newQuantity);
    toast.info(`Quantity updated to ${newQuantity}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cart/${cartId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(cartId);
        toast.success('Item successfully deleted.');
      } else {
        toast.error('Failed to delete item.');
      }
    } catch (error) {
      toast.error('Error occurred while deleting item.');
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <img src={image} alt={name} className="cart-item-image" />
        <div className="cart-item-info">
          <h3>{name}</h3>
          <p className="status">In Stock</p>
          <p className="shipping">Eligible for FREE Shipping</p>
          <div className="quantity">
            <label htmlFor={`quantity-${cartId}`}>Quantity:</label>
            <select
              id={`quantity-${cartId}`}
              value={itemQuantity}
              onChange={handleQuantityChange}
              aria-label={`Select quantity for ${name}`}
            >
              {[1, 2, 3, 4, 5].map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </div>
      </div>
      <div className="price">
        {price?.value && price?.currency
          ? `${price.currency} ${(price.value * itemQuantity).toFixed(2)}`
          : 'Price not available'}
      </div>
    </div>
  );
};

export default CartItem;
