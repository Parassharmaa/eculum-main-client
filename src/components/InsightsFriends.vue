<template>
  <div>
    <div class="subheading" v-if="!date"> Following: <strong><small>{{ "Recent" }}</small></strong></div>
    <div class="subheading" v-if="date"> Following: <strong><small>{{ date }}</small></strong></div>
    <v-divider></v-divider>
    <center>
      <ecl-loader-l></ecl-loader-l>
    </center>
    <div v-if="!$store.getters.pending">
      <div v-if='data.interest.data.length===0'>
    <v-alert
      class="primary"
      :value="true"
      transition="scale-transition">
      You followed no one on {{ date }}
    </v-alert>
    <br>
  </div>
  <v-container>
      <v-layout row justify-space-between>
        <user-dialog :activate='dialogShow' @close='closeDialog' :username="username"></user-dialog>
        <v-flex xs6 sm12 md12 xs8>  
            <v-menu
              :close-on-content-click="true"
              transition="slide-x-reverse-transition"
              offset-y
            >
            <v-btn
              slot="activator"
              label="Filter by date"
              flat small
            >
            <v-icon>filter_list</v-icon>
            &nbsp;Filter</v-btn>
            <v-date-picker v-model="date" :allowed-dates="allowedDates">
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="reload">View Recent</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex>
            <span></span>
            <v-btn flat small @click="tweet_friends_insight">
            <v-icon>share</v-icon>&nbsp;Share</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
      <v-card :height="'350px'" class="pa-2 round-card" v-if='data.interest.data.length!==0'>
        <pie-chart 
          :heading="heading" 
          :data="data.interest.data"
          :label="data.interest.label"
        ></pie-chart>
      </v-card>
      <br>
      <v-flex xs12 v-for="item in data.people" v-bind:key="item.username" @click="" >
            <v-card class="hover-raise elevation-2" ripple @click.stop="load_user(item.username)">
              <v-container fluid xs12 sm6 grid-list-lg>
                <v-layout row wrap>
                  <v-flex xs3 md1>
                    <v-avatar>
                      <img v-bind:src="item.profile_image">
                    </v-avatar>
                  </v-flex>
                  <v-flex xs12 md6>
                    <div>
                      <div><span class="subheading">{{item.name}}</span>
                      <span class="caption"><a :href="'https://twitter.com/'+item.username">
                        @{{item.username}}
                      </a>
                      </span>
                    </div>
                      <div class="caption">{{item.bio}}</div>
                      <div>
                        <v-chip label small class="ml-0 lime">
                          Followers <br>
                          <b>{{item.followers}}</b> 
                        </v-chip>
                        <v-chip label small class="ml-0 lime">
                          Following <br>
                          <b>{{item.following}}</b>  
                        </v-chip>
                      </div>
                    </div>
                  </v-flex>
                  <v-flex xs12 md5>
                    <v-avatar class="red white--text" tile :size="'25px'">{{ item.interests[0] | capitalize }}</v-avatar>
                      <strong>{{  item.interests | capitalize }}</strong>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
    </div>
  </div>
</template>

<script>
import Insights from '@/api/Insights'
import PieChart from './charts/PieChart.js'
import UserDialog from './common/UserDialog'

export default {
  name: 'insights_overview',
  components: { PieChart, UserDialog },
  data () {
    return {
      date: null,
      dialogShow: false,
      username: '',
      allowedDates: [],
      search: '',
      pagination: {},
      selected: [],
      filter_dates: ['Recent', '2017-10-19'],
      headers: [
        { text: '', value: '', sortable: false },
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Username', value: 'username', align: 'left' },
        { text: 'Interest', value: 'interests', align: 'center' },
        { text: 'Followers', value: 'followers' },
        { text: 'Following', value: 'following' }
      ],
      data: this.$store.getters.insights_friends,
      heading: 'Following\'s Interest %'
    }
  },
  watch: {
    date: function (newV) {
      this.$store.state.pending = true
      Insights.friends_filter(newV)
      .then(response => {
        this.$store.dispatch('load_insights_friends', response.data.data)
      })
      .catch(() => {
        this.$store.dispatch('show_error', 'Network Error')
      })
    }
  },
  beforeCreate () {
    Insights.dates()
    .then(response => {
      this.allowedDates = response.data.data.dates
    })
    .catch(() => {
      this.$store.dispatch('show_error', 'Network Error')
    })
    this.$store.state.pending = true
    Insights.friends()
    .then(response => {
      this.$store.dispatch('load_insights_friends', response.data.data)
    })
    .catch(() => {
      this.$store.dispatch('show_error', 'Network Error')
    })
  },
  methods: {
    reload () {
      Insights.dates()
      .then(response => {
        this.allowedDates = response.data.data.dates
      })
      .catch(() => {
        this.$store.dispatch('show_error', 'Network Error')
      })
      this.$store.state.pending = true
      Insights.friends()
      .then(response => {
        this.$store.dispatch('load_insights_friends', response.data.data)
      })
      .catch(() => {
        this.$store.dispatch('show_error', 'Network Error')
      })
    },
    tweet_friends_insight () {
      let i = parseInt(Math.random(10) * 100 % this.data.interest.data.length)
      let pc = this.data.interest.data[i]
      let lb = this.data.interest.label[i].replace(' ', ' #').replace('', '#')
      let tweetTemp = `${pc}% of people that I follow are interested in ${lb}, Checked via @eculum_ai`
      this.$store.dispatch('set_tweet', tweetTemp)
      this.$router.push({ name: 'create_tweet' })
    },
    load_user (username) {
      this.dialogShow = true
      this.username = username
    },
    closeDialog () {
      this.dialogShow = false
      this.username = ''
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.border-img {
  margin: 8px auto;
}

.pa4 {
  width:100%;
  padding: 16px 4px 20px 4px;
}

.hover-raise:hover {
  box-shadow: 5px 8px 10px 10px #eee;
  cursor: pointer;
  background: #eee;
}
</style>

