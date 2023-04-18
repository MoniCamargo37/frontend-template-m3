import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tripPlanService from '../services/tripPlanService';

function PlanDetails() {
  const { planId } = useParams(); 
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTrip = async () => {
      try {
        const response = await tripPlanService.getTrip(planId); 
        setLoading(false);
        setPlan(response);
      } catch (error) {
        console.error(error)
        setLoading(false);
        setError(true);
      }
    };

    getTrip();
  }, [planId]); 

  return (
    <div className='trip-details'>
      {loading && <p>Loading...</p>}
      {!loading && plan && (
        <div>
          <h2>{plan.cityName}</h2>
          <div className='days'>
            {plan.days && plan.days.map(day => (
              <div className='day' key={day.id}>
                <h3>Día {day.id}</h3>
                <div className='activities'>
                  {day.activities && day.activities.map(activity => (
                    <div className='activity' key={activity.id}>
                      <p>{activity.name}</p>
                      {activity.description && <p>{activity.description}</p>}
                      {activity.duration && <p>Duración: {activity.duration} horas</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && <p>Algo salió mal. No se pudo encontrar tu plan de viaje.</p>}
    </div>
  );
}

export default PlanDetails;






