import { createApp } from 'vue'
import './style.css'
import { useDarkMode } from './composables/useDarkMode'
import App from './App.vue'
import router from './router'

const app = createApp(App)
useDarkMode()
app.use(router)
app.mount('#app')
