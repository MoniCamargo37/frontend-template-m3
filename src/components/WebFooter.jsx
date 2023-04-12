import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { useState, useEffect } from "react";
import Logo from '../images/logoName.png';
import'../styles/NavbarFooterStyles.css';

export default function WebFooter() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".Footer");
      const pageHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const hasScrollBar = pageHeight > windowHeight;
      const distanceFromBottom = pageHeight - (window.pageYOffset + windowHeight);
      setShowFooter(distanceFromBottom < 80 || !hasScrollBar);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className={showFooter ? "Footer" : "Footer hidden"}>
        <div className='footer-menu'>
        <div className="footer-logo">
          <img src= {Logo} alt="Logo de la empresa" />
        </div>
        <div className='slogan-text'>
          <p>"Explora el mundo con Trippo: Tu compañero de viaje para planificar actividades".</p>
        </div>
        <div className="footer-social">
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        </div>
      </div>
      </div>
    
    </div>
  );
}