import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import tripPlanService from '../../services/tripPlanService';
import ButtonsCard from '../../components/ButtonsCard';
import TripPlan from '../../components/TripItineraryComponent';
import { useAuth } from '../../hooks/useAuth';
import ImageRio from '../../images/rio-de-janeiro.jpg';
import "../../styles/MyTripsStyles.css";

function MyTrips() {
  const [tripPlans, setTripPlans] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useAuth();

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

  // const handleDelete = async (tripId) => {
  //   try {
  //     const confirmed = window.confirm('Are you sure you want to delete this trip plan?');
  //     if (confirmed) {
  //      await tripPlanService.deleteTrip(tripId);
  //      setTripPlans(tripPlans.filter((plan) => plan._id !== tripId));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDelete = async (tripId) => {
    try {
      const confirmed = await toast.promise(
        // Promesa que se resolverá o rechazará en función de la acción del usuario
        new Promise((resolve, reject) => {
          const confirmed = window.confirm('Are you sure you want to delete this trip plan?');
          if (confirmed) {
            resolve(tripPlanService.deleteTrip(tripId));
          } else {
            reject('User cancelled the operation.');
          }
        }),
        {
          success: 'Trip plan deleted!',   
          error: 'An error occurred while deleting the trip plan!',
          loading: 'Deleting...', 
        }
      );
      if (confirmed) {
        setTripPlans(tripPlans.filter((plan) => plan._id !== tripId));
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  if (!isLoggedIn) {
    return (
      <div>
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

