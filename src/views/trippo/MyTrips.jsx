import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import tripPlanService from '../../services/tripPlanService';
import { useAuth } from '../../hooks/useAuth';

function MyTrips() {
  const navigate = useNavigate();
  const [tripPlans, setTripPlans] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); 
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
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);


  const handleView = (plan) => {
    setSelectedPlan(plan); // Establece el plan de viaje seleccionado al hacer clic en el botón "Ver detalles"
    console.log("El trippo: ", plan);
    navigate(`/trip/mis-viajes/${plan._id}`); // Navega a la página de detalles del plan de viaje correspondiente
  };

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

  return (
    <div className='my-trips'>
      <h1>Mis itinerarios viajes</h1>
      <ul>
        {tripPlans.map((plan) => (
          <li key={plan._id}>
            <div>{plan.city}</div>
            <div className='cityOverview-btns'>
              <button onClick={() => handleView(plan)}>Ver detalles</button>
              <button onClick={() => handleDelete(plan._id)}>Eliminar</button>
            </div>
            {selectedPlan && selectedPlan._id === plan._id && (
              <div>
                <p>{selectedPlan.days}</p>
                {/* ...etc. */}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyTrips;