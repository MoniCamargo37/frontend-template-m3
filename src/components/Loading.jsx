import loading from "../images/Infinity-1s-200px.gif";
import { useLocation } from "react-router-dom";

function Loading() {
  const location = useLocation();

  let message;
  if (location.pathname === "/CityOverview") {
    message = "Estamos buscando los mejores resultados,¡valdrá la pena la espera!";
  } else {
    message = "Estamos revisando las mejores actividades para que tengas un viaje increíble.😉";
  }

  return (
    <div className="loading-page">
      <img className="loading" src={loading} alt="Loading" />
      <p>{message}</p>
    </div>
  );
}

export default Loading;




