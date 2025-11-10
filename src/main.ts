import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { piniaPersist } from './plugins/pinia-persist'
import router from './router'
import '@unocss/reset/tailwind-v4.css'
import 'virtual:uno.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)

app.mount('#app')
