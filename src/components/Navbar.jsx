import React, {useContext, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, Outlet  } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from '../images/logo-Trippo.png';
import Picture from '../images/homepic.jpg'
import MyTrips from './MyTrips';
import { FaChevronDown, FaMapMarkerAlt, FaChevronUp } from 'react-icons/fa';

export default function Navbar() {
  const { isLoggedIn,  logOutUser } = useContext(AuthContext); 
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const navElement = navRef.current;
    const handleWindowClick = (event) => {
      if (navElement && !navElement.contains(event.target)) {
        setShowMenu(false);
      }
    };
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [navRef]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    console.log('Se hizo clic en el botón de menú');
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  const handleLinkClick = () => {
    console.log('Se hizo clic en el botón de menú',);
    toggleMenu();
  };


return (
  <div>
  <div className="nav-menu" ref={navRef}>
    <NavLink className="nav_link" to="/">
      <img src={Logo} alt="logoTipo" />
    </NavLink>
    <ul className="nav">
      <li><NavLink className="nav_link" to="/">Inicio</NavLink></li>
      <li>
        <button className="nav_link" onMouseEnter={handleMouseEnter} onClick={toggleMenu}>
          Viajar{' '}
          {isMenuOpen ? <FaChevronUp style={{ marginLeft: '5px' }} /> : <FaChevronDown style={{ marginLeft: '5px' }} />}
        </button>
        {showMenu && (
          <div className="menu-container" style={{ top: navRef.current.offsetHeight }} onMouseLeave={handleMouseLeave}>
            <button className="menu-link" onClick={toggleMenu}>Cerrar</button>
            <ul className="menu">
              <li><NavLink className="menu-link" to="/trip/mis-viajes" onClick={handleLinkClick}>Mis Viajes</NavLink></li>
              <li><NavLink className="menu-link" to="/trip/planning" onClick={handleLinkClick}>Planificar un Viaje</NavLink></li>
            </ul>
            <Outlet />
          </div>
        )}
      </li>
      {/* {user && <p>Hello {user.username}</p> } */}
      <li><NavLink className="nav_link" to="/acerca">Acerca de Trippo</NavLink></li>
      <li><NavLink className="nav_link" to="/como-funciona">Cómo funciona</NavLink></li>
      <li><NavLink className="nav_link" to="/colaboradores">Empresas Afiliadas</NavLink></li>
      <li><NavLink className="nav_link" to="/ayuda">Ayuda</NavLink></li>
      {!isLoggedIn && <li><NavLink className="nav_link" to="/signup">Sign up</NavLink></li>}
      {!isLoggedIn && <li><NavLink className="nav_link" to="/login">Login</NavLink></li>}
      {isLoggedIn && <li><NavLink className="nav_link" to="/private">Private view</NavLink></li>}
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

