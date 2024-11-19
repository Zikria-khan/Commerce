import React, { useState } from 'react';
import './ProductFilters.css';

function ProductFilters({ setCategory, setSortBy }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSortBy, setActiveSortBy] = useState('name');

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCategory(category);
  };

  const handleSortChange = (sortBy) => {
    setActiveSortBy(sortBy);
    setSortBy(sortBy);
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="sortBy" className="filter-label">Sort by:</label>
        <div className="filter-buttons">
          <button 
            className={`filter-button ${activeSortBy === 'name' ? 'active' : ''}`}
            onClick={() => handleSortChange('name')}
          >
            Name
          </button>
          <button 
            className={`filter-button ${activeSortBy === 'price' ? 'active' : ''}`}
            onClick={() => handleSortChange('price')}
          >
            Price
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="category" className="filter-label">Category:</label>
        <div className="filter-buttons">
          <button 
            className={`filter-button ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${activeCategory === 'Fitness' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('Fitness')}
          >
            Fitness
          </button>
          <button 
            className={`filter-button ${activeCategory === 'Accessories' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('Accessories')}
          >
            Accessories
          </button>
          <button 
            className={`filter-button ${activeCategory === 'Home & Office' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('Home & Office')}
          >
            Home & Office
          </button>
          <button 
            className={`filter-button ${activeCategory === 'Electronics' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('Electronics')}
          >
            Electronics
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;
