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
      component: Login
    },
    {
      path: '/waiting',
      name: 'waiting',
      component: Wait
    },
    {
      path: '/app',
      name: 'dashboard',
      component: Dashboard,
      meta: {AuthState: true}
    }
  ],
  hashbang: true,
  history: true,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.AuthState)) {
    if (!localStorage.getItem('eclmtoken')) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
