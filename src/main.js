// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import localforage from 'localforage'
import App from './components/App'
import store from './store'

Vue.use(VueMaterial)
Vue.config.productionTip = false

/* Material Theme */
Vue.material.registerTheme('main', {
  primary: {
    color: 'light-blue',
    hue: 600,
    textColor: 'white'
  },
  accent: {
    color: 'lime',
    hue: 500
  }
})

Vue.material.setCurrentTheme('main')

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
