import React, { useState } from "react";
import "./addtocart.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    sku: "", // Added sku field
    price: { value: "", currency: "USD" },
    discount: { percentage: 0, validUntil: "" },
    stock: { quantity: 0, warehouseLocation: "" },
    images: [{ url: "", altText: "" }],
    specifications: [{ key: "", value: "" }],
    dimensions: { weight: "", length: "", width: "", height: "", unit: "cm" },
    tags: [],
    isFeatured: false,
    isActive: true,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProduct((prev) => ({ ...prev, [name]: checked }));
    } else if (name.includes(".")) {
      const [field, subField] = name.split(".");
      setProduct((prev) => ({
        ...prev,
        [field]: { ...prev[field], [subField]: value },
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        setMessage("Product added successfully!");
      } else {
        setMessage("Failed to add product. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred while adding the product.");
    }
  };

  return (
    <div className="addproduct">
      <h1>Add Product</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="sku" // Added sku input field
          placeholder="SKU"
          value={product.sku}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price.value"
          placeholder="Price"
          value={product.price.value}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
