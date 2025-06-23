import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/',
    component: () => import('./views/MainLayout.vue')
  },
  {
    path: '/publish-menu',
    component: () => import('./views/PublishMenu.vue')
  },
  {
    path: '/object-designer',
    component: () => import('./views/ObjectDesigner.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
