
import Axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const axios = Axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth-token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


export default axios;