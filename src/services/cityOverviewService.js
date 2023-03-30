import axios from 'axios';

class CityOverviewService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/city-overview`,
    });
  }

  // Get city by name and update numSearches for the selected city

  getCity(cityName) {
    return this.api.get(`/${cityName}`).then(({ data }) => data).catch(err => console.error(err));
  }

  // Get most searched cities
  getMostSearchedCities() {
    return this.api.get('/mostSearched').then(({ data }) => data).catch(err => console.error(err));
  }

  createCity(body) {
    return this.api.post('/',body).then(({ data }) => data).catch(err => console.error(err))
  }

  deleteCity(cityId) {
    return this.api.delete(`delete/${cityId}`).then(({ data }) => data).catch(err => console.error(err))
  }
}
const cityOverviewService = new CityOverviewService();
export default cityOverviewService;