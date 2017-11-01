<template>
	<div>
		<div class="subheading" v-if="!date"> Followers: <strong><small>{{ "Recent" }}</small></strong></div>
    <div class="subheading" v-if="date"> Followers: <strong><small>{{ date }}</small></strong></div>
    <v-divider></v-divider>
    <center>
  		<v-progress-circular indeterminate class="primary--text" v-show="$store.getters.pending" v-bind:size="90" v-bind:width="1"></v-progress-circular>
    </center>
    <div v-if="!$store.getters.pending">
      <div v-if='data.interest.data.length===0'>
    <v-alert
      class="primary"
      :value="true"
      transition="scale-transition">
      No followers activity on {{ date }}
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
            <v-btn flat small @click="tweet_followers_insight">
            <v-icon>share</v-icon>&nbsp;Share</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
      <v-card :height="'350px'" class="pa-2" v-if='data.interest.data.length!==0'>
        <pie-chart 
          :heading="heading" 
          :data="data.interest.data"
          :label="data.interest.label"
        ></pie-chart>
      </v-card>
      <br>
      <v-divider></v-divider>
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
      dialogShow: false,
      date: null,
      username: '',
      allowedDates: [],
      data: this.$store.getters.insights_followers,
      heading: 'Followers\'s Interest %'
    }
  },
  watch: {
    date: function (newV) {
      this.$store.state.pending = true
      Insights.followers_filter(newV)
      .then(response => {
        this.$store.dispatch('load_insights_followers', response.data.data)
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
    Insights.followers()
    .then(response => {
      this.$store.dispatch('load_insights_followers', response.data.data)
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
      Insights.followers()
      .then(response => {
        this.$store.dispatch('load_insights_followers', response.data.data)
      })
      .catch(() => {
        this.$store.dispatch('show_error', 'Network Error')
      })
    },
    tweet_followers_insight () {
      let i = parseInt(Math.random(10) * 100 % this.data.interest.data.length)
      let pc = this.data.interest.data[i]
      let lb = this.data.interest.label[i].replace(' ', ' #').replace('', '#')
      let tweetTemp = `My ${pc}% of new followers are interested in ${lb}, Checked via @eculum_ai`
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
    },
    truncate: function (value) {
      if (value.length > 10) {
        value.slice(0, 10)
        return value
      }
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

