import React, { useEffect, useState } from "react";
import "../styles/MyTripsStyles.css";
import "../styles/TripItineraryStyle.css";
import tripPlanService from "../services/tripPlanService";
import { FaAngleDown } from 'react-icons/fa';
import toast from 'react-hot-toast';

function TripItineraryComponent({ plan, handleDelete }) {
  const months = [
    { number: '1', name: 'Enero' },
    { number: '2', name: 'Febrero' },
    { number: '3', name: 'Marzo' },
    { number: '4', name: 'Abril' },
    { number: '5', name: 'Mayo' },
    { number: '6', name: 'Junio' },
    { number: '7', name: 'Julio' },
    { number: '8', name: 'Agosto' },
    { number: '9', name: 'Septiembre' },
    { number: '10', name: 'Octubre' },
    { number: '11', name: 'Noviembre' },
    { number: '12', name: 'Diciembre' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Tu plan de viaje");
  const [numTravellers, setNumTravellers] = useState(plan.numTravellers);
  const [monthName, ] = useState(months.find(m => m.number === plan.monthOfTrip).name);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showButtons,] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
 
  const handleCollapse = () => {
    if (!isEditing) { 
      setIsOpen(false);
    }
  };

  const handleEdit = () => {
    setName(plan.name);
    setNumTravellers(plan.numTravellers);
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || name.trim() === '') {
      setName(plan.name);
      toast.error('El nombre del plan no puede estar vacío', {
        className: 'toast-error-myTrips'});
      return;
    }
    if (numTravellers < 1) {
      setNumTravellers(plan.numTravellers);
      toast.error('El número de viajeros debe ser mayor o igual a 1', {
        className: 'toast-error-myTrips'
      });
      return;
    }
    setIsEditing(false);
    const updatedPlan = {name: name, numTravellers: numTravellers};
    await tripPlanService.editTrip(plan._id, updatedPlan);
    plan.name = name;
    plan.numTravellers = numTravellers;
    setIsOpen(false); 
  };


  const handleCancel = () => {
    setIsEditing(false);
    setName(plan.name);
    setNumTravellers(plan.numTravellers);
    setIsOpen(false); 
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
        <div className="monthName">{monthName}</div> 
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
                <button className='tripNamechange-btn' type="submit">Guardar</button>
                <button className='tripNamechange-btn' type="button" onClick={handleCancel}>Cancelar</button> 
              </form>
            </div>
          ) : (
            <>
              <div className="planData">
                <div className="infoPlanData">
                  Plan: <strong> {name}</strong>
                </div>
                <div className="infoPlanData">
                  Viajeros: <strong>{numTravellers}</strong>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {!isEditing && <FaAngleDown className={`toggleIcon ${isOpen ? 'toggleIconRotate' : ''}`} />}
      {showButtons && !isEditing && (
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
      )}
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






