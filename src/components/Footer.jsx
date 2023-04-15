import React from 'react';
import { FaGlobe, FaSuitcase, FaMicrophone, FaQuestion, FaUser } from 'react-icons/fa';

function Footer() {
  return (
    <div>
    <div className="Footer-mobile">
      <div className="Footer-icons">
        <a href="/">
          <div className="icon-button">
            <FaGlobe />
            <span>Inicio</span>
          </div>
        </a>
        <a href="/trip/mis-viajes">
          <div className="icon-button">
            <FaSuitcase />
            <span>Mis Viajes</span>
          </div>
        </a>
        <a href="/trip/planning">
        <div className="icon-button-circle">
          <div className="icon-button-micro">
            <FaMicrophone />
          </div>
          </div>
        </a>
        <a href="/como-funciona">
          <div className="icon-button">
            <FaQuestion />
            <span>Tutorial</span>
          </div>
        </a>
        <a href="/profile">
          <div className="icon-button">
            <FaUser />
            <span>Perfil</span>
          </div>
        </a>
      </div>
      </div>
      {/* <div className="Footer-user">
        <img src="https://via.placeholder.com/50x50" alt="profile" />
        <span>Nombre de Usuario</span>
        <div className="Footer-location">
          <span>Barcelona, España</span>
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default Footer;