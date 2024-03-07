<script setup>
import { useCounterStore } from '@/stores/counter'
import Nav from '@/components/Nav.vue'

const counter = useCounterStore()
</script>

<template>
  <main>
    <Nav/>

    {{ counter.count }}

    <button @click="counter.increment">Increment</button>

    <br>

    <button @click="counter.decrement">Decrement</button>

    <br>

    <button @click="counter.doubleCount">Double Count</button>
  </main>
</template>
