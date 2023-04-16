import axios from 'axios';

class AccessService {
    constructor() {
        this.api = axios.create({
        baseURL: `${process.env.REACT_APP_BACKEND_URL}/access`,
        });

        this.api.interceptors.request.use((config) => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            config.headers.Authorization = `Bearer ${storedToken}`;
        }
        return config;
        });
    }

    getAccess() {
        return this.api.get('/').then((response) => response.data);
    }
}

const accessService = new AccessService();
export default accessService;