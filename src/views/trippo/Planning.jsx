import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaArrowLeft,FaPlus, FaMinus } from 'react-icons/fa';
import "./planning.css";

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
  const [searchedCity] = useState(
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

  const handleTipoViajeChange = (event) => {
    setTipoViaje(event.target.value);
  };

  const incrementNumPasajeros = () => {
    if (numPasajeros < 10) {
      setNumPasajeros(numPasajeros + 1);
    }
  };

  const decrementNumPasajeros = () => {
    if (numPasajeros > 1) {
      setNumPasajeros(numPasajeros - 1);
    }
  };

  const travelDaysIncrement = () => {
    if (diasViaje < 7) {
      setDiasViaje(diasViaje + 1);
    }
  };

  const travelDaysDecrement = () => {
    if (diasViaje > 1) {
      setDiasViaje(diasViaje - 1);
    }
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
      <div>
        <span className="leftArrow-goBack" onClick={() => navigate(-1)}>
    <FaArrowLeft />
        </span> 
    <div className="planning-card">
      <h2>
        ¡Dinos cómo quieres vivir tu viaje y te organizamos el mejor plan!
      </h2>
      <form className="formTrip-card">
        <div className="form-group">
          <label htmlFor="destino-input">¿Ciudad seleccionada?</label>
          <input id="destino-input" type="text"  value={cityName.split(" -")[0]} onChange={(event) => setCityName(event.target.value)}
           className="destino-input" />
        </div>
        <div className="form-group">
          <label htmlFor="mes-viaje">¿En qué mes quieres viajar?</label>
          <select id="mes-viaje"  value={mesViaje} onChange={handleMesViajeChange}  className="month-select" >
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
        </div>
        <div className="form-group">
          <label htmlFor="tipo-viaje"> ¿Qué tipo de viaje deseas realizar? </label>
          <select id="tipo-viaje" value={tipoViaje}  onChange={handleTipoViajeChange} className="tripType-select" >
            <option value="aventurero">Aventurero</option>
            <option value="relajado">Relajado</option>
            <option value="romantico">Romántico</option>
            <option value="familiar">Familiar</option>
          </select>
        </div>
        <div className="form-group">
           <label htmlFor="num-pasajeros">¿Cuántos viajeros?</label>
          <div className="incdecControl">
            <button type="button" onClick={decrementNumPasajeros}><FaMinus /></button>
            <span id="num-pasajeros">{numPasajeros}</span>
            <button type="button" onClick={incrementNumPasajeros}><FaPlus /></button>
          </div>
        </div>
        <div className="form-group">
           <label htmlFor="num-dias">¿Cuántos días quieres viajar?</label>
          <div className="travelDaysControl">
            <button type="button"  onClick={travelDaysDecrement}><FaMinus /></button>
            <span id="num-pasajeros">{diasViaje}</span>
            <button type="button" onClick={travelDaysIncrement}><FaPlus /></button>
          </div>
        </div>
        <div className="form-group">
            <label htmlFor="presupuesto-input">¿Qué presupuesto?</label>
            <input id="presupuesto-input" type="range" min="100" max="10000" step="50" value={presupuesto} onChange={(event) => setPresupuesto(parseInt(event.target.value))}
               className="slider-input"/>
            <input type="number" value={presupuesto} min="100" max="10000" step="50" onChange={(event) => setPresupuesto(parseInt(event.target.value))}
               className="budget-input"/>
             {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </div>
            {authContext.user ? (
            <button onClick={handleSubmit}>Planificar viaje</button>
        ) : (
          <Link to="/login"><button >Inicia sesión para planificar</button> </Link>
        )}
      </form>
    </div>
    </div>
  );
}

