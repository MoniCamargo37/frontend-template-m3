import axios from 'axios';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/user`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getUserProfile() {
    return this.api.get('/profile').then(({ data }) => data);
  }

  editUserProfile(user) {
    return this.api.put('/profile/edit', user).then(({ data }) => data);
  }

  editUserPhoto(photo) {
    return this.api.put('/profile/editPhoto', photo).then(({ data }) => data);
  }

  deleteUserPhoto() {
    return this.api.delete('/profile/deletePhoto').then(({ data }) => data);
  }
}

const userService = new UserService();

export default userService;
