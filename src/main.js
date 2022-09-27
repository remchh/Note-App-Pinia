import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'


//import './assets/main.css'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
