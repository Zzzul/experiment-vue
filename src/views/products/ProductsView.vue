<script setup>
import { useProductStore } from '@/stores/product'
import Nav from '@/components/Nav.vue'
import { onMounted } from 'vue'

const productStore = useProductStore()

onMounted(() => productStore.getProducts())
</script>

<template>
    <div class="product">
        <Nav />

        <button @click="productStore.getProducts">Get Products</button>
        <br>
        <button>
            <router-link to="/products/create">Create</router-link>
        </button>

        <table>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
            <tr v-for="product in productStore.products" :key="product.id">
                <td>{{ product.brand }}</td>
                <td>{{ product.price }}</td>
                <td>
                    <router-link :to="`/products/${product.id}`">Detail</router-link>

                    <button @click="productStore.deleteProduct(product.id)">Delete</button>
                </td>
            </tr>
        </table>
    </div>
</template>
