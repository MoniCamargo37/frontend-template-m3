import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Map from '../../components/Map';
import cityOverviewService from '../../services/cityOverviewService';
import { useAuth } from '../../hooks/useAuth';
import ButtonsCard from '../../components/ButtonsCard';
import Loading from "../../components/Loading";

export default function CityOverview() {
  const navigate = useNavigate();
  const [searchedCity, setSearchedCity] = useState();
  const [finishedSearch, setFinishedSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  let searchParam = new URLSearchParams(window.location.search);
  let city = searchParam.get('city');
  
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
    if (!finishedSearch) {
      setFinishedSearch(true);
      getCity()
    }
  },[finishedSearch]);

  const handleContinue = () => {
    if (searchedCity) {
      navigate(`/planning/${searchedCity.cityName}`, { state: { cityName: searchedCity.cityName, searchedCity: searchedCity.itineraryPic }});
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
       <div className='cityoverview-container'>
         <div className='loading'>
           {loading && <Loading />}
         </div>
         {!loading && searchedCity && (
           <>
            <div className='header-title'>
                <h1>{searchedCity.cityName.split(' -')[0]} -</h1> {/*coge solo la primera posicion que es nombre de ciudad */}
                 <h2>{searchedCity.country}</h2>
               </div>
               <div className='cityOverview-img-btns'>
               <div className='cityOverview-img'>
                 <img src={searchedCity.destinationPics[0]} alt={searchedCity.cityName} onError={(e) => e.target.style.display = 'none'} />
                 <img src={searchedCity.destinationPics[1]} alt={searchedCity.cityName} onError={(e) => e.target.style.display = 'none'} />
               </div>
               <div className="cityOverview-sharebtn">
               <ButtonsCard /> 
               </div>
               </div>
               <div className='cityOverview-btns'>
                 <button onClick={handleContinue}>Continue</button>
                 <button onClick={handleGoBack}>Go Back</button>
                 {user && user.role === 'admin' && (
                   <div className='delete-btn'> 
                     <button onClick={() => handleDelete(searchedCity.id)}>Delete</button>
                   </div>
                 )}
               </div> 
           </>
         )}
             <div class="cityOverview-card">
  <div class="description-card">
    <h2>{searchedCity.cityName.split(' -')[0]}</h2>
    <h3>{searchedCity.country}</h3>
    <p>{searchedCity.description}</p>
    <div class="searched-number">
      <h3>{searchedCity.numSearches}</h3>
      <p>Visitas</p>
    </div>
  </div>
  <div class="map-card">
    <Map city={searchedCity.cityName} />
  </div>
</div>
         <div className='cityOverview-error'>
           {error && <p>Failed to load city data.</p>}
         </div>
       </div>
 
     </>
   );
 }
