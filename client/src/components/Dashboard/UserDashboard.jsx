import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './../../components/Homepage/Homepage';
import MainContent from './../../components/Shoppage/MainContent';
import OrderHistory from './../../components/History/OrderHistory';
import OrderDetails from './../../components/History/OrderDetails';
import ShoppingCart from './../../components/Cart/ShoppingCart';
import AboutUs from './../../components/Aboutus/Aboutus';
import Reviews from './../../components/Review/Reviewpage';
import ProductDetail from './../../components/Shoppage/productDetail';
import Report from '../Report/Report';

const UserDashbboard = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/shoppingpage" element={<MainContent />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/order/:orderId" element={<OrderDetails />} /> {/* Route for order details page */}
          <Route path="/shoppingcart" element={<ShoppingCart />} /> 
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/review/:productId" element={<Reviews />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
};

export default UserDashbboard;
