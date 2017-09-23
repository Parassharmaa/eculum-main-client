<template>
	<div>
		<p>Followers Insights </p>
    <center>
  		<v-progress-circular indeterminate class="primary--text" v-show="$store.getters.pending" v-bind:size="90" v-bind:width="1"></v-progress-circular>
    </center>
    <div v-if="!$store.getters.pending">
    {{ test }}
    </div>
	</div>
</template>

<script>
import Insights from '@/api/Insights'

export default {
  name: 'insights_overview',
  data () {
    return {
      test: this.$store.getters.insights_followers
    }
  },
  beforeCreate () {
    this.$store.state.pending = true
    Insights.followers()
    .then(response => {
      this.$store.dispatch('load_insights_followers', response.data.data)
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

