import React, { useState } from "react";
import "../styles/MyTripsStyles.css";


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
        <div className="cityName-myTrips">
            {plan.city}
        </div>
        <p> Ver más detalles</p>
        <div className="deleteMyTrip-btns">
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