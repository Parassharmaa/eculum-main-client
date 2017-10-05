<template>
	<div>
		<div class="subheading"> Overview </div>
    <v-divider></v-divider>
    <br>
    <center>
      <v-progress-circular indeterminate class="primary--text" v-show="$store.getters.pending" v-bind:size="90" v-bind:width="1"></v-progress-circular>
    </center>
    <div v-if="!$store.getters.pending">
    <v-card class='pa-2'>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 xl12 style="text-align:center">
      <v-chip label outline class="count-m primary">
          Followers <br>
          <b>{{data.followers.toLocaleString()}}</b>
        </v-chip>
        <v-chip label outline class="count-m primary">
          Friends <br>
          <b>{{data.friends.toLocaleString()}}</b>
        </v-chip>
        <v-chip label outline class="count-m primary">
          Tweets <br>
          <b>{{data.tweets.toLocaleString() }}</b>
        </v-chip>
        <v-chip label outline class="count-m primary">
          Likes <br>
          <b>{{data.likes.toLocaleString() }}</b>
        </v-chip>
        <v-chip label outline class="count-m primary">
          Followers <br>
          <b>{{ data.avg_friend_growth }}%</b>
        </v-chip>
        <v-chip label outline class="count-m primary">
          Friends <br>
          <b>{{ data.avg_friend_growth }}%</b> 
        </v-chip>
      </v-flex>
      <v-flex xs12 sm12 md6 xl6 style="text-align:center">
          <line-chart :data="data.pgrowth.data" :labels="data.pgrowth.labels" :heading="data.pgrowth.heading"></line-chart>
      </v-flex>
      <v-flex xs12 sm12 md6 xl6 style="text-align:center">
        <line-chart :data="data.growth.data" :labels="data.growth.labels" :heading="data.growth.heading"></line-chart>
      </v-flex>
    </v-layout>
  </v-card>
    </div>
	</div>
</template>

<script>
import Insights from '@/api/Insights'
import LineChart from './charts/LineChart.js'

export default {
  name: 'insights_overview',
  data () {
    return {
      test: this.$store.getters.insights_overview,
      data: {
        pgrowth: {
          data: [[12, 19, 3, 5, 2, 3], [-2, 9, 13, 15, 12, 7]],
          labels: ['29 sept', '30 sept', '1 oct', '2 oct', '3oct', '4oct'],
          heading: ['followers growth', 'friends growth']
        },
        growth: {
          data: [[200, 205, 220, 223, 290, 301], [400, 400, 400, 404, 404, 410]],
          labels: ['29 sept', '30 sept', '1 oct', '2 oct', '3oct', '4oct'],
          heading: ['followers count', 'friends count']
        },
        followers: 237,
        friends: 201,
        tweets: 555,
        likes: 2123,
        avg_follower_growth: 3.3,
        avg_friend_growth: 0.2
      }
    }
  },
  components: { LineChart },
  beforeCreate () {
    this.$store.state.pending = true
    Insights.overview()
    .then(response => {
      this.$store.dispatch('load_insights_overview', response.data.data)
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .count-m {
    padding:8px;
  }
</style>

