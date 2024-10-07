import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: process.env.AUTH_SERVICE, // Set this for auth-service for now
    withCredentials: true, headers: {
        'Content-Type': 'application/json',
    },
});

// axiosInstance.interceptors.request.use(config => {
//     // Retrieve the auth token from cookies if it exists
//     const authToken = Cookies.get('auth_token'); // Use your cookie name here
//
//     if (authToken) {
//         config.headers['Authorization'] = `Bearer ${authToken}`; // Set token in Authorization header
//     }
//
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// // Response interceptor
// axiosInstance.interceptors.response.use(
//     response => {
//         // Check if the response is from the login endpoint
//         if (response.config.url === '/login' && response.status === 200) {
//             const newToken = response.data.token; // Adjust based on your API response
//
//             // Set cookie for the token
//             Cookies.set('auth_token', newToken, { expires: 7, path: '/' }); // Set cookie with expiration and path
//         }
//         return response;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );


export default axiosInstance;
