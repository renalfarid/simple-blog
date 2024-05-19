import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerPlugins } from '@/plugins'
import '@fortawesome/fontawesome-free/css/all.css'

import './style.css'
import App from './App.vue'
const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
registerPlugins(app)
app.mount('#app')