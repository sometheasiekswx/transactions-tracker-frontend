import axios from 'axios';
import {cookies} from "next/headers";


const axiosTransactionsTracker = axios.create({
    baseURL: process.env.TRANSACTIONS_TRACKER_SERVICE, // Set this for auth-service for now
    withCredentials: true,
});

axiosTransactionsTracker.interceptors.request.use(config => {
    const cookieStore = cookies()
    const authjsSessionToken = cookieStore.get('jwt.cookie')

    if (authjsSessionToken !== undefined) {
        config.headers['Cookie'] = authjsSessionToken['value'];
    }

    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});


export default axiosTransactionsTracker;