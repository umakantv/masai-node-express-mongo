
import Axios from 'axios'
import config from '../config';

const axios = Axios.create({
    baseURL: config.API_BASE_URL, // http://localhost:3002/api + /auth/register
    headers: {
        'Content-Type': 'application/json'
    },
})

// Adding an interceptor (middleware) for all API requests
// https://axios-http.com/docs/interceptors
axios.interceptors.request.use(function (config) {

    // Do something before request is sent
    const token = localStorage.getItem('auth-token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
}, function (error) {

    // Do something with request error
    return Promise.reject(error);
});


export default axios;