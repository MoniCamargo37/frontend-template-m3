import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CityOverviewService from "../services/cityOverviewService";
import Map, { searchALocation } from '../components/Map';
import Slider from "react-slick";
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [formattedCity, setFormattedCity] = useState("");
  const { user, logOutUser } = useContext(AuthContext);
  const [mostSearchedCities, setMostSearchedCities] = useState([]);
  const [sliderRef, setSliderRef] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [cityClicked, setCityClicked] = useState(false);

 


  const navigate = useNavigate();

  const handleCity = () => {
    navigate('/CityOverview', { state: {city: selectedCity, formattedCity: formattedCity} })
  };
  
  useEffect(() => {
    CityOverviewService.getMostSearchedCities()
      .then(setMostSearchedCities)
      .catch(error => console.error(error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 100,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    beforeChange: (current, next) => {
      setCurrentSlideIndex(next);
    }
  };

  const handleCityClick = (cityName) => {
    setCityClicked(cityName);
    if (cityClicked === cityName) {
      setCityClicked(null);
      navigate('/CityOverview', { state: { city: cityName } });
    }
  };

  const handlePrevClick = () => {
    if (currentSlideIndex > 0) {
      const newIndex = currentSlideIndex - 1;
      setCurrentSlideIndex(newIndex);
      setCurrentSlide(newIndex);
      sliderRef.slickGoTo(newIndex); // move the arrows
    }
  };
  
  const handleNextClick = () => {
    if (currentSlideIndex < mostSearchedCities.length - 1) {
      const newIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(newIndex);
      setCurrentSlide(newIndex);
      sliderRef.slickGoTo(newIndex); // move the arrows
    }
  };

  return (
    <div className="App">
    
      {user && <h1>¡Hola {user.username}!</h1>}
      <h2>¿A dónde viajaremos?</h2>
      <div className="searchCard">
        <div className="search-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Quiero ir..."
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleCity();
              }
            }}
          />
        </div>
      </div>
      <div className="mostSearchedCities">
        <h1>Descubre las ciudades más buscadas</h1>
        <Slider {...settings} ref={slider => setSliderRef(slider)}>
      {mostSearchedCities.map(city => (
        <div className="mostSearchedCity-card">
        <div
          className="mostSearchedCity"
          key={city._id}
          onClick={() => handleCityClick(city.cityName)}
        >
           <h2>{city.cityName}</h2>
              <img src={city.destinationPics[1]} alt={city.cityName} onError={(e) => e.target.style.display = 'none'} />
              <div className="searched-number">
              <h3>{city.numSearches}</h3>
              <p>visitas</p>
              </div>
              <p className="city-description open-city-overview">{city.description.slice(0, 100)}{city.description.length > 100 ? '...' : ''}</p>
            </div>
            </div>
          ))}
        </Slider>
        <div className="slider-arrows">
        <button className="slider-arrow-left" onClick={handlePrevClick}>
  <FaArrowLeft />
</button>
<button className="slider-arrow-right" onClick={handleNextClick}>
  <FaArrowRight />
</button>
        </div>
      </div>
      
    </div>
  );
};

export default Home;

