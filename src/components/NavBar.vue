<template>
<div>
  <v-app toolbar>
    <v-navigation-drawer absolute persistent light :mini-variant.sync="mini" v-model="drawer" overflow v-if="['login', 'waiting'].indexOf($route.name) === -1">
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/10.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile @click="">
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title> Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title> Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="['login', 'waiting'].indexOf($route.name) === -1"></v-toolbar-side-icon>
      <router-link to="/" style="flex:2; text-decoration:none">
        <v-toolbar-title class="brand-name">Eculum</v-toolbar-title>
      </router-link>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view>
        </router-view>
      </v-container>
    </main>
    <v-footer :absolute="true">
      <span>&copy; Eculum {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>

export default {
  data () {
    return {
      drawer: true,
      mini: false,
      right: null
    }
  },
  methods: {
    toggleNav () {
      this.$refs.leftSidenav.toggle()
    },

    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
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
  text-align: center;
  color:#fff;
}

</style>
<style scoped>
.side-nav-header {
  background: #00BCD4;
  color:#fff;
}

.white-icon {
  color: #fff !important;
}

</style>
