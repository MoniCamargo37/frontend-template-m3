import axios from 'axios';

class ProfileService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/profile`,
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getProfile() {
    return this.api.get('/').then(({ data }) => data);
  }

  editProfile(user) {
    return this.api.put('/cambiar-contraseña', user).then(({ data }) => data);
  }

  editUserPhoto(photo) {
    return this.api.put('/editar-foto', photo).then(({ data }) => data);
  }

  deleteUserPhoto() {
    return this.api.delete('/profile/deletePhoto').then(({ data }) => data);
  }
}

const profileService = new ProfileService();

export default profileService;
