import React, { useEffect, useState } from "react";
import "../styles/MyTripsStyles.css";
import "../styles/TripItineraryStyle.css";
import tripPlanService from "../services/tripPlanService";

function TripItineraryComponent({ plan, handleDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Tu plan de viaje");
  const [numTravellers, setNumTravellers] = useState(plan.numTravellers);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(false);
    await tripPlanService.editTrip(plan._id, {name: name, numTravellers: numTravellers});
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
            {plan.city.split(' -')[0]}
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <label>
                  Nombre:
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                  Número de viajeros:
                  <input type="number" value={numTravellers} onChange={(e) => setNumTravellers(e.target.value)} />
                </label>
                <br />
                <button type="submit">Guardar</button>
              </form>
            ) : (
              <>
                <input type="text" value={name} readOnly />
                <input type="number" value={numTravellers} readOnly />
              </>
            )}
        </div>
        <div className="deleteMyTrip-btns">
            <button
              onClick={handleEdit}
              style={{ marginRight: "10px" }}
            >
              Editar
            </button>
            <button
              onClick={() => {
                  handleDelete(plan._id);
                  setIsOpen(false);
              }}
            >
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

