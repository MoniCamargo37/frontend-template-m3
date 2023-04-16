import React, { useEffect, useState } from "react";
import "../styles/MyTripsStyles.css";
import "../styles/TripItineraryStyle.css";
import tripPlanService from "../services/tripPlanService";
import { FaAngleDown } from 'react-icons/fa';
import toast from 'react-hot-toast';

function TripItineraryComponent({ plan, handleDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Tu plan de viaje");
  const [numTravellers, setNumTravellers] = useState(plan.numTravellers);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false); // nuevo estado para cancelar
  const [planCopy, setPlanCopy] = useState(null); // nuevo estado para guardar la copia del plan original


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
 
  const handleCollapse = () => {
    if (!isEditing && !isCancelling) { // actualiza el estado sólo si no está cancelando
      setIsOpen(false);
    }
  };

  const handleEdit = () => {
    setName(plan.name);
    setNumTravellers(plan.numTravellers);
    setIsEditing(true);
    setIsOpen(true);
    setPlanCopy({...plan}); // guarda una copia del plan original
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!name || name.trim() === '') {
  //     toast.error('El nombre del plan no puede estar vacío');
  //     return;
  //   }
  //   if (numTravellers < 1) {
  //     toast.error('El número de viajeros debe ser mayor o igual a 1');
  //     return;
  //   }
  //   setIsEditing(false);
  //   await tripPlanService.editTrip(plan._id, {name: name, numTravellers: numTravellers});
  //   setIsOpen(false); // cierra la ventana después de guardar
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || name.trim() === '') {
      toast.error('El nombre del plan no puede estar vacío', {
        className: 'toast-error-myTrips'});
      return;
    }
    if (numTravellers < 1) {
      toast.error('El número de viajeros debe ser mayor o igual a 1', {
        className: 'toast-error-myTrips'
      });
      return;
    }
    setIsEditing(false);
    const updatedPlan = {name: name, numTravellers: numTravellers};
    await tripPlanService.editTrip(plan._id, updatedPlan);
    setPlanCopy(updatedPlan); // actualiza la copia del plan con los datos actualizados
    setIsOpen(false); // cierra la ventana después de guardar
  };
  

  const handleCancel = () => {
    setIsEditing(false);
    setIsCancelling(true); // actualiza el estado para cancelar
    setName(planCopy.name); // restaura el nombre del plan original
    setNumTravellers(planCopy.numTravellers); // restaura el número de viajeros del plan original
    setIsOpen(false); // cierra la ventana después de cancelar
  };
  

  useEffect(() => {
    if(loading) {
      if(plan.name && plan.name !== '')
        setName(plan.name);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);    

  return (
    <li key={plan._id} className="listOfTripCards">     
      <div className="tripCardHeader" tabIndex="0" onClick={handleToggle} onBlur={handleCollapse}>
          <div className="cityName-myTrips">
            <div className="cityName">{plan.city.split(' -')[0]}</div>
            <div className="planDatachange">
              {isEditing ? (
                <div className="form-tripNamechange">
                <form onSubmit={handleSubmit}>
                  <label>
                    Nombre del plan:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </label>
                  <br />
                  <label>
                    Número de viajeros:
                    <input type="number" value={numTravellers} onChange={(e) => setNumTravellers(e.target.value)} />
                  </label>
                  <br />
                  <button className='tripNamechange' type="submit">Guardar</button>
                  <button className='tripNamechange'  type="button" onClick={handleCancel}>Cancelar</button> 
                </form>
                </div>
              ) : (
                <>
                  <div className="planData">
                  <h2>Plan: <p> {name}</p></h2>
                  <h2> Viajeros: <p>{numTravellers}</p></h2>
               </div>
             
                </>
              )}
            </div>
          </div>
          {!isEditing && <FaAngleDown className="toggleIcon" />}
          <div className="deleteMyTrip-btns">
            <button onClick={handleEdit}>
              Editar
            </button>
            <button onClick={() => {
              handleDelete(plan._id);
              setIsOpen(false);
            }}>
              Eliminar
            </button>
          </div>
        </div>
  {isOpen && !isEditing && (
    <div className="tripCardDayList">
      {plan.days.map((day) => (
        <div className="day-list" key={day._id}>
          <h3>{day.name}</h3>
          <img src={day.picture} alt={day.name} />
          <ul>
            {day.activities.map((activity) => (
              <li key={activity._id}>
                <h4>{activity.name}</h4>
                <p>{activity.description}</p>
                <p>{activity.duration}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )}
</li>
);
}

export default TripItineraryComponent;

