// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import localforage from 'localforage'
import App from './components/App'
import store from './store'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import('../node_modules/vuetify/dist/vuetify.min.css')
import('./stylus/main.styl')

Vue.use(Vuetify)
Vue.use(VeeValidate)

Vue.config.productionTip = false

localforage.config({
  name: 'eculum'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
