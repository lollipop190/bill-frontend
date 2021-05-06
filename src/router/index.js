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


router.beforeEach(
  (to, from, next) =>{
    if(to.path === '/login')
      next();
    else{
      let token = localStorage.getItem('Authorization');
      if(token === 'null' || token === ''){
        next('/login');
      }else{
        next();
      }
    }

  }
);

export default router
