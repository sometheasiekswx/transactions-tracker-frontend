import axios from 'axios';


const axiosAuth = axios.create({
    baseURL: process.env.AUTH_SERVICE, // Set this for auth-service for now
    withCredentials: true,
});


export default axiosAuth;