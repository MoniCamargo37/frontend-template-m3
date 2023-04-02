import React from 'react';

function CityOverview({ cityName, country, description, numSearches, itineraryPic, destinationPics }) {
  return (
    <div>
      <h2>{cityName}, {country}</h2>
      <img src={itineraryPic} alt={cityName} />
      <p>{description}</p>
      <p>{numSearches} searches</p>
      {destinationPics.map((pic, index) => (
        <img key={index} src={pic} alt={`${cityName} destination ${index}`} />
      ))}
    </div>
  );
}

export default CityOverview;
