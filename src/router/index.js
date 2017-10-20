import Vue from 'vue'
import Router from 'vue-router'
import Wait from '@/components/Wait.vue'
import Login from '@/components/Login.vue'
import InsightsOverview from '@/components/InsightsOverview.vue'
import InsightsFriends from '@/components/InsightsFriends.vue'
import InsightsFollowers from '@/components/InsightsFollowers.vue'
import Register from '@/components/Register.vue'
import CreateTweet from '@/components/CreateTweet.vue'
import Settings from '@/components/Settings.vue'

import store from '@/store/index.js'
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
      path: '/register',
      name: 'register',
      component: Register,
      meta: {isLoggedIn: true}
    },
    {
      path: '/app',
      name: 'insights_overview',
      component: InsightsOverview,
      meta: {validate: true}
    },
    {
      path: '/app/followers',
      name: 'insights_followers',
      component: InsightsFollowers,
      meta: {validate: true}
    },
    {
      path: '/app/friends',
      name: 'insights_friends',
      component: InsightsFriends,
      meta: {validate: true}
    },
    {
      path: '/app/tweet',
      name: 'create_tweet',
      component: CreateTweet,
      meta: {validate: true}
    },
    {
      path: '/app/settings',
      name: 'settings',
      component: Settings,
      meta: { validate: true }
    },
    {
      path: '*',
      name: '404',
      redirect: '/app'
    }
  ],
  hashbang: true,
  // history: true,
  mode: 'history'
})

import Validate from '@/api/Validate'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.validate)) {
    if (!localStorage.getItem('eclmtoken')) {
      next({
        path: '/'
      })
    } else {
      next()
      Validate.valid()
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          store.dispatch('show_error', 'Authentication Error, Please Login Again')
          next({
            path: '/'
          })
        }
      })
    }
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLoggedIn)) {
    if (localStorage.getItem('eclmtoken')) {
      Validate.valid()
      .then(() => {
        next({
          path: '/app'
        })
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          store.dispatch('show_error', 'Authentication Error, Please Login Again')
          localStorage.removeItem('eclmtoken')
          next()
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
