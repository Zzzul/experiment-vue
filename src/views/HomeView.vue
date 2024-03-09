<script setup>
import { useCounterStore } from '@/stores/counter'
import Nav from '@/components/Nav.vue'
import Sidebar from '@/components/Sidebar.vue'

const counter = useCounterStore()
</script>

<template>
  <main>
    <Sidebar/>

    <Nav/>

    {{ counter.count }}

    <v-btn prepend-icon="$vuetify" density="comfortable">
  Button
</v-btn>

    <button @click="counter.increment">Increment</button>

    <br>

    <button @click="counter.decrement">Decrement</button>

    <br>

    <button @click="counter.doubleCount">Double Count</button>
  </main>
</template>
