import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('eclmtoken')
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login ({
      state,
      commit,
      rootState
    }, creds) {
      console.log('login...', creds)
      commit(LOGIN) // show spinner
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
    }
  },

  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    }
  }
})
