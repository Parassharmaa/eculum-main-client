<template>
    <v-dialog v-model="showDialog" width="'600px'" transition="slide-x-reverse-transition">
      <v-card class="round-card">
        <v-card-actions>
        <v-btn icon color="blue darken-1" flat @click.native="showDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        </v-card-actions>
        <v-container fluid xs12 sm6 grid-list-lg>
          <center>
            <v-progress-circular indeterminate class="primary--text" v-if="tw_data.length === 0" v-bind:size="20" v-bind:width="5"></v-progress-circular>
          </center>
          <v-layout row wrap v-show='tw_data.length !== 0'>
            <v-flex xs3 md1>
              <v-avatar>
                <img v-bind:src="tw_data.profile_image_url_https">
              </v-avatar>
            </v-flex>
            <v-flex xs9 md11>
                <div><span class="subheading">{{tw_data.name}}</span>
                <span class="caption"><a :href="'https://twitter.com/'+tw_data.screen_name">
                  @{{tw_data.screen_name}}
                </a>
                </span>
              </div>
            </v-flex>
            <v-flex xs12 md3 v-if="tw_data.location">
              <div class="caption">
                <v-icon>location_on</v-icon>
                {{ tw_data.location}}
              </div>
            </v-flex>
            <v-flex xs12 md9 v-if="tw_data.url">
                <v-icon>link</v-icon>
                <a :href="tw_data.url">{{tw_data.url}}</a>
            </v-flex>
            <v-flex xs12 md12 md12>
                <div class="caption">{{tw_data.description}}</div>
            </v-flex>
            <v-flex class='text-xs-center text-md-left'>
                <v-chip label small class="ml-0 lime">
                  <b>{{tw_data.followers_count}} &nbsp;</b>
                  Followers
                </v-chip>
                <v-chip label small class="ml-0 lime">
                  <b>{{tw_data.friends_count}} &nbsp;</b>
                  Following  
                </v-chip>
            </v-flex>
            <v-flex xs12 md12 class='text-xs-center text-md-left'>
                <v-btn round small @click='follow(tw_data.screen_name)' class='primary blue--text' outline v-if='!tw_data.following'>
                  Follow
                </v-btn>
                <v-btn round small @click='unfollow(tw_data.screen_name)' class='primary' v-if='tw_data.following'>
                  Following
                </v-btn>
                <v-btn round small @click='subscribe(tw_data.screen_name)' outline v-if='!tw_data.notifications && tw_data.following'>
                  Subscribe
                </v-btn>
                <v-btn round small @click='unsubscribe(tw_data.screen_name)' v-if='tw_data.notifications'>
                  Unsubscribe
                </v-btn>
            </v-flex>
            <v-flex>
              <v-divider></v-divider>
              <wordcloud
              :data="cloud_tags"
              nameKey="name"
              valueKey="value"
              v-if='cloud_tags.length > 0'>
              </wordcloud>
              <center>
                <v-progress-circular indeterminate class="primary--text" v-show="load_cloud" v-bind:size="20" v-bind:width="5"></v-progress-circular>
                <div v-if='cloud_tags.length === 0 && load_cloud===false'>No Data Available</div>
              </center>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
import TwUser from '@/api/TwUser'
import wordcloud from 'vue-wordcloud'
import Words from '@/api/Words'

export default {
  props: ['activate', 'username'],
  components: {wordcloud},
  data: () => ({
    tw_data: [],
    cloud_tags: [],
    load_cloud: false
  }),
  computed: {
    showDialog: {
      get: function () {
        return this.activate
      },
      set: function (newValue) {
        this.$emit('close')
        this.tw_data = []
        this.cloud_tags = []
      }
    }
  },
  watch: {
    username: function () {
      this.loadUser()
      this.loadWordCloud()
    }
  },
  mounted () {
    this.tw_data = []
    this.loadUser()
    this.loadWordCloud()
  },
  methods: {
    loadUser () {
      if (this.username) {
        TwUser.user(this.username)
        .then(response => {
          this.tw_data = response.data.data
        })
        .catch(() => {
          this.$store.dispatch('show_error', 'Network Error')
        })
      }
    },
    loadWordCloud () {
      if (this.username) {
        this.load_cloud = true
        Words.usertag(this.username)
        .then(response => {
          for (var i in response.data.data.hashtags) {
            this.cloud_tags.push({'name': i, 'value': response.data.data.hashtags[i]})
          }
          this.load_cloud = false
        })
        .catch(() => {
          this.$store.dispatch('show_error', 'Network Error')
          this.load_cloud = false
        })
      }
    },
    follow (screenName) {
      this.tw_data.following = true
      TwUser.follow(screenName)
      .then(() => {
        this.tw_data.following = true
      })
      .catch(() => {
        this.tw_data.following = false
      })
    },
    unfollow (screenName) {
      this.tw_data.following = false
      TwUser.unfollow(screenName)
      .then(() => {
        this.tw_data.following = false
      })
      .catch(() => {
        this.tw_data.following = true
      })
    },
    subscribe (screenName) {
      this.tw_data.notifications = true
      TwUser.update({'screen_name': screenName, 'do_follow': 1})
      .then(() => {
        this.tw_data.notifications = true
      })
      .catch(() => {
        this.tw_data.notifications = false
      })
    },
    unsubscribe (screenName) {
      TwUser.update({'screen_name': screenName, 'do_follow': 0})
      .then(() => {
        this.tw_data.notifications = false
      })
      .catch(() => {
      })
    }
  }
}
</script>


<style>

</style>