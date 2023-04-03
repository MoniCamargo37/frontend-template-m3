import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import tripPlanService from '../../services/tripPlanService';

function TripPlan() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [newTripPlan, setNewTripPlan] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const location = useLocation();
  const myTrip = location.state;
  
  const getTrip = async () => {
    try {
      const openaiResponse = await tripPlanService.createTripPlan(myTrip.tripPlan);
      console.log("Fin del trayecto: ", openaiResponse.res);
      myTrip.activities = openaiResponse.res;
      console.log('Esto es myTrip: ', myTrip);
      setNewTripPlan(myTrip);      
      setLoading(false);
      setError(false);
  
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };
  
  useEffect(() => {
    getTrip();
  }, []);

  
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this trip plan?');
      if (confirmed) {
        await tripPlanService.deleteTrip(tripId);
        navigate('/trip-plan');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      // Here you can call the API to save the trip plan to the user's account
      console.log('Trip plan saved!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };


  return (
    <>
       <div className='loading'>
      {loading && <p>Loading...</p>}
      </div>
      {!loading && myTrip && (
        <div className="tripPlanDetail-card">
          <div className="cityOverview-card">
          <h2>{myTrip.city}</h2>
          {/* <img src={searchedCity.itineraryPic} alt={searchedCity.cityName} /> */}
          </div>
          <p>Duración del viaje: {myTrip.tripPlan.tripDuration} día o días</p>
          <p>Número de viajeros: {myTrip.tripPlan.numTravellers}</p>
          <p>Mes de viaje: {myTrip.tripPlan.monthOfTrip}</p>
          <p>Tipo de viaje: {myTrip.tripPlan.tripType}</p>
          <p>Presupuesto: €{myTrip.tripPlan.budget}</p>
          <ul>
            {myTrip.activities.map((day, index) => (
              <li key={index}>{day.name}
                <ul>
                  {day.activities.map((activity, ind) => (
                    <li key={ind}>{activity.name}</li>              
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={handleSave}>Save Trip Plan</button>
          {/* <button onClick={handleDelete}>Delete Trip Plan</button> */}
          <button onClick={handleGoBack}>Go Back</button>
    </div>
  )}
  <div className='cityOverview-error'>
  {error && <p>Error al cargar los datos del plan de viaje.</p>}
  </div>
</>
  );
}

export default TripPlan;