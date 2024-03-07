import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useApi, useApiToken } from '@/utils/axios'
import ls from '@/utils/secure-ls'
import { useAuthStore } from './auth'
import { useRouter } from 'vue-router'

export const useProductStore = defineStore('product', () => {
    const authStore = useAuthStore()
    const router = useRouter()

    const defaultFormProduct = {
        title: null,
    }
    
    const products = ref([])
    const product = ref(null)
    const isLoading = ref(false)
    const formProduct = ref(defaultFormProduct)

    if(ls.get('product')) product.value = ls.get('product')

    if(ls.get('products')) products.value = ls.get('products')

    if (ls.get('formProduct')) formProduct.value = JSON.parse(ls.get('formProduct'))

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

    const saveProduct = async () => {
        authStore.checkAuthStatus()

        await useApiToken.post('/products/add', JSON.stringify(formProduct.value))
            .then(() => {
                clear()

                router.push({ name: 'products' })
            })
            .then((error) => {
                console.error(error)
            })
    }

    const editProduct = async (id) => {
        authStore.checkAuthStatus()

        await useApiToken.put(`/products/${id}`, JSON.stringify(formProduct.value))
            .then(() => {
                clear()

                router.push({ name: 'products' })
            })
            .then((error) => {
                console.error(error)
            })
    } 

    const deleteProduct = async (id) => {
        authStore.checkAuthStatus()

        await useApiToken.delete(`/products/${id}`)
            .then(() => getProducts())
            .then((error) => {
                console.error(error)
            })
    }

    const clear = () => {    
        formProduct.value = defaultFormProduct

        ls.set('formProduct', JSON.stringify(defaultFormProduct))
    }

    return { products, product, getProducts, getProductById, saveProduct, formProduct, clear, editProduct, deleteProduct }
})


if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))