<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view>
    </router-view>
    <div class="test">
    dhkdhksd
    djsldjsld
    sd
    s
    d
    s
    d
    s
    d

    s
    d
    s
    d
    fsf
    s
    fs
    f
    s
    f
    s
    fsf
    s
    fsfffffffsfs


    sf
    s
    f
    sf
    s
    </div>
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
  .test {
    margin-left: 330px !important;
  }
}
</style>
