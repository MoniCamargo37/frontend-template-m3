import React from 'react';
import {   FaFacebook, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

function WebFooter() {
  return (
    <div>
      <div className='Footer'>
      <div className="footer-logo">
        <img src="logo.png" alt="Logo de la empresa" />
      </div>
      <div className="footer-social">
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
      </div>
      </div>
      </div>
  );
}
export default WebFooter ;
