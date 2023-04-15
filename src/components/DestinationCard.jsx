const DestinationCard = ({ destination }) => {
    if (!destination || !destination.image || !destination.name || !destination.description || !destination.location || !destination.rating) {
      return null;
    }
    
    return (
         <div className="destination-card">
        <img src={destination.image} alt={destination.name} />
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        <p>
          <span className="location-icon">📍</span>
          {destination.location}
        </p>
        <p>
          <span className="star-icon orange-star">★</span> <span className="rating">{destination.rating}</span>
        </p>
      </div>
    );
  };
  
  export default DestinationCard;