  const Cart = require('../Models/cartSchema');

  // Create a new cart item or update an existing one
  const createCartItem = async (req, res) => {
    const { userId, productId, quantity, shippingAddress, totalPrice } = req.body;

    try {
      const existingCartItem = await Cart.findOne({ userId, productId });

      if (existingCartItem) {
        // Update the existing cart item if the product is already in the user's cart
        existingCartItem.quantity = quantity;
        existingCartItem.shippingAddress = shippingAddress;
        existingCartItem.totalPrice = totalPrice;
        existingCartItem.updatedAt = Date.now();

        await existingCartItem.save();

        return res.status(200).json({
          message: 'Cart item updated successfully',
          cartItem: existingCartItem,
        });
      }

      // If no cart item exists, create a new one
      const newCartItem = new Cart({
        userId,
        productId,
        quantity,
        shippingAddress,
        totalPrice,
      });

      await newCartItem.save();
      res.status(201).json({
        message: 'Cart item created successfully',
        cartItem: newCartItem,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating or updating cart item',
        error: error.message,
      });
    }
  };

  // Get all cart items for a specific user
  const getCartItemsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
      const cartItems = await Cart.find({ userId }).populate('productId');
      console.log("cartItems",cartItems)
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching cart items',
        error: error.message,
      });
    }
  };

  // Update a cart item (e.g., changing quantity or shipping address)
  const updateCartItem = async (req, res) => {
    const { cartId } = req.params;
    const { quantity, shippingAddress, totalPrice, status } = req.body;

    try {
      const updatedCartItem = await Cart.findByIdAndUpdate(
        cartId,
        { quantity, shippingAddress, totalPrice, status, updatedAt: Date.now() },
        { new: true }
      );

      if (!updatedCartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }

      res.status(200).json({
        message: 'Cart item updated successfully',
        cartItem: updatedCartItem,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating cart item',
        error: error.message,
      });
    }
  };

  // Delete a cart item by its ID
  const deleteCartItem = async (req, res) => {
    const { cartId } = req.params;

    try {
      const deletedCartItem = await Cart.findByIdAndDelete(cartId);

      if (!deletedCartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }

      res.status(200).json({
        message: 'Cart item deleted successfully',
        cartItem: deletedCartItem,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting cart item',
        error: error.message,
      });
    }
  };

  // Delete a specific product from a user's cart by userId and productId
  const deleteProductFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
      const deletedCartItem = await Cart.findOneAndDelete({
        userId,
        productId,
      });

      if (!deletedCartItem) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }

      res.status(200).json({
        message: 'Product removed from cart successfully',
        cartItem: deletedCartItem,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error removing product from cart',
        error: error.message,
      });
    }
  };

  module.exports = {
    createCartItem,
    getCartItemsByUser,
    updateCartItem,
    deleteCartItem,
    deleteProductFromCart,
  };
