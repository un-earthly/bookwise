import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost/api/v1',
});

export default axiosInstance;
