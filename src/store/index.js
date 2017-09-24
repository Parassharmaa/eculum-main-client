import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const LOAD_USER = 'LOAD_USER'
const START_LOADING = 'START_LOADING'
const STOP_LOADING = 'STOP_LOADING'
const LOAD_INSIGHTS_OVERVIEW = 'LOAD_INSIGHTS_OVERVIEW'
const LOAD_INSIGHTS_FOLLOWERS = 'LOAD_INSIGHTS_FOLLOWERS'
const LOAD_INSIGHTS_FRIENDS = 'LOAD_INSIGHTS_FRIENDS'
const SHOW_ERROR = 'SHOW_ERROR'

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('eclmtoken'),
    user: {
      twitter: {
        name: '',
        profile_image: ''
      }
    },
    insights: {
      overview: {},
      followers: {},
      friends: {}
    },
    err: {
      show: false,
      info: 'Hello World'
    },
    pending: false
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
    },
    [START_LOADING] (state) {
      state.pending = true
    },
    [STOP_LOADING] (state) {
      state.pending = false
    },
    [LOAD_USER] (state, user) {
      Object.assign(state.user, user)
    },
    [LOAD_INSIGHTS_OVERVIEW] (state, data) {
      Object.assign(state.insights.overview, data)
    },
    [LOAD_INSIGHTS_FOLLOWERS] (state, data) {
      Object.assign(state.insights.followers, data)
    },
    [LOAD_INSIGHTS_FRIENDS] (state, data) {
      Object.assign(state.insights.friends, data)
    },
    [SHOW_ERROR] (state, info) {
      state.err.show = true
      state.err.info = info
    }
  },
  actions: {
    login ({
      state,
      commit,
      rootState
    }, creds) {
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('eclmtoken', creds)
          commit(LOGIN_SUCCESS)
          resolve()
        }, 1000)
      })
    },
    logout ({
      commit
    }) {
      localStorage.removeItem('eclmtoken')
      commit(LOGOUT)
    },
    load_user ({
      state, commit
    }, userdata) {
      commit(LOAD_USER, userdata)
      // commit(STOP_LOADING)
    },
    load_insights_overview ({
      state, commit
    }, data) {
      commit(LOAD_INSIGHTS_OVERVIEW, data)
      commit(STOP_LOADING)
    },
    load_insights_followers ({
      state, commit
    }, data) {
      commit(LOAD_INSIGHTS_FOLLOWERS, data)
      commit(STOP_LOADING)
    },
    load_insights_friends ({
      state, commit
    }, data) {
      commit(LOAD_INSIGHTS_FRIENDS, data)
      commit(STOP_LOADING)
    },
    show_error ({
      state, commit
    }, info) {
      commit(SHOW_ERROR, info)
    }
  },

  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    user: state => {
      return state.user
    },
    insights_overview: state => {
      return state.insights.overview
    },
    insights_followers: state => {
      return state.insights.followers
    },
    insights_friends: state => {
      return state.insights.friends
    },
    pending: state => {
      return state.pending
    },
    errorShow: state => {
      return state.err.show
    },
    errorInfo: state => {
      return state.err.info
    }
  }
})
