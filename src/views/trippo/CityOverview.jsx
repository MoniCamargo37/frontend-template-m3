import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Map from '../../components/Map';
import { searchALocation } from '../../components/Map';
import cityOverviewService from '../../services/cityOverviewService';

export default function CityOverview() {
  const navigate = useNavigate();
  const [searchedCity, setSearchedCity] = useState();
//  const [cityName, setCityName] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();
  const { cityParams } = useParams();
  let city;

  if( location.state)
    city = location.state.city;
  else
  city = cityParams;

  const checkCity = async () => {
    searchALocation(city)
    .then(data => {
      console.log("Esto es lo devuelto: ", data);
      console.log(data.estimatedTotal);
      if(data.estimatedTotal > 0) {
        console.log(data.resources[0].address.formattedAddress);
        city = data.resources[0].address.formattedAddress;
        getCity();
      }
    })
    .catch(error => console.error("No encontrado: ", error));
  }

  const getCity = async () => {
    try {
      const response = await cityOverviewService.getCity(city);
      setSearchedCity(response);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    checkCity();
  }, [checkCity]);

  const handleContinue = () => {
    if (searchedCity) {
      navigate(`/planning/${searchedCity.cityName}`, { state: { cityName: searchedCity.cityName }});
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this city?');
      if (confirmed) {
        await cityOverviewService.deleteCity(id);
//        setCityName(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && searchedCity && (
        <div className="cityOverview-card">
          <Map city={searchedCity.cityName} />
          
          {/* <img src={searchedCity.destinationPics[0]} alt={searchedCity.cityName} />
          <img src={searchedCity.destinationPics[1]} alt={searchedCity.cityName} /> */}
          <img src={searchedCity.destinationPics[0]} alt={searchedCity.cityName} onError={(e) => e.target.style.display = 'none'} />
          <img src={searchedCity.destinationPics[1]} alt={searchedCity.cityName} onError={(e) => e.target.style.display = 'none'} />
          {/* <img src={searchedCity.itineraryPic} alt={searchedCity.cityName} /> */}
          <p>{searchedCity.description}</p>
          <p>País: {searchedCity.country}</p>
          <p>Number of searches: {searchedCity.numSearches}</p>
          <button onClick={handleContinue}>Continue</button>
          <button onClick={handleGoBack}>Go Back</button>
          <button onClick={() => handleDelete(searchedCity.id)}>Delete</button>
        </div>
      )}
      {error && <p>Failed to load city data.</p>}
    </>
  );
}


