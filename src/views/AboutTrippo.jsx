import React from "react";
import "../styles/AboutTrippoStyles.css"; 
import { FaPhone, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import TrippoLogo from "../images/Tripfy (3).png"; 

function AboutTrippo() {
  return (
    <div className="about-trippo">
      <img src={TrippoLogo} alt="Logo de Trippo" className="trippo-logo" />
      <div className="trippo-text">
      <h1>Acerca de Trippo Empresa</h1>
      <p>Trippo es una empresa de tecnología fundada en 2023, con la visión de revolucionar la forma en que los viajeros planifican y personalizan sus actividades de viaje.</p>
      <p>Nuestra empresa está a la vanguardia de la tecnología, utilizando la <strong>Inteligencia Artificial</strong> y los algoritmos más avanzados para crear planes de viaje personalizados que se adapten a las preferencias únicas de cada usuario.</p>
      <p>Como líderes en la industria de viajes, nos esforzamos por mantenernos actualizados con las últimas tendencias y tecnologías para ofrecer a nuestros clientes los mejores servicios y soluciones.</p>
      <p>Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto con nosotros a través de nuestro sitio web o redes sociales. ¡Estamos aquí para ayudarte a planificar el viaje de tus sueños!</p>
      <div className="social-icons">
        <a href="tel:+34 658301480"><FaPhone /></a>
        <a href="https://www.instagram.com/trippoapp"><FaInstagram /></a>
        <a href="https://twitter.com/trippoapp"><FaTwitter /></a>
        <a href="https://www.facebook.com/trippoapp"><FaFacebook /></a>
      </div>
      </div>
    </div>
  );
}

export default AboutTrippo;
