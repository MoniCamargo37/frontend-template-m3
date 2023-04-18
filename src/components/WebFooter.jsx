import React, { useState, useEffect, useCallback } from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import Logo from '../images/logoName.png';
import '../styles/NavbarFooterStyles.css';

const WebFooter = React.memo(() => {
  const [showFooter, setShowFooter] = useState(false);
  const [distanceFromBottom,] = useState(0);

  const handleScroll = useCallback(() => {
     // eslint-disable-next-line 
    const footer = document.querySelector('.Footer');
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const hasScrollBar = pageHeight > windowHeight;
    const distanceFromBottom = pageHeight - (window.pageYOffset + windowHeight);
    setShowFooter(distanceFromBottom < 80 || !hasScrollBar);
  }, []);

  const handleResize = useCallback(() => {
     // eslint-disable-next-line 
    const footer = document.querySelector('.Footer');
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const hasScrollBar = pageHeight > windowHeight;
    const distanceFromBottom = pageHeight - (window.pageYOffset + windowHeight);
    setShowFooter(distanceFromBottom < 80 || !hasScrollBar);
  }, []);

  const debounce = useCallback((fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 100));
    window.addEventListener('resize', debounce(handleResize, 100));

    return () => {
      window.removeEventListener('scroll', debounce(handleScroll, 100));
      window.removeEventListener('resize', debounce(handleResize, 100));
    };
  }, [handleScroll, handleResize, debounce]);

  return (
    <div>
      <div className={showFooter ? `Footer Footer-${distanceFromBottom}` : 'Footer hidden'}>
        <div className='footer-menu'>
          <div className='footer-logo'>
            <img src={Logo} alt='Logo de la empresa' />
          </div>
          <div className='slogan-text'>
            <p>"Explora el mundo con Trippo: Tu compañero de viaje para planificar actividades".</p>
          </div>
          <div className='footer-social'>
            <a href='https://www.linkedin.com/' target='_blank' rel='noopener noreferrer'>
              <FaLinkedin />
            </a>
            <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
              <FaFacebook />
            </a>
            <a href='https://twitter.com/' target='_blank' rel='noopener noreferrer'>
              <FaTwitter />
            </a>
            <a href='https://github.com/' target='_blank' rel='noopener noreferrer'>
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WebFooter;








