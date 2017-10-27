<template>
	<div>
		<div class="subheading"> Followers </div>
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
      <!-- <v-data-table
      v-bind:headers="headers"
      v-bind:items="data.people"
      v-bind:search="search"
      hide-actions
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
      </v-data-table>  -->
      <v-flex xs12 v-for="item in data.people" v-bind:key="item.username" @click="" >
            <v-card color="cyan darken-2">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs1>
                    <v-avatar>
                      <img v-bind:src="item.profile_image">
                    </v-avatar>
                  </v-flex>
                  <v-flex xs5>
                    <div>
                      <div><span class="subheading">{{item.name}}</span>
                      <span class="caption"><a :href="'https://twitter.com/'+item.username">
                        @{{item.username}}
                      </a>
                      </span>
                    </div>
                      <div class="caption">{{item.bio}}</div>
                      <div>
                        <v-chip small circle outline class="count-m primary">
                          Followers <br>
                          <b>{{item.followers}}</b>
                        </v-chip>
                        <v-chip small outline class="count-m primary">
                          Following <br>
                          <b>{{item.following}}</b>
                        </v-chip>
                      </div>
                    </div>
                  </v-flex>
                  <v-flex xs3>
                    <v-chip>
                    <v-avatar class="primary">{{ item.interests[0] | capitalize }}</v-avatar>
                      {{  item.interests }}
                    </v-chip>
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

export default {
  name: 'insights_overview',
  data () {
    return {
      date: null,
      allowedDates: [],
      search: '',
      pagination: {},
      selected: [],
      headers: [
        { text: '', value: '', sortable: false },
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Username', value: 'username', align: 'left' },
        { text: 'Interest', value: 'interests', align: 'left' },
        { text: 'Followers', value: 'followers' },
        { text: 'Following', value: 'following' }
      ],
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

</style>

