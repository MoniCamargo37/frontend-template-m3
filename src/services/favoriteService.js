import axios from 'axios';
/* BACKLOG */
class FavoriteService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/favorite`,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });
  }

  createFavorite(cityoverviewId) {
    return this.api.post(`/trip/${cityoverviewId}`).then(({ data }) => data).catch(err => console.error(err));
  }

 
}

const favoriteService = new FavoriteService();

export default favoriteService;
