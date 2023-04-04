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
  const cityName = myTrip.cityName;
  const itineraryPic = myTrip.tripPlan.searchedCity;


  const getTrip = async () => {
    try {
      const openaiResponse = await tripPlanService.createTripPlan(myTrip.tripPlan);
      console.log("Fin del trayecto: ", openaiResponse.res);
      myTrip.days = openaiResponse.res;
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
    if (!myTrip) return; // Si myTrip es nulo, no llamar a getTrip()
    getTrip();
  }, []); // Arreglo de dependencias vacío

  
  // const handleDelete = async () => {
  //   try {
  //     const confirmed = window.confirm('Are you sure you want to delete this trip plan?');
  //     if (confirmed) {
  //       await tripPlanService.deleteTrip(tripId);
  //       navigate('/trip-plan');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

const handleSave = async () => {
  try {
    await tripPlanService.createTrip(newTripPlan);
    console.log('Trip plan saved!');
    alert('Trip plan saved!');
  } catch (error) {
    console.error(error);
    alert('Error saving trip plan. Please try again later.');
  }
};

  const handleGoBack = () => {
    navigate('/');
  };
  const monthNames = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre',
  };

  return (
    <>
       <div className='loading'>
      {loading && <p>Loading...</p>}
      </div>
      {!loading && myTrip && (
        <div className="tripPlanDetail-card">
          <div className="cityOverview-card">
         <h2>{cityName}</h2>
         <img src={itineraryPic} alt={cityName} />
          </div>
          <div className='trip-data'>
          <p>¡Bienvenido a tu viaje soñado! De acuerdo a tu planificación, el viaje tendrá una duración de {myTrip.tripPlan.tripDuration} día(s), con un total de {myTrip.tripPlan.numTravellers} viajero(s). Estás planeando viajar en {monthNames[myTrip.tripPlan.monthOfTrip]} y disfrutar de un emocionante {myTrip.tripPlan.tripType}. Además, tu presupuesto para este viaje es de €{myTrip.tripPlan.budget}. ¡A disfrutar de las aventuras que te esperan!</p>
          </div>
          <div className='activities-plan'>
          <ul>
            {myTrip.days.map((day, index) => (
              <li key={index}>{day.name}
                <ul>
                  {day.activities.map((activity, ind) => (
                    <li key={ind}>{activity.name} {activity.description} {activity.duration} </li>              
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          </div>
          <div className='cityOverview-btns'>
          <button onClick={handleSave}>Save Trip Plan</button>
          {/* <button onClick={handleDelete}>Delete Trip Plan</button> */}
          <button onClick={handleGoBack}>Go Back</button>
          </div>
    </div>
  )}
  <div className='cityOverview-error'>
  {error && <p>Error al cargar los datos del plan de viaje.</p>}
  </div>
</>
  );
}

export default TripPlan;