import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from 'react-responsive';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import SliderDestination from './SliderDestination';

const PopularDestinations = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleFilterClick = (filterType) => {
    setFilter(filterType);
  };

  const filterDestinations = () => {
    let filteredDestinations = destinations;

    if (filter !== 'all') {
      filteredDestinations = destinations.filter((destination) => {
        return destination.type === filter;
      });
    }

    return filteredDestinations.filter((destination) => {
      return destination.name.toLowerCase().includes(search.toLowerCase());
    });
  };

  const prevIndex = currentSlide === 0 ? filterDestinations().length - 1 : currentSlide - 1;
  const nextIndex = currentSlide === filterDestinations().length - 1 ? 0 : currentSlide + 1;

  const handleLeftClick = () => {
    setCurrentSlide((currentSlide - 1 + filterDestinations().length) % filterDestinations().length);
  };

  const handleRightClick = () => {
    setCurrentSlide((currentSlide + 1) % filterDestinations().length);
  };

  const sliderSettings = {
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  return (

    <div className="destination">
      <h2>Destinos populares</h2>
      <div className="filter-buttons">
        <button onClick={() => handleFilterClick('all')}>Todos</button>
        <button onClick={() => handleFilterClick('ciudad')}>Ciudad</button>
        <button onClick={() => handleFilterClick('playa')}>Playa</button>
        <button onClick={() => handleFilterClick('montaña')}>Montaña</button>
      </div>
      <div>
        <button onClick={handleLeftClick}><FaArrowLeft /></button>
        <button onClick={handleRightClick}><FaArrowRight /></button>
      </div>

      {/* Agregar el componente Carousel solo en modo desktop */}
      {!isMobile && (
        <SliderDestination
          images={filterDestinations().map((destination) => destination.image)}
        />
      )}

      {isMobile && (
        <Slider>
          {filterDestinations().map((destination, index) => (
            <div className="destination-card" key={index}>
              <div className="imgDestination">
                <img src={destination.image} alt={destination.name} />
              </div>
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
              <p>
                <span className="location-icon">📍</span>
                {destination.location}
              </p>
              <p>
                <span className="star-icon orange-star">★</span> <span className="rating">{destination.rating}</span>
                </p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};
              
       
        export default PopularDestinations;