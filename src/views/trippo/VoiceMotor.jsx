import React from "react";
import logo from "../../images/Tripfy (3).png";
import '../../styles/VoiceMotorStyles.css';

function VoiceMotor() {
  return (
    <div className="voicePage-container">
      <h1>Próximamente en tu móvil</h1>
      <img src={logo} alt="Trippo logo" className="logo-voicePage" />
    </div>
  );
}

export default VoiceMotor;

