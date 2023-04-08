
import Axios from 'axios'
import config from '../config';

const axios = Axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})

// middleware - to attach the auth token header in the request
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