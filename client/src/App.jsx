import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import "./App.css";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Homepage from "./components/Homepage/Homepage";
import MainContent from "./components/Shoppage/MainContent";
import OrderHistory from "./components/History/OrderHistory";
import OrderDetails from "./components/History/OrderDetails";
import ShoppingCart from "./components/Cart/ShoppingCart";
import AboutUs from "./components/Aboutus/Aboutus";
import FrontendReport from "./components/Report/Report";
import Reviews from "./components/Review/Reviewpage";
import ProductDetail from "./components/Shoppage/ProductDetail";
import Add from "./Add"
// Create router with future flags enabled
const router = createBrowserRouter(
  [

    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    {path:"add",element:<Add/>},
    { path: "/homepage", element: <Homepage /> },
    { path: "/shoppingpage", element: <MainContent /> },
    { path: "/orderhistory", element: <OrderHistory /> },
    { path: "/order/:orderId", element: <OrderDetails /> },
    { path: "/shoppingcart", element: <ShoppingCart /> },
    { path: "/about", element: <AboutUs /> },
    { path: "/reviews/:productId", element: <Reviews /> },
    { path:"/product/:productId", element:<ProductDetail /> },
    { path: "/report", element: <FrontendReport /> },

    // Admin routes
  ],
  {
    future: {
      v7_normalizeFormMethod: true,          // Enable uppercase normalization for formMethod
      v7_partialHydration: true,             // Enable new RouterProvider hydration behavior
      v7_skipActionErrorRevalidation: true,  // Enable new revalidation behavior for 4xx/5xx responses
    },
  }
);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
