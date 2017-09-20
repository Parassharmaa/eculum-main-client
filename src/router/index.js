import Vue from 'vue'
import Router from 'vue-router'
import Wait from '@/components/Wait.vue'
import Login from '@/components/Login.vue'
import Dashboard from '@/components/Dashboard.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {isLoggedIn: true}
    },
    {
      path: '/waiting',
      name: 'waiting',
      component: Wait,
      meta: {isLoggedIn: true}
    },
    {
      path: '/app',
      name: 'dashboard',
      component: Dashboard,
      meta: {validate: true}
    },
    {
      path: '*',
      name: '404',
      redirect: '/app'
    }
  ],
  hashbang: true,
  history: true,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.validate)) {
    if (!localStorage.getItem('eclmtoken')) {
      console.log(to)
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLoggedIn)) {
    if (localStorage.getItem('eclmtoken')) {
      next({
        path: '/app'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
