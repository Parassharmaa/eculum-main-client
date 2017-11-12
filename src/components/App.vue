<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>

import Layout from './Layout.vue'

export default {
  name: 'app',
  components: { Layout },
  data () {
    return {
      showError: this.$store.getters.errorShow
    }
  }
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

.round-card {
  border-radius: 16px !important;
}
</style>

<style lang="stylus">
  $color-pack = false
  @import '../stylus/main'
</style>
