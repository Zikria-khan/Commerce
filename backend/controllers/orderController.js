const OrderHistory = require('../Models/orderSchema');

// Create a new order history entry
exports.createOrderHistory = async (req, res) => {
  try {
    const { userId, orderId, status, paymentStatus, paymentMethod, shippingAddress, items, totalAmount } = req.body;

    const newOrderHistory = new OrderHistory({
      userId,
      orderId,
      status,
      paymentStatus,
      paymentMethod,
      shippingAddress,
      items,
      totalAmount
    });

    await newOrderHistory.save();
    res.status(201).json(newOrderHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order history status (shipped, delivered, etc.)
exports.updateOrderHistoryStatus = async (req, res) => {
  try {
    const { orderHistoryId } = req.params;
    const { status, paymentStatus, shippingDetails } = req.body;

    const orderHistory = await OrderHistory.findById(orderHistoryId);
    if (!orderHistory) return res.status(404).json({ message: 'Order history not found' });

    // Update the order status
    if (status) orderHistory.status = status;
    if (paymentStatus) orderHistory.paymentStatus = paymentStatus;
    if (shippingDetails) {
      orderHistory.trackingNumber = shippingDetails.trackingNumber;
      orderHistory.shippedDate = shippingDetails.shippedDate;
      orderHistory.deliveryDate = shippingDetails.deliveryDate;
    }

    await orderHistory.save();
    res.status(200).json(orderHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order history for a specific user
exports.getOrderHistoryByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orderHistory = await OrderHistory.find({ userId }).populate('items.productId');
    
    if (!orderHistory) return res.status(404).json({ message: 'No order history found for this user' });
    
    res.status(200).json(orderHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// New method to get all orders (for admin or authorized users)
exports.getAllOrderHistory = async (req, res) => {
  try {
    const orderHistory = await OrderHistory.find().populate('items.productId');
    
    if (!orderHistory || orderHistory.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orderHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
