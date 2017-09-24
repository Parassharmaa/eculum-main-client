<template>
	<div>
		<p> Overview </p>
    <center>
      <v-progress-circular indeterminate class="primary--text" v-show="$store.getters.pending" v-bind:size="90" v-bind:width="1"></v-progress-circular>
    </center>
    <div v-if="!$store.getters.pending">
      {{ test }}
      <v-layout column>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <line-chart :data="tdata" :labels="tlabels" :heading="theading"></line-chart>
      </v-card>
    </v-flex>
  </v-layout>
    </div>
	</div>
</template>

<script>
import Insights from '@/api/Insights'
import LineChart from './charts/LineChart'

export default {
  name: 'insights_overview',
  data () {
    return {
      test: this.$store.getters.insights_overview,
      tdata: [12, 19, 3, 5, 2, 3],
      tlabels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      theading: 'This is heading'
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


</style>

