<template>
	<div>
		<div class="subheading">Suggested Articles</div>
    <v-divider></v-divider>
    <center>
		<ecl-loader-l></ecl-loader-l>
    </center>
    <div v-if="!$store.getters.pending">
      <div v-if='articles.length===0'>
        <br>
        <v-alert
          class="primary"
          :value="true"
          transition="scale-transition">
          Suggestions are empty, we are curating your interest check back later
        </v-alert>
        <br>
      </div>
      <br>
    <v-layout column>
    <v-flex xs12 sm8 offset-sm2>
      <v-container class="round-card" fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            xs12
            v-for="article in articles"
            :key="article.title"
          >
            <v-card class="round-card elevation-6">
              <v-card-media
                :src="article.image"
                height="200px"
                class="image-effect"
                @click="visit_url(article.url)"
              >
              </v-card-media>
              <div class="subheading a-title" v-text="article.title"></div>
              <div class="a-description">
                <span v-text="article.description"></span>
              </div>
              <v-card-actions class="white">
                <v-btn icon @click='share_article(article)'>
                  <v-icon>share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
	 </div>
  </div>
</template>

<script>
import Suggestions from '@/api/TwSuggestions'

export default {
  name: 'sugg_articles',
  data () {
    return {
      articles: [],
      show: false
    }
  },
  beforeCreate () {
    this.$store.state.pending = true
    Suggestions.suggArticles()
    .then(response => {
      this.articles = response.data.articles
      this.$store.state.pending = false
    })
    .catch((e) => {
      this.$store.dispatch('show_error', 'Network Error')
    })
  },
  methods: {
    visit_url (url) {
      window.open(url, '_blank').focus()
    },
    share_article (t) {
      let tweetTemp = `${t.title} ${t.url}`
      this.$store.dispatch('set_tweet', tweetTemp)
      this.$router.push({ name: 'create_tweet' })
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

.a-title {
  padding:8px;
  text-align: justify;

}

.a-description {
  padding:8px;
  font-size: 10px;
  text-align: justify;

}

.image-effect {
  filter: grayscale(90%);
  filter: opacity(80%);
  cursor: pointer;
}

.image-effect:hover {
  filter: grayscale(0%);
  filter: opacity(100%);
}
</style>

