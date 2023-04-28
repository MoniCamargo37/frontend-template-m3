import React, {useContext,  useRef } from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Logo from '../../images/Tripfy (3).png';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function Navbar() {
  const { isLoggedIn,  logOutUser } = useContext(AuthContext); 
  const navRef = useRef(null);
  const navigate = useNavigate();

return (
  <div className='nav-container'>
    <div className="nav-menu" ref={navRef}>
        <NavLink className="nav_logo" to="/">
          <img src={Logo} alt="logoTipo" />
        </NavLink> 
      <ul className="nav">
        <li><NavLink className="nav_link" to="/">Inicio</NavLink></li>
        <li><NavLink className="nav_link" to="/trip/mis-planes" >Mis Planes</NavLink></li>
        {/* {user && <p>Hello {user.username}</p> } */}
        <li><NavLink className="nav_link" to="/acerca">Acerca de Trippo</NavLink></li>
        <li><NavLink className="nav_link" to="/como-funciona">Cómo funciona</NavLink></li>
        {isLoggedIn && <li><NavLink className="nav_link" to="/profile">Perfil</NavLink></li>}
      </ul>
      <div className="nav_btn">
        {!isLoggedIn && <li><NavLink  className="nav_item" to="/login">Iniciar sesión</NavLink></li>}    
        {isLoggedIn &&  <li><a href="/" className="nav_item" onClick={() => {logOutUser(); navigate('/');}}>Cerrar sesión</a></li>} 
      </div>
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
               <div className="nav_btn">
        {!isLoggedIn && <li><NavLink  className="nav_item" to="/login">Iniciar sesión</NavLink></li>}
        {/* {isLoggedIn && <li><a className="nav_item" href="/" onClick={() => {logOutUser(); navigate('/');}}>Cerrar sesión</a></li> */}
        {/* <li><button onClick={() => navigate(-1)}>Go back</button></li> PARA MOBILE */}
      </div>
        </div>
      </div>
    </div>
  </div>
);
}






