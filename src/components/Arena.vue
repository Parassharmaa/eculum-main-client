<template>
  <div>
    <div class="subheading">Arena:
            Compare your profile with others
    </div>
    <v-divider></v-divider>
    <center>
      <v-progress-circular indeterminate class="primary--text" v-show="$store.getters.pending" v-bind:size="90" v-bind:width="1"></v-progress-circular>
    </center>
    <div v-if="!$store.getters.pending">
    <br>
    <v-card>
    <v-container fluid xs12 sm6 grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-flex xs12>
            <br>
            <v-avatar tile :size="'35px'">
              <img v-bind:src="user.twitter.profile_image">
            </v-avatar>
            <span class="subheading">{{user.twitter.name}}</span>
            <span class="caption">
              <a :href="'https://twitter.com/'+user.twitter.screen_name">
                @{{user.twitter.screen_name}}
              </a>
            </span>
          </v-flex>
          <v-flex sm12 md12>
            <wordcloud
            :data="tags"
            nameKey="name"
            valueKey="value">
            </wordcloud>
          </v-flex>
        </v-flex>
        <v-flex xs12 md6>
          <v-flex sm6>
            <v-text-field
              v-bind:items="user_slug"
              v-model="user2"
              label="Username to compare"
              @keyup='get_user'
              prepend-icon="@"
              single-line
            ></v-text-field>
             </v-flex>
            <v-flex sm12 md12>
              <wordcloud
              :data="o_tags"
              nameKey="name"
              valueKey="value"
              v-if='o_tags.length > 0'>
              </wordcloud>
              <center>
              <div v-if='user2.length > 0 && o_tags.length === 0 && load_user===false'>No Data Available</div>
              <v-progress-circular indeterminate class="primary--text" v-show="load_user" v-bind:size="20" v-bind:width="5"></v-progress-circular>
            </center>
            </v-flex>
          </v-flex>
          <v-flex xs12 v-if="o_tags.length > 0">
            <div class="subheading">
              Common Words
              <v-divider></v-divider>
            </div>
            <div class="text-xs-center">
              <v-chip v-for='w in common_words' class="lime" v-if='common_words.length > 0' label>#{{w.name}}</v-chip>
              <span class="caption" v-if='common_words.length === 0'>No Common Words!</span>
            </div>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
    </v-card>
    </div>
  </div>

</template>


<script>

import wordcloud from 'vue-wordcloud'
import Words from '@/api/Words'
import _ from 'lodash'

export default{
  components: { wordcloud },
  data () {
    return {
      user2: '',
      user_slug: ['paraazz', 'eculum_ai'],
      user: this.$store.getters.user,
      tags: [],
      o_tags: [],
      load_user: false,
      action_s: 'Reach more people using hashtag recommender',
      common_words: []
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
  watch: {
    o_tags: function () {
      this.common_words = _.intersectionBy(this.tags, this.o_tags, 'name')
    }
  },
  methods: {
    get_user: _.debounce(function (e) {
      this.o_tags = []
      if (e.target.value.length > 0) {
        this.load_user = true
        Words.usertag(e.target.value)
        .then(response => {
          for (var i in response.data.data.hashtags) {
            this.o_tags.push({'name': i, 'value': response.data.data.hashtags[i]})
          }
          this.load_user = false
        })
        .catch(() => {
          this.load_user = false
          this.$store.dispatch('show_error', 'Profile is private or not available')
        })
        .catch(() => {
          this.load_user = false
          this.$store.dispatch('show_error', 'Network Error')
        })
      }
    }, 1000)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-align {
  vertical-align: center;
}
</style>

