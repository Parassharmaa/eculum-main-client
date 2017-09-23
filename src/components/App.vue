<template>
  <div id="app">
    <nav-bar></nav-bar>
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

@media screen and (min-width: 822px) {
  .adjust-margin {
    margin-left: 330px !important;
  }
}


html {
  overflow: auto !important
}

</style>

<style lang="stylus">
  $color-pack = false
  @import '../stylus/main'
</style>
