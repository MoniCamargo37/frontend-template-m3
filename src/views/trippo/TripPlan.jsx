import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import tripPlanService from '../../services/tripPlanService';
import { AuthContext } from '../../context/AuthContext';
import Loading from "../../components/Loading";
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from "react-hot-toast";
import "../../styles/TripPlanStyle.css";
import '../../styles/AllPagesStyles.css'

function TripPlan() {
  const navigate = useNavigate();
  const [newTripPlan, setNewTripPlan] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();
  const myTrip = location.state;
  const cityName = myTrip.cityName;
  const itineraryPic = myTrip.tripPlan.searchedCity;
  const { user } = useContext(AuthContext);


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
    // eslint-disable-next-line
  }, []); 


  const handleSave = async () => {
    try {
      const tripPlan = {
        ...newTripPlan,
        userId: user._id // Agregar ID de usuario al plan de viaje
      };
      await tripPlanService.createTrip(tripPlan);
      console.log('Trip plan saved!');
      toast.success('Trip plan saved!'); 
      navigate('/trip/mis-planes');
    } catch (error) {
      console.error(error);
      toast.error('Error saving trip plan. Please try again later.'); 
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
       <div>
   {loading && <Loading />}
  {!loading && (
    <span className="leftArrow-goBack" onClick={() => navigate(-2)}>
      <FaArrowLeft />
    </span>
  )}
      {!loading && myTrip && (
        <div className="tripPlanDetail-card">
          <div className="tripPlan-card">
            <h2>{cityName}</h2>
            <img src={itineraryPic} alt={cityName} />    
            <div className='trip-data'>
              <p>¡Bienvenido a tu plan de actividades! De acuerdo a tus preferencias, el viaje tendrá una duración de {myTrip.tripPlan.tripDuration} día(s), con un total de {myTrip.tripPlan.numTravellers} viajero(s). Estás planeando viajar en {monthNames[myTrip.tripPlan.monthOfTrip]} y disfrutar de un viaje {myTrip.tripPlan.tripType}. Además, tu presupuesto para este viaje es de €{myTrip.tripPlan.budget}. ¡A disfrutar de las aventuras que te esperan!</p>
            </div>
          </div>
          <div className='activities-plan'>
              {myTrip.days.map((day, index) => (
                <div key={index} className="day">
                  {`${day.name}`.toUpperCase()}
                  <img className='dayPicture' src={day.picture} alt={day.name} />
                  <ul className='activityDayList'>
                    {day.activities.map((activity, ind) => (
                      <li key={ind} className="activity">
                        <div className="activity-name">{activity.name}</div>
                        <div className="activity-description">{activity.description}</div>
                        <div className="activity-duration">{activity.duration}</div>
                      </li>              
                    ))}
                  </ul>
                </div>
              ))}
          </div>
    <div className='cityOverview-btns'>
          <button onClick={handleSave}>Guardar Plan</button>
          <button onClick={handleGoBack}>Volver</button>
          </div>
    </div>
  )}
  <div className='cityOverview-error'>
  {error && <p>Error al cargar los datos del plan de viaje.</p>}
  </div>
  </div>
  );
}

export default TripPlan;




