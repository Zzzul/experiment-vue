<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

</script>

<template>
    <div class="nav">
        <div v-if="authStore.token && authStore.user">
            <h3>User Information</h3>
            <img :src="authStore?.user?.image" :alt="authStore?.user?.firstName" style="width: 100px; border-radius: 50%;">
            <p>{{ authStore?.user?.firstName }} {{ authStore?.user?.lastName }}</p>
            <p>@{{ authStore?.user?.username }}</p>
            <p>{{ authStore?.user?.email }}</p>
        </div>

        <h1>
            <router-link to="/">Home</router-link>
        </h1>
        <h1>
            <router-link to="/products">Products</router-link>
        </h1>
        <h1 v-if="!authStore.token || !authStore.user">
            <router-link to="/login">Login</router-link>
        </h1>
        <h1 v-if="authStore.token && authStore.user">
            <a href="#" @click="authStore.logout">Logout</a>
        </h1>
    </div>
</template>