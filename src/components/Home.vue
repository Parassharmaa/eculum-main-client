<template>
  <div>
    <center>
      <v-progress-circular indeterminate class="primary--text" v-show="$store.getters.pending" v-bind:size="90" v-bind:width="1"></v-progress-circular>
    </center>
    <div v-if="!$store.getters.pending">
    <br>
    <div style="font-size:1.3rem">Welcome {{user.twitter.name }}, Here are your recently used words from tweets</div>
    <v-divider></v-divider>
    <br>
    <v-alert
      class='grey vert-center'
      :value="true"
      transition="scale-transition">
      {{action_s}}
      <router-link tag='span' :to="{ name: 'create_tweet'}">
        <v-btn round small class="primary">
            Get Started > 
        </v-btn>
        </router-link>
    </v-alert>
    <v-card>
      <wordcloud
      :data="tags"
      nameKey="name"
      valueKey="value">
      </wordcloud>
   </v-card>
    </div>
  </div>
</template>

<script>

import wordcloud from 'vue-wordcloud'
import Words from '@/api/Words'
export default{
  components: { wordcloud },
  data () {
    return {
      user: this.$store.getters.user,
      tags: [],
      action_s: 'Reach more people using hashtag recommender'
    }
  },
  beforeCreate () {
    this.$store.state.pending = true
    Words.tags()
    .then(response => {
      for (var i in response.data.data.hashtags) {
        this.tags.push({'name': i, 'value': response.data.data.hashtags[i]})
      }
      if (this.tags.length === 0) {
        this.action_s = 'It looks like that you have not tweeted anything yet!'
      }
      this.$store.state.pending = false
    })
    .catch((e) => {
      this.$store.dispatch('show_error', 'Network Error')
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

