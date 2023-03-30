import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tripPlanService from '../../services/tripPlanService';

function TripPlan() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [tripPlan, setTripPlan] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Define getTripFromBackend function
  const getTripFromBackend = async (tripId) => {
    const response = await tripPlanService.getTrip(tripId);
    return response.data;
  };

  // Define getTripFromOpenAI function with parameters
  const getTripFromOpenAI = async (city, tripDuration, numTravellers, monthOfTrip, tripType, budget) => {
    // Call OpenAI API with parameters
    const response = await fetch(`https://api.openai.com/v1/trip-planner?city=${city}&duration=${tripDuration}&travellers=${numTravellers}&month=${monthOfTrip}&type=${tripType}&budget=${budget}`);
    const data = await response.json();
    return data;
  };

  // Define variables used in getTripFromOpenAI
  const city = "New York";
  const tripDuration = 5;
  const numTravellers = 2;
  const monthOfTrip = "June";
  const tripType = "Adventure";
  const budget = 1000;

  useEffect(() => {
    async function getTrip() {
      try {
        const response = await getTripFromBackend(tripId);
        if (response) {
          setTripPlan(response);
          setLoading(false);
          setError(false);
        } else {
          const openaiResponse = await getTripFromOpenAI(city, tripDuration, numTravellers, monthOfTrip, tripType, budget);
          setTripPlan(openaiResponse);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    }

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

  const handleShareByEmail = async () => {
    try {
      // Here you can add functionality to share the trip plan by email
      const emailBody = `Check out my trip plan to ${tripPlan.city}! 
        Duration: ${tripPlan.tripDuration} days
        Number of travelers: ${tripPlan.numTravellers}
        Month of trip: ${tripPlan.monthOfTrip}
        Trip type: ${tripPlan.tripType}
        Budget: ${tripPlan.budget}`;
      const emailSubject = `Trip Plan to ${tripPlan.city}`;
      window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    } catch (error) {
      console.error(error);
    }
  };

  const handleShareByLink = async () => {
    try {
      // Here you can add functionality to generate a unique link to share the trip plan
      const link = `https://example.com/trip-plan/${tripId}`;
      window.prompt("Copy the link below to share your trip plan:", link);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };


  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && tripPlan && (
        <div className="tripPlanDetail-card">
          <h1>Tu plan de viaje a {tripPlan.city}:</h1>
          <p>Duración del viaje: {tripPlan.tripDuration} days</p>
          <p>Número de viajeros: {tripPlan.numTravellers}</p>
          <p>Mes de viaje: {tripPlan.monthOfTrip}</p>
          <p>Tipo de viaje: {tripPlan.tripType}</p>
          <p>Presupuesto: ${tripPlan.budget}</p>
          <button onClick={handleSave}>Save Trip Plan</button>
          <button onClick={handleShareByEmail}>Share Trip Plan by Email</button>
          <button onClick={handleShareByLink}>Share Trip Plan by Link</button>
          <button onClick={handleDelete}>Delete Trip Plan</button>
          <button onClick={handleGoBack}>Go Back</button>
    </div>
  )}
  {error && <p>Failed to load trip plan data.</p>}
</>
  );
}

export default TripPlan;