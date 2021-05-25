import { createRouter, createWebHistory } from 'vue-router'
import moneyCounter from "../views/moneyCounter";
import { ElMessage } from "element-plus/es";

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
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('../views/statistics'),
  },
  {
    path: '/share',
    name: 'share',
    component: () => import('../views/share')
  },
  {
    path: '/shareBills/:id',
    name: 'shareBills',
    component: () => import('../components/share/shareList')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach(
  (to, from, next) =>{
    if(to.path === '/login' ){
      if (localStorage.getItem('Authorization') === null)
        next();
      else
      {
        ElMessage({
          message: '已经登录，请勿重复登录！',
          type: 'warning'
        });
        next('/');
      }

    }

    else{
      let token = localStorage.getItem('Authorization');
      if(token === null){
        next('/login');
      }else{
        next();
      }
    }
  }
);

export default router
