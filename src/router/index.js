import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/user/login',
    name: 'Login',
    component: () => import('../views/user/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
