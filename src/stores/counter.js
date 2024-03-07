import { ref } from 'vue'
import { defineStore } from 'pinia'
import ls from '@/utils/secure-ls'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(1)
  
  // Initialize count from localStorage
  const storedCount = ls.get('counter_count');
  if (storedCount !== null) {
    count.value = storedCount;
  }
  
  function increment() {
    count.value++
    // Update localStorage
    ls.set('counter_count', count.value);
  }

  const decrement = () => {
    count.value--

    // Update localStorage
    ls.set('counter_count', count.value);
  }

  function doubleCount() {
    count.value = count.value * 2

    // Update localStorage
    ls.set('counter_count', count.value);
  }

  return { count, increment, decrement, doubleCount }
})
