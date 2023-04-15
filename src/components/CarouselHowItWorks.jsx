// import React, { useState } from "react";
// import Slider from "react-slick";
// import Home from '../images/home-image.png';
// import Cityoverview from '../images/cityoverview-image.png';
// import Form from '../images/form-image.png';
// import Login from '../images/login-image.png';
// import Plan from '../images/plan-image.png';

// function Carousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     beforeChange: (current, next) => setCurrentSlide(next),
//   };

//   const images = [
//     { src: Home },
//     { src: Cityoverview },
//     { src: Form },
//     { src: Login },
//     { src: Plan },
//   ];

//   return (
//     <div className="carousel">
//       <Slider {...settings}>
//         {images.map((image, index) => (
//           <div key={index}>
//             <img src={image.src} alt={`Slide ${index}`} />
//           </div>
//         ))}
//       </Slider>
//       <div className="arrows">
//         <button
//           className="arrow left"
//           onClick={() => setCurrentSlide(currentSlide - 1)}
//           disabled={currentSlide === 0}
//         >
//           {"<"}
//         </button>
//         <button
//           className="arrow right"
//           onClick={() => setCurrentSlide(currentSlide + 1)}
//           disabled={currentSlide === images.length - 1}
//         >
//           {">"}
//         </button>
//       </div>
//     </div>
//   );
// }
// export default Carousel;

import React, { useState } from "react";
import Slider from "react-slick";
import Home from '../images/home-image.png';
import Cityoverview from '../images/cityoverview-image.png';
import Form from '../images/form-image.png';
import Login from '../images/login-image.png';
import Plan from '../images/plan-image.png';
import { useNavigate } from "react-router-dom";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();
  const handleCityClick = () => {
    navigate('/CityOverview', { state: { city: "Barcelona - Cataluña (España)" } });
  }


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const toggleText = () => {
    setShowText(!showText);
  };

  const ImageText = ({ text }) => (
    <div className="text-steps">
      <h3>Busca tu destino:</h3>
      <p>
        Escribe el nombre de la ciudad o selecciona una de las ciudades más buscadas  {" "}
        <a href="/"> En este Enlace.</a> Nosotros te mostraremos dos fotos del destino y una breve descripción para que puedas conocer un poco más sobre el lugar. Si te interesa, haz clic en {" "}
        <a href="/cityOverview" onClick={(e) => {e.preventDefault(); handleCityClick()}}>Continuar</a>.
      </p>
    </div>
  );

  const ImageText1 = ({ text }) => (
    <div className="text-steps">
    <h3>Cuéntanos tus preferencias:</h3>
                  <p>
                    En este paso, nosotros te preguntaremos sobre tus preferencias en cuanto a actividades turísticas. ¿Te gusta la aventura o prefieres un turismo más relajado? ¿Quieres probar la gastronomía local o hacer un recorrido por la historia y la cultura? Cuéntanos todo lo que te gustaría hacer y nosotros te mostraremos un plan personalizado. 
                  </p>
                  </div>
  );

  const ImageText2 = ({ text }) => (
    <div className="text-steps">
    <h3>Regístrate o accede:</h3>
                  <p>
                    <strong>Regístrate o accede:</strong> Para acceder a la planificación de actividades, necesitas estar registrado. Si ya tienes una cuenta, ingresa tus datos para acceder a tu perfil. Si no, crea una cuenta rápida y sencilla en pocos minutos{" "}
                    <a href="/login">aquí</a>.
                  </p>
                  </div>
  );

    const ImageText3 = ({ text }) => (
    <div className="text-steps">
    <h3>Descubre tu plan de actividades:</h3>
                  <p>
                    En este paso, nosotros te mostraremos un plan personalizado para tu viaje. Te ofreceremos una lista de actividades y lugares turísticos según tus preferencias. Si te gusta el plan, puedes guardarlo en "Mis Viajes" y acceder a él en cualquier momento.
                  </p>
                  </div>
  );

      const ImageText4 = ({ text }) => (
    <div className="text-steps">
    <h3>Descubre tu plan de actividades:</h3>
                  <p>
                    En este paso, nosotros te mostraremos un plan personalizado para tu viaje. Te ofreceremos una lista de actividades y lugares turísticos según tus preferencias. Si te gusta el plan, puedes guardarlo en "Mis Viajes" y acceder a él en cualquier momento.
                  </p>
                  </div>
  );


  const images = [
    { src: Home, text: <ImageText /> },
    { src: Cityoverview, text: <ImageText1 /> },
    { src: Form, text:  <ImageText2 />  },
    { src: Login, text:  <ImageText3 />},
    { src: Plan, text: <ImageText4 /> },
  ];

  return (
    <div className="carousel">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={`Slide ${index}`} onClick={toggleText} />
            {showText && (
              <div className="image-text">{image.text}</div>
            )}
          </div>
        ))}
      </Slider>
      <div className="arrows">
        <button
          className="arrow left"
          onClick={() => setCurrentSlide(currentSlide - 1)}
          disabled={currentSlide === 0}
        >
          {"<"}
        </button>
        <button
          className="arrow right"
          onClick={() => setCurrentSlide(currentSlide + 1)}
          disabled={currentSlide === images.length - 1}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Carousel;


