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
      <p>Trippo es una empresa de tecnología fundada en 2021 por Mónica. Nuestra misión es ayudar a los viajeros a planificar y personalizar sus actividades de viaje de manera fácil y eficiente.</p>
      <p>En Trippo, utilizamos la inteligencia artificial para generar planes de viaje personalizados basados en las preferencias del usuario. Además, nos esforzamos por ofrecer una experiencia de usuario sin complicaciones y fácil de usar para todos nuestros usuarios.</p>
      <p>Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto con nosotros a través de nuestro sitio web o redes sociales. ¡Estamos aquí para ayudarte a planificar el viaje de tus sueños!</p>
      <div className="social-icons">
        <a href="tel:+123456789"><FaPhone /></a>
        <a href="https://www.instagram.com/trippoapp"><FaInstagram /></a>
        <a href="https://twitter.com/trippoapp"><FaTwitter /></a>
        <a href="https://www.facebook.com/trippoapp"><FaFacebook /></a>
      </div>
      </div>
    </div>
  );
}

export default AboutTrippo;