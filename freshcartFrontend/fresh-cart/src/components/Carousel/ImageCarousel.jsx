// src/ImageCarousel.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ImageCarousel.css'

// Import the image directly
import vege from "./Group 55.png";
import milk from "./milk.png";
import fruits from "./fruit.png";

const ImageCarousel = () => {
  // Use the imported image
  const images = [fruits, milk, vege];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div style={{  width: "100%",cursor:'pointer',marginTop:'90px'}}>  
      
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: "100%",height:"auto" }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
