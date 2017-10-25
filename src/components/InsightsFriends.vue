<template>
  <div>
    <div class="subheading"> Following </div>
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
      You followed no one on {{ date }}
    </v-alert>
    <br>
  </div>
  <v-container>
      <v-layout row justify-space-between>
        <v-flex xs6 sm12 md12 xs8>  
            <v-menu
              :close-on-content-click="true"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
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
      <v-card :height="'350px'" class="pa-2" v-if='data.interest.data.length!==0'>
        <pie-chart 
          :heading="heading" 
          :data="data.interest.data"
          :label="data.interest.label"
        ></pie-chart>
      </v-card>
      <br>
      <v-data-table
      v-bind:headers="headers"
      v-bind:items="data.people"
      v-bind:search="search"
      hide-actions
      :expand='true'
      class="elevation-1"
      >
        <template slot="items" scope="props">
            <td class="text-xs-left">
              <v-avatar tile class="border-img">
                <img v-bind:src="props.item.profile_image">
              </v-avatar>
            </td>
            <td class="text-xs-left">
                {{ props.item.name }}
            </td>
            <td  class="text-xs-left">@{{ props.item.username }}</td>
            <td  class="text-xs-left">
              <v-chip>
                <v-avatar class="primary">{{ props.item.interests[0] | capitalize }}</v-avatar>
                {{ props.item.interests }}
              </v-chip>
            </td>
            <td  class="text-xs-right">{{ props.item.followers }}</td>
            <td  class="text-xs-right">{{ props.item.following }}</td>
        </template>
      </v-data-table> 
    </div>
  </div>
</template>

<script>
import Insights from '@/api/Insights'
import PieChart from './charts/PieChart.js'

export default {
  name: 'insights_overview',
  data () {
    return {
      date: null,
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
  components: { PieChart },
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

</style>

