import React, { useState, useContext, useEffect } from "react";
import Slider from "react-slick";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import CityOverviewService from "../services/cityOverviewService";
import CityOverview from '../components/CityOverview';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [formattedCity, setFormattedCity] = useState("");
  const { user, logOutUser } = useContext(AuthContext);
  const [mostSearchedCities, setMostSearchedCities] = useState([]);
  const navigate = useNavigate();

  const handleCity = () => {
    navigate('/CityOverview', { state: {city: selectedCity, formattedCity: formattedCity} })
  };
  
  useEffect(() => {
    CityOverviewService.getMostSearchedCities()
      .then(setMostSearchedCities)
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      {user && <h1>Hello {user.username}</h1>}
      <h2>¡Explícame ese lugar que estás pensando!</h2>
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
      <div className="destination">
        <h1>Most searched cities:</h1>
        {mostSearchedCities.map(city => (
          <Link to={`/CityOverview/${city.cityName}`} key={city._id}>
            <CityOverview {...city} />
          </Link>
        ))}
      </div>
    </div> );
};

export default Home;