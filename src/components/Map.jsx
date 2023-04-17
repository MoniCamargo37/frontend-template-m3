import React, { useEffect, useState } from "react";
import BingMapsReact from "bingmaps-react";
import accessService from "../services/accessService";
import '../styles/mapStyle.css';

const searchALocation = async (citySearched) => {
  let accessKey = await accessService.getAccess();
  const response = await fetch(
    `https://dev.virtualearth.net/REST/v1/Locations?q=${citySearched}&c=es-ES&key=${accessKey.key}`
  );
  const data = await response.json();
  return data.resourceSets[0];
};  

const Map = (props) => {
  const city = props.city;

  const [isSearchFinished, setIsSearchFinished] = useState(false);
  const [accessKey, setAccessKey] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      const accessKeyData = await accessService.getAccess();
      setAccessKey(accessKeyData.key);

      const response = await fetch(
        `https://dev.virtualearth.net/REST/v1/Locations?q=${city.split(',')[0]}&c=es-ES&key=${accessKeyData.key}`
      );
      const data = await response.json();

      const myCoordinates = data.resourceSets[0].resources[0].geocodePoints[0].coordinates;
      setLocation({latitude: myCoordinates[0], longitude: myCoordinates[1]});
      setIsSearchFinished(true);
    }
    fetchMapData();
  }, [city]);

  if (!isSearchFinished || !location || !accessKey) {
    return (
      <>
        Map is loading...
      </>
    );
  }

  return (
    <div className="mapDimensions">
      <BingMapsReact
        bingMapsKey={accessKey}
        mapOptions={{
          navigationBarMode: "square",
        }}
        viewOptions={{
          center: { latitude: location.latitude, longitude: location.longitude },
          mapTypeId: "road",
        }}
      />
    </div>
  );
};


export { Map, searchALocation };



