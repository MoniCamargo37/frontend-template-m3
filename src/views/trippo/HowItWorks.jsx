import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/CarouselHowItWorks";
import '../../styles/HowItWorksStyles.css';

function HowItWorks() {
  const navigate = useNavigate();
  const handleCityClick = () => {
    navigate('/CityOverview', { state: { city: "Barcelona - Cataluña (España)" } });
  }

  return (
    <div className="trippo-guide">
            <div className="title-text">
              <h1>Trippo, tu  planificador de actividades para viajes.</h1>
              <h2>Aquí podrás encontrar las mejores opciones para disfrutar al máximo tus viajes. ¡Empecemos!</h2>
            </div>
        <div className="main-content">
            <div className="carousel-card">
              <Carousel />
            </div>
              <div className="text-steps">
                <h3>1- Busca tu destino:</h3>
                  <p>
                    Escribe el nombre de la ciudad o selecciona una de las ciudades más buscadas  {" "}
                    <a href="/"> En este Enlace.</a> Nosotros te mostraremos dos fotos del destino y una breve descripción para que puedas conocer un poco más sobre el lugar. Si te interesa, haz clic en {" "}
                    <a href="/cityOverview" onClick={(e) => {e.preventDefault(); handleCityClick()}}>Continuar</a>.
                  </p>
                  <h3>2- Regístrate o accede:</h3>
                  <p>
                    <strong>Regístrate o accede:</strong> Para acceder a la planificación de actividades, necesitas estar registrado. Si ya tienes una cuenta, ingresa tus datos para acceder a tu perfil. Si no, crea una cuenta rápida y sencilla en pocos minutos{" "}
                    <a href="/login">aquí</a>.
                  </p>
                <h3>3- Cuéntanos tus preferencias:</h3>
                  <p>
                    En este paso, nosotros te preguntaremos sobre tus preferencias en cuanto a actividades turísticas. ¿Te gusta la aventura o prefieres un turismo más relajado? ¿Quieres probar la gastronomía local o hacer un recorrido por la historia y la cultura? Cuéntanos todo lo que te gustaría hacer y nosotros te mostraremos un plan personalizado. 
                  </p>
              
                <h3>4- Descubre tu plan de actividades:</h3>
                  <p>
                    En este paso, nosotros te mostraremos un plan personalizado para tu viaje. Te ofreceremos una lista de actividades y lugares turísticos según tus preferencias. Si te gusta el plan, puedes guardarlo en "Mis Viajes" y acceder a él en cualquier momento.
                  </p>
                <h3>5- Comparte, borra o agrega más detalles:</h3>
                  <p>
                    En "Mis Viajes" podrás ver los planes que has guardado. Si quieres compartir tu plan con amigos o familiares, puedes hacerlo en un solo clic. También puedes borrar un plan o agregar más detalles si lo deseas.
                  </p>
               </div>
           </div>
           <div className="title-text">
        <h2>¡Listo! Con nuestra app planificador de actividades para viajes, estarás preparado para vivir una experiencia única</h2>
        </div>
    </div>
  ); 
}

export default HowItWorks;

