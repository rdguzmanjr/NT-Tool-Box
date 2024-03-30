import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-dark-green/theme.css'

const app = createApp(App)

app
.use(router)
.use(PrimeVue,{
    pt: {
    contextmenu: {
        label: {
            class: ['leading-2', 'text-xs']
        }
    }
}})
.mount('#app')
