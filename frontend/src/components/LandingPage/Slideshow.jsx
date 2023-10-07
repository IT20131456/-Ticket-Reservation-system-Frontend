import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Slideshow.css'; // Import the CSS file for styles (create Slideshow.css).

const Slideshow = () => {
    const images = [
        'img/gallery-3.jpg',
        'img/gallery-4.jpg',
        'img/gallery-6.jpg',
      ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    // Automatically advance to the next slide every 3 seconds (adjust as needed).
    const interval = setInterval(nextSlide, 5000); // 3000 milliseconds = 3 seconds

    // Clear the interval when the component unmounts to prevent memory leaks.
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      <div className="slideshow">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
            <div className="slide-content">
              <p style={{ fontSize: '50px' }}>Welcome to Railways</p>
              <p style={{ fontSize: '22px' }}>Book Your Tickets Now!</p>
              <Link to="/employee/login">
                <button style={{ margin: '10px' }}>Login</button>
              </Link>
              <Link to="/login">
                <button style={{ margin: '10px' }}>Signup</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="prev-button">&#10094;</button>
      <button onClick={nextSlide} className="next-button">&#10095;</button>
    </div>
  );
};

export default Slideshow;
