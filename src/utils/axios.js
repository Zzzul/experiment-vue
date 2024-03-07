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
        Authorization: `Bearer ${ls.get('token')}`,
        Accept: 'application/json'
    }
})

export { useApi, useApiToken }
