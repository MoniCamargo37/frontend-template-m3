import React, { useEffect, useState } from "react";
import BingMapsReact from "bingmaps-react";

export const searchALocation = async (citySearched) => {
  const response = await fetch(
    `https://dev.virtualearth.net/REST/v1/Locations?locality=${citySearched}&key=${process.env.REACT_APP_BING_MAPS_KEY}`
  );
  const data = await response.json();
  return data.resourceSets[0];
}

const Map = (props) => {
  const [city, setCity] = useState(props.city);
  const [formattedCity, setFormattedCity] = useState('');
  const [location, setLocation] = useState({
    latitude: 41.360081,
    longitude: -71.058884,
  });

  const getCoordinates = async () => {
    const response = await fetch(
      `https://dev.virtualearth.net/REST/v1/Locations?locality=${city.split(',')[0]}&key=${process.env.REACT_APP_BING_MAPS_KEY}`
    );
    const data = await response.json();
    console.log("La ciudad buscada en el mapa: ", city);
    setFormattedCity(data.resourceSets[0].resources[0].address.formattedAddress);
    const myCoordinates = data.resourceSets[0].resources[0].geocodePoints[0].coordinates;
    setLocation({latitude: myCoordinates[0], longitude: myCoordinates[1]});
  }

  useEffect(() => {
    getCoordinates();
  }, [city]);

  return (
    <BingMapsReact
      bingMapsKey={process.env.REACT_APP_BING_MAPS_KEY}
      height="500px"
      mapOptions={{
        navigationBarMode: "square",
      }}
      width="500px"
      viewOptions={{
        center: { latitude: location.latitude, longitude: location.longitude },
        mapTypeId: "road",
      }}
    />
  );
};

export default Map;