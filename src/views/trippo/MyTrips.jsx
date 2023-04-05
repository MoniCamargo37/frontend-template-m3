import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import tripPlanService from '../../services/tripPlanService';
import { useAuth } from '../../hooks/useAuth';

function MyTrips() {
  const navigate = useNavigate();
  const [tripPlans, setTripPlans] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Agregamos el estado para saber si el usuario ha iniciado sesión
  const { user } = useAuth();

  const getAllTrips = async () => {
    try {
      const plans = await tripPlanService.getAllTrips(); // Aquí deberás hacer una llamada a la API para obtener los planes de viaje del usuario
      setTripPlans(plans);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTrips();
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleDelete = async (tripId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this trip plan?');
      if (confirmed) {
        await tripPlanService.deleteTrip(tripId);
        setTripPlans(tripPlans.filter((plan) => plan.id !== tripId)); // Aquí estoy eliminando el plan de viaje de la lista de planes de viaje del usuario en el estado local
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (tripId) => {
    navigate(`/mis-viajes/${tripId}`); // Aquí estás navegando a la página de detalles del plan de viaje correspondiente al hacer clic en el nombre de la ciudad del plan de viaje
  };

  // Si el usuario no ha iniciado sesión, mostramos el mensaje y los botones de inicio de sesión y registro
  if (!isLoggedIn) {
    return (
      <div className='my-trips'>
        <h1>Mis itinerarios viajes</h1>
        <p>Sin inicio de sesión no hay paraíso...</p>
        <div className='cityOverview-btns'>
          <Link to="/login"><button>Iniciar sesión</button></Link>
          <Link to="/signup"><button>Crear cuenta</button></Link>
        </div>
      </div>
    );
  }

  // Si el usuario ha iniciado sesión, mostramos la lista de viajes
  return (
    <div className='my-trips'>
      <h1>Mis itinerarios viajes</h1>
      <ul>
        {tripPlans.map((plan) => (
   <li key={plan._id}>
   <div>{plan.city}</div>
   <div className='cityOverview-btns'>
     <button onClick={() => handleView(plan._id)}>Ver detalles</button>
     <button onClick={() => handleDelete(plan._id)}>Eliminar</button>
   </div>
 </li>
        ))}
      </ul>
    </div>
  );
}

export default MyTrips;

