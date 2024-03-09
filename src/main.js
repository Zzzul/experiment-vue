
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import Ripple from 'primevue/ripple'
import StyleClass from 'primevue/styleclass'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })
app.directive('ripple', Ripple)
app.directive('styleclass', StyleClass)

app.mount('#app')
