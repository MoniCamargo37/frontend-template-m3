import React from 'react';
import { FaGlobe, FaSuitcase, FaMicrophone, FaInfoCircle, FaUser } from 'react-icons/fa';

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
        <a href="/trip/mis-planes">
          <div className="icon-button">
            <FaSuitcase />
            <span>Mis Planes</span>
          </div>
        </a>
        <a href="/novedad">
        <div className="icon-button-circle">
          <div className="icon-button-micro">
            <FaMicrophone />
          </div>
          </div>
        </a>
        <a href="/como-funciona">
  <div className="icon-button">
    <FaInfoCircle />
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
    </div>
  );
}

export default Footer;



