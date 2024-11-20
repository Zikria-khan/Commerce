import React, { useState, useEffect } from 'react';
import './ImageSlider.css'; // Link your CSS file

const ImageSlider = () => {
  // Define the list of images
  const images = [
    "./image1.jpg", // Path relative to the public folder
    "./image2.jpg",
    "./image3.jpg",
    "./image4.jpg",
    "./image5.jpg",
  ];

  // State to track the current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000); // 5 seconds interval
    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  // Function to go to the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="image-slider-container">
      {/* Slider Image */}
      <div className="slider-wrapper">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="slider-image"
        />
      </div>

      {/* Slider Controls (Arrow Buttons) */}
      <div className="slider-controls">
        <button className="slider-btn prev-btn" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="slider-btn next-btn" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
