import React, { useState } from "react";
import Slider from "react-slick";
import Home from '../images/home-image.png';
import Cityoverview from '../images/cityoverview-image.png';
import Form from '../images/form-image.png';
import Login from '../images/login-image.png';
import Plan from '../images/plan-image.png';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const images = [
    { src: Home },
    { src: Cityoverview },
    { src: Form },
    { src: Login },
    { src: Plan },
  ];

  return (
    <div className="carousel">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
      <div className="arrows">
        <button
          className="arrow left"
          onClick={() => setCurrentSlide(currentSlide - 1)}
          disabled={currentSlide === 0}
        >
          {"<"}
        </button>
        <button
          className="arrow right"
          onClick={() => setCurrentSlide(currentSlide + 1)}
          disabled={currentSlide === images.length - 1}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
export default Carousel;