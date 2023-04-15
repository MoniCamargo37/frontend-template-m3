import React, { useState, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import tripPlanService from '../../services/tripPlanService';
import { FaArrowLeft } from 'react-icons/fa';
import ButtonsCard from '../../components/ButtonsCard';
import TripPlan from '../../components/TripItineraryComponent';
import { useAuth } from '../../hooks/useAuth';
import ImageRio from '../../images/rio-de-janeiro.jpg';
import "../../styles/MyTripsStyles.css";

function MyTrips() {
  const [tripPlans, setTripPlans] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const getAllTrips = async () => {
    try {
      const plans = await tripPlanService.getAllTrips();
      setTripPlans(plans);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTrips();
    if (user)
      setIsLoggedIn(true);
  }, [user]);

  const handleDelete = async (tripId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this trip plan?');
      if (confirmed) {
        await tripPlanService.deleteTrip(tripId);
        setTripPlans(tripPlans.filter((plan) => plan._id !== tripId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
      <span className="leftArrow-goBack" onClick={() => navigate(-1)}>
      <FaArrowLeft />
    </span> 
      <div className='errorMsn-profile'>
        <h1>Mis itinerarios viajes</h1>
        <p>Sin inicio de sesión no hay paraíso... 🌊 🌊</p>
            <img src={ImageRio} alt="rio-de-janeiro" />
        <div className='myTrips-OffModebtns'>
          <Link to="/login"><button>Iniciar sesión</button></Link>
          <Link to="/signup"><button>Crear cuenta</button></Link>
        </div>
      </div>
       </div>
    );
  }

return (
  <div>
    <span className="leftArrow-goBack" onClick={() => navigate(-1)}>
      <FaArrowLeft />
    </span> 
    <div className='my-trips'>
      <h1>Mis itinerarios de viajes</h1>
      <ul>
        {tripPlans.map((plan) => (
          <TripPlan key={plan._id} plan={plan} handleDelete={handleDelete} />
        ))}
      </ul>
      <ButtonsCard/>
    </div>
  </div>
);
}
export default MyTrips;