import { createRouter, createWebHistory } from 'vue-router'
import moneyCounter from "../views/moneyCounter";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: moneyCounter
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/listAndUser')
  },
  {
    path:'/user',
    name: 'user',
    component: () => import('../views/helpPage')
  },
  {
    path:'/login',
    name: 'login',
    component: () => import('../views/login')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
