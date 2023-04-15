import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import CityOverviewService from "../../services/cityOverviewService";
import { searchALocation } from "../../components/Map";
import backgroundPic from '../../images/backgroundHome.jpg';
import '../../styles/HomeStyles.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [suggestedCities, setSuggestedCities] = useState([]);
  const { user } = useContext(AuthContext);
  const [mostSearchedCities, setMostSearchedCities] = useState([]);
  const [startX, setStartX] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [timeoutId, setTimeoutId] = useState(100);
  const navigate = useNavigate();
  
  // Section of code to handle the search bar

  const handleWriting = (city) => {
    setSelectedCity(city);
    clearInterval(timeoutId);
    setTimeoutId(100);
  };

  const handleSearchedCity = () => {
    if (selectedCity === "") {
      setSuggestedCities([]);
      return;
    }
    searchALocation(selectedCity).then((data) => {
      let cityList = [];
      data.resources.forEach((result) => {
        if (result.address.locality && result.entityType === "PopulatedPlace") {
          let theCity =
            result.address.locality +
            " - " +
            result.address.adminDistrict +
            " (" +
            result.address.countryRegion +
            ")";
          console.log(theCity);
          //Si theCity no existe en el array de cityList, lo añadimos
          if (!cityList.includes(theCity)) {
            cityList.push(theCity);
          }
        }
      });
      setSuggestedCities(cityList);
    });
  };


useEffect(() => {
  // Ejecutar la función después de que el usuario haya dejado de escribir durante medio segundo
  setTimeoutId(setTimeout(() => { handleSearchedCity();}, 100));
  // Cancelar el temporizador si el componente se desmonta o la ciudad cambia
  return () => {
    clearTimeout(timeoutId);
  };
   // eslint-disable-next-line
}, [selectedCity]);



  const handleCityClick = (cityName) => {
    if (suggestedCities.length > 0){
      cityName = suggestedCities[0];
      navigate("/CityOverview?city="+encodeURIComponent(cityName));
    }
  };

  // End of section of code to handle the search bar

  useEffect(() => {
    CityOverviewService.getMostSearchedCities()
      .then(setMostSearchedCities)
      .catch((error) => console.error(error));
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
          dots: true,
        },
      },
      {
        breakpoint: 100,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current, next) => {
  
    },
  };

  const detectSwipe = (e) => {
    const distance = e.clientX - startX;
    if (Math.abs(distance) > 50) {
      setIsSwiping(true);
    } else {
      setIsSwiping(false);
    }
  };

  return (
    <div className="Home">
      <div className="Home-card">
          <div className="backgroundPic-home">
              <img src={backgroundPic} alt="backgroundPic" />
              {user ? (<h3>¡Nos encanta verte por aquí, {user.username}! 😊</h3>
              ) : (
                    <h3>Hola viajero, ¿A dónde te llevaremos hoy?</h3> )}
                    <h2 >¡Explícame ese lugar que estás pensando!</h2>
                <div className="searchCard">
                        <div className="search-input">
                          <FaSearch className="search-icon" />
                          <input
                            type="text"
                            placeholder="¿A dónde viajas?"
                            value={selectedCity}
                            onChange={(event) => {
                              handleWriting(event.target.value);
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                handleCityClick();
                              }
                            }}
                          />
                        </div>
                          {suggestedCities.length > 0 && (
                          <div className="suggested-city-card">
                              {suggestedCities.map((city) => (
                                <div key={city}  className="suggested-city"  onClick={() => { handleCityClick(city); }}>
                                    {city}
                                </div>
                                ))}
                        </div>
                        )}
                </div>
          </div>
        <div className="mostSearchedCities"  onMouseDown={(e) => setStartX(e.clientX)}  onMouseUp={(e) => detectSwipe(e)}>
          <h1>Descubre las ciudades más buscadas</h1>
          <Slider {...settings}>
            {mostSearchedCities.map((city) => (
              <div className="mostSearchedCity-card">
                  <div className="mostSearchedCity" key={city._id}  onClick={() => {
                          if (!isSwiping) { handleCityClick(city.cityName); }}}>
                        <h2 >{city.cityName.split(' -')[0]} ({city.cityName.split('(')[1]}</h2>
                        <img  src={city.destinationPics[1]} alt={city.cityName} onError={(e) => (e.target.style.display = "none")}/>
                        <div className="searched-number-home">
                          <h3 className="h3-home">{city.numSearches}</h3>
                          <p>visitas</p>
                        </div>
                        <p className="city-description">
                          {city.description.slice(0, 100)}
                          {city.description.length > 100 ? "..." : ""}
                        </p>
                  </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      </div>
  );
};

export default Home;




