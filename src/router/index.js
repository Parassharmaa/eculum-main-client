import Vue from 'vue'
import Router from 'vue-router'
import Wait from '@/components/Wait.vue'
import Login from '@/components/Login.vue'
import InsightsOverview from '@/components/InsightsOverview.vue'
import InsightsFriends from '@/components/InsightsFriends.vue'
import InsightsFollowers from '@/components/InsightsFollowers.vue'

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
      path: '*',
      name: '404',
      redirect: '/app'
    }
  ],
  hashbang: true,
  // history: true,
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
