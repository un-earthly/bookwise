import axios from 'axios';
import { BASE_URL } from '../redux/api/urls';

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export default axiosInstance;
