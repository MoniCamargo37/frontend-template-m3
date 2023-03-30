import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// import tripPlanService from '../services/tripPlanService';
// import axios from 'axios';

export default function Planning() {
  const [destino, setDestino] = useState('');
  const [numPasajeros, setNumPasajeros] = useState(1);
  const [presupuesto, setPresupuesto] = useState(300);
  const [diasViaje, setDiasViaje] = useState(1);
  const [mesViaje, setMesViaje] = useState('');
  const [tipoViaje, setTipoViaje] = useState('amigos');
  const navigate = useNavigate();

  const handleNumPasajerosChange = (event) => {
    setNumPasajeros(event.target.value);
  };

  const handleDiasViajeChange = (event) => {
    setDiasViaje(event.target.value);
  };

  const handleMesViajeChange = (event) => {
    setMesViaje(event.target.value);
  };

  const handlePresupuestoChange = (event) => {
    setPresupuesto(event.target.value);
  };

  const handleTipoViajeChange = (event) => {
    setTipoViaje(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!destino || numPasajeros <= 0 || diasViaje <= 0 || diasViaje > 7 || presupuesto < 100) {
      return;
    }

    const formData = {
      city: destino,
      tripDuration: diasViaje,
      numTravellers: numPasajeros,
      monthOfTrip: mesViaje,
      tripType: tipoViaje,
      budget: presupuesto
    };

    try {
      const response = await fetch('/api/trip-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to save trip plan.');
      }

      const data = await response.json();

      navigate('/trip-results', { state: { tripPlan: data } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <div className='planning-card'>
    <form className='formTrip-card' onSubmit={handleSubmit}>
      <label htmlFor="destino">¿Dónde quieres viajar?</label>
      <input type="text" value={destino} onChange={(event) => setDestino(event.target.value)} className="destino-input"/>
      <br />
      <label>
        ¿Cuántas viajeros?
        <input type="number" value={numPasajeros} onChange={handleNumPasajerosChange} className="daysTrip-input" />
      </label>
      <br />
      <label>
        ¿Cuántos días quieres viajar?
        <input type="number" min="1" max="7" value={diasViaje} onChange={handleDiasViajeChange} className="daysTrip-input"/>
      </label>
      <br />
      <label>
  ¿En qué mes quieres viajar?
  <select value={mesViaje} onChange={handleMesViajeChange} className="month-select">
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
  <select value={tipoViaje} onChange={handleTipoViajeChange} className="tripType-select">
    <option value="amigos">Viaje con amigos</option>
    <option value="niños">Viaje con niños</option>
    <option value="pareja">Viaje en pareja</option>
    <option value="mayores">Viaje para mayores</option>
  </select>
</label>
<label>
  ¿Cuál es tu Presupuesto?
  <input type="range" min="300" max="20000" value={presupuesto} onChange={handlePresupuestoChange} className="slider-input" />
  <input type="text" value={presupuesto} onChange={(event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 300 && value <= 20000) {
      setPresupuesto(value);
    }
  }} onBlur={(event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 300 && value <= 20000) {
      setPresupuesto(value);
    }
  }} className="budget-input" />
</label>
<Link to="/plan-de-viaje"><button>Planificar viaje</button></Link>
</form>
</div> 
);
}
