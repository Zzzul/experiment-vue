<script setup>
import { useCounterStore } from '@/stores/counter'
import Nav from '@/components/Nav.vue'
import Menu from '@/components/Menu.vue'
import Input from '@/components/Input.vue'
import Button from "primevue/button"

const counter = useCounterStore()
</script>

<template>
  <main>
    <Nav/>

    <Menu/>

    {{ counter.count }}

    <Input/>

    <button @click="counter.increment">Increment</button>

    <Button>PrimeVue</Button>

    <br>

    <button @click="counter.decrement">Decrement</button>

    <br>

    <button @click="counter.doubleCount">Double Count</button>
  </main>
</template>
