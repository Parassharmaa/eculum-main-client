<template>
<div>
  <v-app toolbar>
    <v-snackbar
      :timeout="10000"
      :top="true"
      v-model="$store.state.err.show">
      {{ $store.getters.errorInfo }}
      <v-btn flat class="lime--text" @click.native="$store.state.err.show = false">Close</v-btn>
    </v-snackbar>
    <v-navigation-drawer persistent fixed :mini-variant.sync="mini" v-model="drawer" v-if="['login', 'waiting', 'register'].indexOf($route.name) === -1">
      <side-panel :mini='mini' @toggleMini="toggleMini"></side-panel>
    </v-navigation-drawer>
    <v-toolbar fixed class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="['login', 'waiting', 'register'].indexOf($route.name) === -1" style="color:#fff"></v-toolbar-side-icon>
      <router-link to="/" style="flex:1;text-decoration:none">
        <v-toolbar-title class="brand-name">Eculum</v-toolbar-title>
      </router-link>
      <v-menu transition="slide-y-transition" bottom>
        <v-btn icon slot="activator" dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="">
            <v-list-tile-title>
              <v-icon>help</v-icon>
              Help
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view>
        </router-view>
      </v-container>
    </main>
    <v-footer fixed>
      <span>&copy; Eculum {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>

import SidePanel from './SidePanel.vue'

export default {
  data () {
    return {
      drawer: true,
      mini: false,
      right: null
    }
  },
  components: { SidePanel },
  methods: {
    toggleMini (mini) {
      this.mini = mini
    },
    toggleNav () {
      this.$refs.leftSidenav.toggle()
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.brand-name {
  font-family: 'Offside', cursive;
  text-transform: uppercase;
  font-size: 1.6em !important;
  color:#fff;
  text-align: center
}

</style>
<style scoped>
.side-nav-header {
  background: #00BCD4;
  color:#fff;
}

main {
  background: #efefef;
}

.white-icon {
  color: #fff !important;
}

</style>
