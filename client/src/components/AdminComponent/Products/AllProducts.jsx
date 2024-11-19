import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import './AllProducts.css'; // Custom CSS for styling

function GetAllProducts() {
  const [products, setProducts] = useState([]);

  // Fetch all products from the API or database (mocked here)
  useEffect(() => {
    // You can replace the mocked data with an actual API call
    const fetchedProducts = [
      { id: 1, name: "Product 1", description: "Description for Product 1", price: "$100", status: "Active" },
      { id: 2, name: "Product 2", description: "Description for Product 2", price: "$150", status: "Inactive" },
      { id: 3, name: "Product 3", description: "Description for Product 3", price: "$200", status: "Active" },
      { id: 4, name: "Product 4", description: "Description for Product 4", price: "$120", status: "Active" },
    ];
    setProducts(fetchedProducts);
  }, []);

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>All Products</h2>
        <Link to="/adminDashboard" className="btn btn-back">
          Back to Dashboard
        </Link>
        <button className="btn btn-blue">Add New Product</button>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.status}</td>
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

export default GetAllProducts;
