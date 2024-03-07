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
  <div class="about">
    <Nav />

    {{ counter.count }}

    <button @click="productStore.getProducts">Get Products</button>

    <p>Product Detail

      <span v-if="productStore?.isLoading">Loading...</span>
    </p>

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
        <td><img :src="productStore?.product?.thumbnail" :alt="productStore?.product?.title"></td>
      </tr>
    </table>

    <table>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
      <tr v-for="product in productStore.products" :key="product.id">
        <td>{{ product.brand }}</td>
        <td>{{ product.price }}</td>
        <td><button @click="productStore.getProductById(product.id)">Get Detail</button></td>
      </tr>
    </table>
  </div>
</template>@/stores/product
