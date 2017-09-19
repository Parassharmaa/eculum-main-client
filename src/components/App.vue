<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view v-bind:class="{'adjust-margin': ['login', 'waiting'].indexOf($route.name) === -1}">
    </router-view>
  </div>
</template>

<script>

import NavBar from './NavBar.vue'

export default {
  name: 'app',
  components: { NavBar }
}

</script>

<style>
#app {
  /*text-align: center;*/
}

@media screen and (min-width: 822px) {
  .adjust-margin {
    margin-left: 330px !important;
  }
}

</style>
