<template>
	<div>
		<div class="subheading"> Overview </div>
    <v-divider></v-divider>
    <br>
    <center>
      <v-progress-circular indeterminate class="primary--text" v-show="$store.getters.pending" v-bind:size="90" v-bind:width="1"></v-progress-circular>
    </center>
    <div v-if="!$store.getters.pending">
    <div v-if='data.growth.data[0].length==0 || data.pgrowth.data[0].length==0'>
    <v-alert
      class="primary"
      :value="true"
      transition="scale-transition">
      Not enough data to graph. Please, check back later!
    </v-alert>
    <br>
  </div>
    <v-card class='pa-2'>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 xl12 style="text-align:center">
      <v-chip label outline class="count-m primary">
          Followers <br>
          <b>{{data.followers.toLocaleString()}}</b>
        </v-chip>
        <v-chip label outline class="count-m primary">
          Following <br>
          <b>{{data.friends.toLocaleString()}}</b>
        </v-chip>
        <v-chip label outline class="count-m primary">
          Tweets <br>
          <b>{{data.tweets.toLocaleString() }}</b>
        </v-chip>
        <v-chip label outline class="count-m primary">
          Likes <br>
          <b>{{ data.likes.toLocaleString() }}</b>
        </v-chip>
        <v-chip label outline class="count-m primary">
          New Followers Rate <br>
          <b>{{ data.avg_followers_growth }}%</b>
        </v-chip>
        <v-chip label outline class="count-m primary">
          New Following Rate <br>
          <b>{{ data.avg_friends_growth }}%</b> 
        </v-chip>
      </v-flex>
      <v-flex xs12 sm12 md6 xl6 style="text-align:center">
          <line-chart 
            :data="data.pgrowth.data" 
            :labels="data.pgrowth.labels" 
            :label='data.pgrowth.label' 
            :heading="data.pgrowth.heading"
            :yaxis="'%'"
            :xaxis="'Days'">
          </line-chart>
      </v-flex>
      <v-flex xs12 sm12 md6 xl6 style="text-align:center">
        <line-chart 
          :data="data.growth.data" 
          :labels="data.growth.labels" 
          :label='data.growth.label' 
          :heading="data.growth.heading"
          :yaxis="'Count'"
          :xaxis="'Days'">
        </line-chart>

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
      data: this.$store.getters.insights_overview
    }
  },
  components: { LineChart },
  beforeCreate () {
    this.$store.state.pending = true
    Insights.overview()
    .then(response => {
      console.log(this.data)
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

