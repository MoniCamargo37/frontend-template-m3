import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ButtonsCard() {
  const [showLinks, setShowLinks] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
    setShowShare(false);
  };

  const handleShowShare = () => {
    setShowShare(!showShare);
    setShowLinks(false);
  };

  const handleCityClick = () => {
    const currentUrl = window.location.href;
    navigate('/CityOverview', {
      state: {
        city: "Barcelona - Cataluña (España)",
        url: currentUrl
      }
    });
  };

  const handleShareTwitter = () => {
    const currentUrl = location.state.url || window.location.href;
    const cityName = location.state.city;
    const message = `Check out ${cityName} on my travel planner!`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(message)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="botones-container">
      <div className="link-card">
        <button className="btn-text-uppercase" onClick={handleShowLinks}>
          ENLACES ÚTILES
        </button>
        {showLinks && (
          <div className="enlaces-container">
            <a
              className="enlace-reserva"
              href="https://www.airbnb.com/"
              target="_blank"
            >
              Reserve en Airbnb
            </a>
            <a
              className="enlace-reserva"
              href="https://www.booking.com/"
              target="_blank"
            >
              Reserve en Booking
            </a>
            <a
              className="enlace-reserva"
              href="https://www.skyscanner.es/"
              target="_blank"
            >
              Vuelos en Skyscanner
            </a>
            <a
              className="enlace-reserva"
              href="https://www.thefork.es/"
              target="_blank"
            >
              Reserve en TheFork
            </a>
          </div>
        )}
      </div>
      <div className="link-card">
        <button className="btn-text-uppercase" onClick={handleShowShare}>
          COMPARTIR
        </button>
        {showShare && (
          <div className="compartir-container">
            <a className="enlace-compartir" href="">
              CORREO ELECTRÓNICO
            </a>
            <a className="enlace-compartir" href="#" onClick={(e) => { e.preventDefault(); handleShareTwitter(); }}>
              Twitter
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ButtonsCard;
