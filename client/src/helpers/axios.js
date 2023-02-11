import axios from "axios";
import { axios_base_url } from '../config';

const axiosInstance = axios.create({
    baseURL: axios_base_url
});

export default axiosInstance