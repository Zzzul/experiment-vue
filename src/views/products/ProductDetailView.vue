<script setup>
import { useProductStore } from '@/stores/product'
import Nav from '@/components/Nav.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const productStore = useProductStore()

onMounted(() => productStore.getProductById(router.currentRoute.value.params.id))

</script>

<template>
    <div class="product-detail">
        <Nav />
        <h4>Product Detail</h4>

        <table style="border-collapse: collapse; border: 1px solid black;" v-if="productStore?.product">
            <tr>
                <th>Brand</th>
                <td>{{ productStore?.product?.brand }}</td>
            </tr>
            <tr>
                <th>Title</th>
                <td>{{ productStore?.product?.title }}</td>
            </tr>
            <tr>
                <th>Price</th>
                <td>{{ productStore?.product?.price }}</td>
            </tr>
            <tr>
                <th>Description</th>
                <td>{{ productStore?.product?.description }}</td>
            </tr>
            <tr>
                <th>Rating</th>
                <td>{{ productStore?.product?.rating }}</td>
            </tr>
            <tr>
                <th>Stock</th>
                <td>{{ productStore?.product?.stock }}</td>
            </tr>
            <tr>
                <th>Category</th>
                <td>{{ productStore?.product?.category }}</td>
            </tr>
            <tr>
                <th>Thumbnail</th>
                <td>
                    <img :src="productStore?.product?.thumbnail" :alt="productStore?.product?.title">
                </td>
            </tr>
        </table>

        <button @click="productStore.deleteProduct(productStore?.product?.id)" v-if="productStore?.product">Delete</button>
        
        <div v-if="!productStore.product">
            <p style="color: red;">Product not found</p>

            <router-link to="/products">Go Back</router-link>
        </div>
    </div>
</template>