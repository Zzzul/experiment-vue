<script setup>
// import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import Nav from '@/components/Nav.vue'

// const router = useRouter()
const auth = useAuthStore()

const form = ref({
    username: 'kminchelle',
    password: '0lelplR'
})

</script>

<template>
    <div class="login">
        <Nav/>

        <form @submit.prevent="auth.login(form)">
            <h1>Login Page</h1>

            <label for="username">Username</label>
            <input type="username" name="username" id="username" v-model="form.username">
            <br>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model="form.password">

            <button type="submit">Login</button>
        </form>
    </div>

    <p>kminchelle</p>
    <p>0lelplR</p>
</template>