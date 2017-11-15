<template>
	<div>
		<v-toolbar flat class="lime">
        <v-list class="pt-3">
          <v-list-tile avatar>
            <v-list-tile-avatar tile>
              <img v-bind:src="user.twitter.profile_image">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ user.twitter.name }}
                <small class="tag red" v-show="user.premium == 0" @click="navigate_to('buy')">
                  Upgrade
                </small>
                <small class="tag green" v-show="user.premium == 1">
                  Premium
                </small>
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="navigate_to('settings')">
                <v-icon>settings</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <br>
      <v-list class="pt-2 round-card">
        <v-list-tile v-bind:class="{lime: $route.path === '/app'}" @click="navigate_to('app')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="side-text">Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-subheader>Insights</v-subheader>
        <v-list-tile v-bind:class="{lime: $route.path === '/app/insights'}" @click="navigate_to('insights_overview')">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="side-text">Overview</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-bind:class="{lime: $route.path === '/app/followers'}" @click="navigate_to('insights_followers')">
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="side-text">Followers</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-bind:class="{lime: $route.path === '/app/following'}" @click="navigate_to('insights_friends')">
          <v-list-tile-action>
            <v-icon>wc</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="side-text">Following</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-bind:class="{lime: $route.path === '/app/arena'}" @click="navigate_to('arena')">
          <v-list-tile-action>
            <v-icon>donut_large</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="side-text">Arena</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-subheader>Compose </v-subheader>
        <v-list-tile v-bind:class="{lime: $route.path === '/app/tweet'}" @click="navigate_to('create_tweet')">
          <v-list-tile-action>
            <v-icon>edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="side-text">Tweet</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-bind:class="{lime: $route.path === '/app/suggestions/articles'}" @click="navigate_to('articles')">
          <v-list-tile-action>
            <v-icon>book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="side-text">Suggested Content</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="side-text">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
	</div>
</template>

<script>

import User from '@/api/User'

export default {
  name: 'sidepanel',
  props: [ 'mini' ],
  data () {
    return {
      user: this.$store.getters.user
    }
  },
  beforeCreate () {
    User.getUser()
    .then(response => {
      this.$store.dispatch('load_user', response.data)
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    toggleMini () {
      let nMini = !this.mini
      this.$emit('toggleMini', nMini)
    },
    logout () {
      this.$store.dispatch('load_user', {})
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    navigate_to (loc) {
      this.$router.push({ name: loc })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.side-text {
  font-size: 13.9px;
}

.text-hd {
  font-size: 15px;
}

router-link {
  text-decoration: none !important;
}

.active {
  background: green
}

.tag {
  font-size: 8px;
  font-weight: 600;
  color:#fff;
  padding:4px;
  margin-left: 1px;
  cursor: pointer;
}

</style>

