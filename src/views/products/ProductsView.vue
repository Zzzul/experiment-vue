<script setup>
import { useCounterStore } from '@/stores/counter'
import { useProductStore } from '@/stores/product'
import Nav from '@/components/Nav.vue'
import { onMounted } from 'vue'

const counter = useCounterStore()
const productStore = useProductStore()

onMounted(() => {
    productStore.getProducts()
})
</script>

<template>
    <div class="product">
        <Nav />

        {{ counter.count }}

        <button @click="productStore.getProducts">Get Products</button>

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
                </td>
            </tr>
        </table>
    </div>
</template>
