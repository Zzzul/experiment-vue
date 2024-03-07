import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/utils/axios'
import ls from '@/utils/secure-ls'
import { useAuthStore } from './auth'

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const product = ref(null)
    const isLoading = ref(false)
    const authStore = useAuthStore()

    if(ls.get('product')) product.value = ls.get('product')

    if(ls.get('products')) products.value = ls.get('products')

    const getProducts = async () => {
        isLoading.value = true

        authStore.checkAuthStatus()

        await useApi.get('/products')
            .then((res) => {
                products.value = res.data.products

                ls.set('products', res.data.products)

                isLoading.value = false
            })
            .catch((error) => {
                console.error(error)

                isLoading.value = false
            })
    }

    const getProductById = async (id) => {
        isLoading.value = true

        authStore.checkAuthStatus()

        await useApi.get(`/products/${id}`)
            .then((res) => {
                product.value = res.data
                
                ls.set('product', res.data)

                isLoading.value = false
            })
            .catch((error) => {
                console.error(error)

                isLoading.value = false
            })
    }

    return { products, product, getProducts, getProductById }
})
