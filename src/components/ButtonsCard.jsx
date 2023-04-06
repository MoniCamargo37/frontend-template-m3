import React, { useState } from 'react';



function ButtonsCard() {
    const [showLinks, setShowLinks] = useState(false);
    const [showShare, setShowShare] = useState(false);
  
    const handleShowLinks = () => {
      setShowLinks(!showLinks);
      setShowShare(false);
    };
  
    const handleShowShare = () => {
      setShowShare(!showShare);
      setShowLinks(false);
    };
  
    return (
      <div className="botones-container">
        <button className="btn-text-uppercase" onClick={handleShowLinks}>ENLACES UTÍLES</button>
        {showLinks && (
          <div className="enlaces-container">
            <a className="enlace-reserva" href="https://www.airbnb.com/" target="_blank">Book on Airbnb</a>
            <a className="enlace-reserva" href="https://www.booking.com/" target="_blank">Book on Booking</a>
            <a className="enlace-reserva" href="https://www.esky.es/" target="_blank">Book a flight on Esky</a>
            <a className="enlace-reserva" href="https://www.thefork.es/" target="_blank">Book on TheFork</a>
          </div>
        )}
        <button className="btn-text-uppercase" onClick={handleShowShare}>COMPARTIR</button>
        {showShare && (
          <div className="compartir-container">
            <a className="enlace-compartir" href="">CORREO ELECTRÓNICO</a>
            <a className="enlace-compartir" href="https://twitter.com/intent/tweet?">TWITTER</a>
          </div>
        )}
      </div>
    );
  }

  

export default ButtonsCard;