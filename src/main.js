import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/main',
    component: () => import('./views/MainLayout.vue'),
    children: [
      { path: 'menu', component: () => import('./views/PublishMenu.vue') },
      { path: 'purchase', component: { template: '<div>采购管理页面</div>' } },
      { path: 'sale', component: () => import('./views/SaleIndex.vue') },
      { path: 'sale/order', component: () => import('./views/SaleOrder.vue') },
      { path: 'stock', component: { template: '<div>库存管理页面</div>' } },
      { path: 'finance', component: { template: '<div>财务管理页面</div>' } },
      { path: 'voucher', component: () => import('./views/VoucherList.vue') },
      { path: 'voucher/edit', component: () => import('./views/Voucher.vue') },
      { path: 'base', component: { template: '<div>基础资料页面</div>' } },
      { path: 'system', component: { template: '<div>系统设置页面</div>' } },
      { path: 'customer-pool', component: () => import('./views/CustomerPool.vue') }
    ]
  },
  {
    path: '/publish-menu',
    component: () => import('./views/PublishMenu.vue')
  },
  {
    path: '/object-designer',
    component: () => import('./views/ObjectDesigner.vue')
  },
  {
    path: '/customer-pool',
    component: () => import('./views/CustomerPool.vue')
  },
  {
    path: '/tabs-demo',
    component: () => import('./views/TabsDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
