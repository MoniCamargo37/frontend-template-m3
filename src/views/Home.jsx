import React, { useState, useContext } from "react";
import Slider from "react-slick";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [formattedCity, setFormattedCity] = useState("");
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCity = () => {
    navigate('/CityOverview', { state: {city: selectedCity, formattedCity: formattedCity} })
  };

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
        <h2>Destinos populares</h2>
      </div>
    </div>
  );
};

export default Home;



