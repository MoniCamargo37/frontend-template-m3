import React, {useContext, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from '../images/logo-Trippo.png';
import Picture from '../images/homepic.jpg'
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function Navbar() {
  const { isLoggedIn,  logOutUser } = useContext(AuthContext); 
  const navRef = useRef(null);
  const navigate = useNavigate();



return (
  <div>
  <div className="nav-menu" ref={navRef}>
    <NavLink className="nav_link" to="/">
      <img src={Logo} alt="logoTipo" />
    </NavLink>
    <ul className="nav">
      <li><NavLink className="nav_link" to="/">Inicio</NavLink></li>
      <li><NavLink className="nav_link" to="/trip/mis-viajes" >Mis Viajes</NavLink></li>
      {/* {user && <p>Hello {user.username}</p> } */}
      <li><NavLink className="nav_link" to="/acerca">Acerca de Trippo</NavLink></li>
      <li><NavLink className="nav_link" to="/como-funciona">Cómo funciona</NavLink></li>
      <li><NavLink className="nav_link" to="/colaboradores">Empresas Afiliadas</NavLink></li>
      <li><NavLink className="nav_link" to="/ayuda">Ayuda</NavLink></li>
      {!isLoggedIn && <li><NavLink className="nav_link" to="/login">Login</NavLink></li>}
      {isLoggedIn && <li><NavLink className="nav_link" to="/profile">Perfil</NavLink></li>}
      {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
      <li><button onClick={() => navigate(-1)}>Go back</button></li>
    </ul>
  </div>
    <div className="navbar-mobile">
    <div className="navbar-mobile-left">
      <img src={Logo} alt="logoTipo" />
    </div>
    <div className="navbar-mobile-right">
      <div className="navbar-mobile-location">
        <FaMapMarkerAlt />
        <span>Barcelona, España</span>
      </div>
      <div className="navbar-mobile-profile">
        <img src= {Picture} alt="profile" />
      </div>
    </div>
  </div>
  </div>
);
}

