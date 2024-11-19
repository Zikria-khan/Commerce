import React, { useState } from 'react';
import ImageSlider from './ImageSlider';
import ProductFilters from './ProductFilters';
import ProductList from './ProductList';
import './MainContent.css';
import Navbar from '../Navbar/Navbar';
import { Footer } from './Footer';

function MainContent() {
  const [category, setCategory] = useState('all');  // To hold the selected category
  const [sortBy, setSortBy] = useState('name');     // To hold the sorting preference

  // Function to handle sorting preference change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <main className="container mx-auto px-6 py-8">
      <Navbar />
      <ImageSlider />
      <ProductFilters 
        setCategory={setCategory} 
        setSortBy={handleSortChange} // Passing sort handler to the filter
      />
      <ProductList category={category} sortBy={sortBy} /> {/* Passing both category and sortBy */}
      <Footer />
    </main>
  );
}

export default MainContent;
