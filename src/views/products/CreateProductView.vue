<script setup>
import { useProductStore } from '@/stores/product'
import { watch } from 'vue'
import ls from '@/utils/secure-ls'

const productStore = useProductStore()

watch(() => productStore.formProduct, (newValue) => {
    try {
        const serializedData = JSON.stringify(newValue);
        ls.set('formProduct', serializedData);
    } catch (error) {
        console.error('Error while stringifying data:', error);
    }
}, { deep: true });
</script>

<template>
    <div class="create-product">
        <h1>Create Product</h1>

        <router-link to="/products">Back</router-link>

        <br>

        <form @submit.prevent="productStore.saveProduct">
            <label for="title">Title</label>
            <br>
            <input type="text" name="title" id="title" v-model="productStore.formProduct.title" />

            <br>
            <br>

            <button type="button" @click="productStore.clear">Clear</button>
            <button type="submit">Save</button>
        </form>
    </div>
</template>