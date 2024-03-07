import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useApi, useApiToken } from '@/utils/axios'
import { useRouter } from 'vue-router'
import ls from '@/utils/secure-ls'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(null)
    const router = useRouter()
    const redirectRoute = ref(null)

    if (ls.get('user')) user.value = ls.get('user')

    if (ls.get('token')) token.value = ls.get('token')

    if (ls.get('redirectRoute')) redirectRoute.value = ls.get('redirectRoute')

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

                if (redirectRoute.value || ls.get('redirectRoute')) {
                    router.push(redirectRoute.value ?? ls.get('redirectRoute'))
                    redirectRoute.value = null
                    ls.remove('redirectRoute')
                } else {
                    router.push({ name: 'home' })
                }

                alert('Login Success')
            })
            .catch((error) => {
                console.error(error)

                alert(error.response.data.message)
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

                // Jika pengguna mencoba mengakses halaman yang memerlukan login,
                // simpan URL halaman tersebut untuk diakses setelah login
                if (router.currentRoute.value.meta.requiresAuth) {
                    redirectRoute.value = router.currentRoute.value.fullPath
                    ls.set('redirectRoute', router.currentRoute.value.fullPath);
                }

                router.push({ name: 'login' })
            })
    }

    const logout = () => {
        token.value = null
        user.value = null
        redirectRoute.value = null
        ls.remove('token')
        ls.remove('user')
        ls.remove('redirectRoute')

        router.push({ name: 'login' })
    }

    return { user, token, login, getProfile, logout, checkAuthStatus }
})


if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))