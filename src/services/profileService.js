import axios from "axios";

class ProfileService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/profile`,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getProfile() {
    return this.api.get("/").then(({ data }) => data);
  }

  editProfile(formData) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return this.api
      .put("/editar-foto", formData, config)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  getProfileFavorite() {
    return this.api.get('/favorite').then(({ data }) => data).catch(err => console.error(err));
}
  deleteUserPhoto() {
    return this.api.delete("/deletePhoto").then(({ data }) => data);
  }
}

const profileService = new ProfileService();

export default profileService;
