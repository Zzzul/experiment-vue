import axios from 'axios'
import ls from '@/utils/secure-ls'

const useApi = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        Accept: 'application/json'
    }
})

const useApiToken = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        Accept: 'application/json'
    }
})

useApiToken.interceptors.request.use(async (config) => {
    const token = await ls.get('token'); // Menunggu token tersedia
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


export { useApi, useApiToken }
