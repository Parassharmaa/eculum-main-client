<template>
  <div>
    <center>
      <ecl-loader-l></ecl-loader-l>
    </center>
    <div v-if="!$store.getters.pending">
    <br>
    <div style="font-size:1.6rem">Welcome {{user.twitter.name }}</div>
    <v-divider></v-divider>
    <br>
    <v-alert
      class='grey vert-center round-card'
      :value="true"
      transition="scale-transition">
      {{action_s}}
      <router-link tag='span' :to="{ name: 'create_tweet'}">
        <v-btn round small class="primary">
            Get Started > 
        </v-btn>
        </router-link>
    </v-alert>
    <br>
    <div class="subheading text-xs-center">Here are your recently used keywords!</div>
    <v-card class="round-card">
      <wordcloud
      :data="tags"
      nameKey="name"
      valueKey="value">
      </wordcloud>
      <div xs12 v-if="tags.length > 0">
        <div class="subheading">
          &nbsp;Recent keywords
          <v-divider></v-divider>
        </div>
        <div class="text-xs-center">
          <v-chip v-for='w in tags'  v-bind:key="w.name" class="lime" @click="tweet_tag(w.name)" label>#{{w.name}}</v-chip>
        </div>
      </div>
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
  },
  methods: {
    tweet_tag (t) {
      let tweetTemp = `#${t}`
      this.$store.dispatch('set_tweet', tweetTemp)
      this.$router.push({ name: 'create_tweet' })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

