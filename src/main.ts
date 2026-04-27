import { createApp } from 'vue'
import './style.css'
import { useDarkMode } from './composables/useDarkMode'
import { useAuth } from './composables/useAuth'
import App from './App.vue'
import router from './router'

const app = createApp(App)
useDarkMode()
useAuth().initializeAuth()
app.use(router)
app.mount('#app')
