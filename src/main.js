import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'

const app = createApp(App)

app
.use(router)
.use(PrimeVue)
.mount('#app')


//const { directive, Contextmenu, ContextmenuItem } = window.contextmenu;

// export default {
//   directives: {
//     contextmenu: directive,
//   },

//   components: {
//     [Contextmenu.name]: Contextmenu,
//     [ContextmenuItem.name]: ContextmenuItem,
//   },
// };
