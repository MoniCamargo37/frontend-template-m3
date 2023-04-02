// import React, { useState, useContext, useEffect } from "react";
// import Slider from "react-slick";
// import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import { AuthContext } from "../context/AuthContext";
// import CityOverviewService from "../services/cityOverviewService";
// import CityOverview from '../components/CityOverview';


// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [formattedCity, setFormattedCity] = useState("");
//   const { user, logOutUser } = useContext(AuthContext);
//   const [mostSearchedCities, setMostSearchedCities] = useState([]);
//   const navigate = useNavigate();

//   const handleCity = () => {
//     navigate('/CityOverview', { state: {city: selectedCity, formattedCity: formattedCity} })
//   };
  
//   useEffect(() => {
//     CityOverviewService.getMostSearchedCities()
//       .then(setMostSearchedCities)
//       .catch(error => console.error(error));
//   }, []);

//   const CityOverview = ({ cityName, destinationPics, numSearches }) => {
//     const handleImageError = (e) => {
//       e.target.style.display = 'none';
//     };

//   return (
//     <div className="App">
//       {user && <h1>Hello {user.username}</h1>}
//       <h2>¡Explícame ese lugar que estás pensando!</h2>
//       <div className="searchCard">
//         <div className="search-input">
//           <FaSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Quiero ir..."
//             value={selectedCity}
//             onChange={(event) => setSelectedCity(event.target.value)}
//             onKeyDown={(event) => {
//               if (event.key === "Enter") {
//                 handleCity();
//               }
//             }}
//           />
//         </div>
//       </div>
//       <div className="cityOverview">
//       <h2>{cityName}</h2>
//       <img src={destinationPics[0]} alt={cityName} onError={handleImageError} />
//       <p>Number of searches: {numSearches}</p>
//     </div>
//       <div className="destination">
//         <h1>Most searched cities:</h1>
//         {mostSearchedCities.map(city => (
//           <Link to={`/CityOverview/${city.cityName}`} key={city._id}>
//             <CityOverview {...city} />
//           </Link>
//         ))}
//       </div>
//     </div> 
//   );
// }

// export default Home;



import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
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
    speed: 500,
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
        breakpoint: 600,
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
    ]
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  const handleCityClick = async (cityName) => {
    const searchResult = await searchALocation(cityName);
    const myCoordinates = searchResult.resources[0].geocodePoints[0].coordinates;
    const formattedAddress = searchResult.resources[0].address.formattedAddress;
    navigate('/CityOverview', { state: {city: cityName, formattedCity: formattedAddress, coordinates: myCoordinates} });
  }

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
      <div className="mostSearchedCities">
        <h1>Most searched cities:</h1>
        <Slider {...settings}>
  <div className="slider-arrow-left">
    <FaArrowLeft />
  </div>
  <div className="slider-arrow-right">
    <FaArrowRight />
  </div>
  {mostSearchedCities.map(city => (
    <Link to={`/CityOverview/${city.cityName}`} key={city._id}>
      <div className="mostSearchedCity">
        <h2>{city.cityName}</h2>
        <img src={city.destinationPics[1]} alt={city.cityName} onError={(e) => e.target.style.display = 'none'} />
        <p>{city.numSearches} searches</p>
        <p>{city.description}</p>
      </div>
    </Link>
  ))}
</Slider>
</div>
</div>
);
};
 export default Home; 