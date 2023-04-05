import axios from 'axios';

class TripPlanService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/trip`,
    });
 
  this.api.interceptors.request.use((config) => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      config.headers = { Authorization: `Bearer ${storedToken}` };
    }
    return config;
  });
}
  createTripPlan(tripPlan){
    console.log('Moni');
    return this.api.post('/actividades', tripPlan).then(({ data }) => data).catch(err => console.error(err));
  }

  // Get all trips
  getAllTrips() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }

  // Get trip by ID
  getTrip(tripId) {
    return this.api.get(`/${tripId}`).then(({ data }) => data).catch(err => console.error(err));
  }

  // Create a new trip
  createTrip(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err))
  }

  // Edit a trip
  editTrip(tripId, body) {
    return this.api.put(`/${tripId}`, body).then(({ data }) => data).catch(err => console.error(err))
  }

  // Delete a trip
  deleteTrip(tripId) {
    return this.api.delete(`/${tripId}`).then(({ data }) => data).catch(err => console.error(err))
  }
}

const tripPlanService = new TripPlanService();

export default tripPlanService;
