import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa'
function SliderDestination({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLeftClick = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(images.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleRightClick = () => {
    if (currentImageIndex === images.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="carouselCard">
        <button onClick={handleLeftClick}>
          <FaArrowLeft />
        </button>
        <button onClick={handleRightClick}>
          <FaArrowRight />
        </button>
    
</div>
  );
}

export default SliderDestination;
