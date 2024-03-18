import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TransformOrigin from '../views/TransformOrigin.vue'
import BWGenerator from '../views/BWGenerator.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gettransformorigin',
      name: 'gettransformorigin',
      component: TransformOrigin
    },
    {
      path: '/bwgenerator',
      name: 'bwgenerator',
      component: BWGenerator
    }
  ]
})

export default router
