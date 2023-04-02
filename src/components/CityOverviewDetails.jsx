import CityOverviewService from '../services/cityOverviewService';
import CityOverview from '../components/CityOverview';
import React, { useState, useEffect } from "react";

// class CityOverviewDetails extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cityOverview: null,
//       loading: true,
//       error: null,
//     };
//   }

//   componentDidMount() {
//     const { id } = this.props.match.params;
//     CityOverviewService.getCityById(id)
//       .then(cityOverview => {
//         this.setState({ cityOverview, loading: false });
//       })
//       .catch(error => {
//         this.setState({ error, loading: false });
//       });
//   }

//   render() {
//     const { cityOverview, loading, error } = this.state;

//     if (loading) {
//       return <p>Loading...</p>;
//     }

//     if (error) {
//       return <p>{error.message}</p>;
//     }

//     return <CityOverview {...cityOverview} />;
//   }
// }

// export default CityOverviewDetails;
function CityOverviewDetails(props) {
    // Recuperar los datos de la ciudad del backend utilizando el id de la ruta
    const { id } = props.match.params;
    const [city, setCity] = useState(null);
  
    useEffect(() => {
      CityOverviewService.getCityById(id)
        .then(city => setCity(city))
        .catch(error => console.error(error));
    }, [id]);
  
    return (
      <div>
        {city && <CityOverview {...city} />}
      </div>
    );
  }
  export default CityOverviewDetails;