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
      Not enough data to graph. Please, check back later!
    </v-alert>
    <br>
  </div>
  <v-container>
      <v-layout justify-space-between v-if='data.interest.data.length!==0'>
        <v-flex xs6 sm12 md12>
          <v-menu
            transition="slide-y-transition"
            bottom
          >    
            <v-btn flat small slot="activator">
              <v-icon>filter_list</v-icon>
              &nbsp;Filter by date
            </v-btn>
          <v-list>
            <v-list-tile v-for="item in filter_dates" @click="">
              <v-list-tile-title>{{ item }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
          </v-menu>
           
        </v-flex>
        <v-flex >
            <span></span>
            <v-btn flat small @click="tweet_friends_insight">
            <v-icon>share</v-icon>&nbsp;Share</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
      <v-card :height="'350px'" class="pa-2">
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
  components: { PieChart },
  beforeCreate () {
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
    tweet_friends_insight () {
      let pc = this.data.interest.data[0]
      let lb = this.data.interest.label[0].replace(' ', ' #').replace('', '#')
      let tweetTemp = `My ${pc}% of new twitter friends are interested in ${lb}, Checked via @eculum_ai`
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

