import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Map from '../../components/Map';
import cityOverviewService from '../../services/cityOverviewService';

export default function CityOverview() {
  const navigate = useNavigate();
  const [searchedCity, setSearchedCity] = useState();
  const [cityName, setCityName] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const location = useLocation();
  const { city } = location.state;
  

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
    getCity();
  }, [cityName]);

  const handleContinue = () => {
    if (searchedCity) {
      navigate('/planning');
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
        setCityName(null);
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
          <img src={searchedCity.itineraryPic} alt={searchedCity.cityName} />
          <p>{searchedCity.description}</p>
          <p>Location: {searchedCity.location}</p>
          <p>Currency: {searchedCity.currency}</p>
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


