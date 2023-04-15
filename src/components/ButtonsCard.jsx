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

  // const handleShowShare = () => {
  //   setShowShare(!showShare);
  //   setShowLinks(false);
  // };

  const handleShareEmail = () => {
    const currentUrl = location?.state?.url;
    const cityName = location?.state?.city;
    if (!currentUrl || !cityName) {
      handleCityClick();
      return;
    }
    const subject = `Check out ${cityName} on my travel planner!`;
    const body = `Hey, check out ${cityName} on my travel planner! ${currentUrl}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const handleShareTwitter = () => {
    const currentUrl = location?.state?.url;
    const cityName = location?.state?.city;
    if (!currentUrl || !cityName) {
      handleCityClick();
      return;
    }

 
    
    const message = `Check out ${cityName} on my travel planner! ${currentUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(message)}`;
    const link = document.createElement('a');
    link.href = twitterUrl;
    link.target = '_blank';
    link.innerHTML = `Check out ${cityName} on my travel planner!`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleCityClick = () => {
    const currentUrl = window.location.href;
    const city = "Barcelona - Cataluña (España)";
    const state = { city, url: currentUrl };
    navigate('/CityOverview', { state });
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
  rel="noreferrer"
>
  Reserve en Airbnb
</a>
<a
  className="enlace-reserva"
  href="https://www.booking.com/"
  target="_blank"
  rel="noreferrer"
>
  Reserve en Booking
</a>
<a
  className="enlace-reserva"
  href="https://www.skyscanner.es/"
  target="_blank"
  rel="noreferrer"
>
  Vuelos en Skyscanner
</a>
<a
  className="enlace-reserva"
  href="https://www.thefork.es/"
  target="_blank"
  rel="noreferrer"
>
  Reservas en The Fork
</a>
          </div>
        )}
      </div>
      <div className="link-card">
        {/* <button className="btn-text-uppercase" onClick={handleShowShare}>
          COMPARTIR
        </button> */}
        {showShare && (
          <div className="compartir-container">
         <a href="/" onClick={(e) => { e.preventDefault(); handleShareEmail(); }}>
              CORREO ELECTRÓNICO
            </a>
            <a className="enlace-compartir" href="/" onClick={(e) => { e.preventDefault(); handleShareTwitter(); }}>
              Twitter
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ButtonsCard;
