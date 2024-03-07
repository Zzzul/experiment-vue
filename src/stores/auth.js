import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi, useApiToken } from '@/utils/axios'
import { useRouter } from 'vue-router'
import ls from '@/utils/secure-ls'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(null)
    const router = useRouter()

    if (ls.get('user')) user.value = ls.get('user')

    if (ls.get('token')) token.value = ls.get('token')

    const login = async (data) => {
        await useApi.post('/auth/login', data)
            .then((res) => {
                token.value = res.data.token
                ls.set('token', res.data.token)
                getProfile()
            })
            .catch((error) => {
                console.error(error)
                alert(error.response.data.message)
            })
    }

    const getProfile = async () => {
        await useApiToken.get('/auth/me')
            .then((res) => {
                user.value = res.data
                ls.set('user', res.data)
                router.push({ name: 'home' })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const checkAuthStatus = async () => {
        await useApiToken.get('/auth/me')
            .then((res) => {
                user.value = res.data
                ls.set('user', res.data)
            })
            .catch((error) => {
                console.error(error)
                token.value = null
                user.value = null
                ls.remove('token')
                ls.remove('user')

                router.push({ name: 'login' })
            })
    }

    const logout = () => {
        token.value = null
        user.value = null
        ls.remove('token')
        ls.remove('user')

        router.push({ name: 'login' })
    }

    return { user, token, login, getProfile, logout, checkAuthStatus }
})
