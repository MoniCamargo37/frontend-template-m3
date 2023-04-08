import { useState,useContext, useEffect } from "react";
import { useNavigate, useLocation, Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Planning() {
  const [numPasajeros, setNumPasajeros] = useState(1);
  const [presupuesto, setPresupuesto] = useState(100);
  const [diasViaje, setDiasViaje] = useState(1);
  const [mesViaje, setMesViaje] = useState("1");
  const [tipoViaje, setTipoViaje] = useState("aventurero");
  const [setCityName] = useState("");
  const navigate = useNavigate();
  const [selectedCityName, setSelectedCityName] = useState("");
  const location = useLocation();
  const { cityName } = location.state;
  const [searchedCity, setSearchedCity] = useState(
    location.state?.searchedCity
  );
  const authContext = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (location.state && location.state.cityName) {
      setSelectedCityName(location.state.cityName);
    }
  }, [location.state]);



  function handleMesViajeChange(event) {
    const mesSeleccionado = event.target.value.toString();
    setMesViaje(mesSeleccionado);
  }

  const handlePresupuestoChange = (event) => {
    setPresupuesto(event.target.value);
  };

  const handleTipoViajeChange = (event) => {
    setTipoViaje(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !selectedCityName ||
      !selectedCityName.trim() ||
      numPasajeros <= 0 ||
      diasViaje <= 0 ||
      diasViaje > 7 ||
      presupuesto < 100
    ) {
      setErrorMsg("Por favor, completa todos los campos correctamente.");
      return;
    }

    if (
      (tipoViaje === "romantico" || tipoViaje === "familiar") &&
      numPasajeros < 2
    ) {
      setErrorMsg(
        "El número de viajeros debe ser igual o mayor a 2 para este tipo de viaje."
      );
      return;
    }

    const formData = {
      city: selectedCityName,
      tripDuration: diasViaje,
      numTravellers: numPasajeros,
      monthOfTrip: mesViaje,
      tripType: tipoViaje,
      budget: presupuesto,
      searchedCity,
    };

    if (
      searchedCity &&
      searchedCity.itineraryPic &&
      searchedCity.itineraryPic.length > 0
    ) {
      navigate("/plan-de-viaje", {
        state: {
          tripPlan: formData,
          cityName: selectedCityName,
          itineraryPic: searchedCity.itineraryPic,
        },
      });
    } else {
      navigate("/plan-de-viaje", {
        state: { tripPlan: formData, cityName: selectedCityName },
      });
    }
  };

  return (
    <div className="planning-card">
      <h2>¡Dinos cómo quieres vivir tu viaje y te organizamos el mejor plan!</h2>
      <form className="formTrip-card" onSubmit={handleSubmit}>
        <label>¿Ciudad Seleccionada</label>
        {/* <p>Ciudad Seleccionada: {cityName}</p> */}
        {/* <input type="text" value={cityName} onChange={(event) => setDestino(event.target.value)} className="destino-input"/> */}
        <input
          type="text"
          value={cityName.split(' -')[0]}
          onChange={(event) => setCityName(event.target.value)}
          className="destino-input"
        />
        <br />

        
        <br />
        <label>
          ¿En qué mes quieres viajar?
          <select
            value={mesViaje}
            onChange={handleMesViajeChange}
            className="month-select"
          >
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </label>
        <label>
          ¿Qué tipo de viaje deseas realizar?
          <select
            value={tipoViaje}
            onChange={handleTipoViajeChange}
            className="tripType-select"
          >
            <option value="aventurero">Aventurero</option>
            <option value="relajado">Relajado</option>
            <option value="romantico">Romantico</option>
            <option value="familiar">Familiar</option>
          </select>
        </label>
        <label>
          ¿Cuál es tu Presupuesto?
          <input
            type="range"
            min="100"
            max="10000"
            value={presupuesto}
            onChange={handlePresupuestoChange}
            className="slider-input"
          />
          <input
            type="text"
            value={presupuesto}
            onChange={(event) => {
              const value = parseInt(event.target.value);
              if (!isNaN(value) && value >= 100 && value <= 10000) {
                setPresupuesto(value);
              }
            }}
            onBlur={(event) => {
              const value = parseInt(event.target.value);
              if (!isNaN(value) && value >= 300 && value <= 20000) {
                setPresupuesto(value);
              }
            }}
            className="budget-input"
          />
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </label>
        {authContext.user ? (
  <button onClick={handleSubmit}>Planificar viaje</button>
) : (
  <Link to="/signup">
  <button>Inicia sesión para planificar un viaje</button>
</Link>
)}
      </form>
    </div>
  );
}