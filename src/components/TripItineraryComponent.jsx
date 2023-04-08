import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/TripItineraryStyle.css";

function TripItineraryComponent({ plan, handleDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    console.log("Hemos hecho click en el botón");
    setIsOpen(!isOpen);
  };

  const handleCollapse = () => {
    setIsOpen(false);
  };

  return (
    <li key={plan._id} className="listOfTripCards">
      <div className="tripCardHeader" tabIndex="0" onClick={handleToggle} onBlur={handleCollapse}>
        <div>
            {plan.city}
        </div>
        <div className="cityOverview-btns">
            <NavLink
            to={`/trip/mis-viajes/${plan._id}`}
            component="button"
            type="button"
            onClick={handleCollapse}
            >
            Ver detalles
            </NavLink>
            <button
            onClick={() => {
                handleDelete(plan._id);
                handleCollapse();
            }}
            >
            Eliminar
            </button>
        </div>
      </div>
      {isOpen && (
        <div className="tripCardDayList">
          {plan.days.map((day) => (
            <div key={day._id}>
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