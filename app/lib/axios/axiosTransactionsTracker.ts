import axios from 'axios';
import {cookies} from "next/headers";
import {signOut} from "auth";

const axiosTransactionsTracker = axios.create({
    baseURL: process.env.TRANSACTIONS_TRACKER_SERVICE, // Set this for auth-service for now
    withCredentials: true,
});

axiosTransactionsTracker.interceptors.request.use(config => {
    const cookieStore = cookies()
    const authjsSessionToken = cookieStore.get('jwt.cookie')

    if (authjsSessionToken !== undefined) {
        console.log("Setting cookie on axios header")
        config.headers['Cookie'] = authjsSessionToken['value'];
    }

    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

axiosTransactionsTracker.interceptors.response.use(function (response) {
    return response
}, async function (error) {
    if ([400, 401, 403].includes(error.response.status)) {
        console.log('Signing Out');
        await signOut();
    } else {
        return Promise.reject(error)
    }
})

export default axiosTransactionsTracker;