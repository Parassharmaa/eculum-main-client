<template>
  <div>
    <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 lg6 xl6>
        <div class="subheading"> Create Tweet </div>
        <br>
        <v-divider></v-divider>
        <br>
        <v-card class="round-card">
           <v-text-field
              label="What's happening?"
              v-model="cred.tweet"
              :counter="280"
              :rules="[
              () => cred.tweet.length <= 280 || 'Tweet must be less than 280 characters'
              ]"
              full-width
              hide-details
              multi-line
              single-line
              @keyup="write_tweet"
            ></v-text-field>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn primary round disabled v-if="cred.tweet === '' || cred.tweet.length > 280 || sending === true">Tweet</v-btn>
            <v-btn primary round @click="send_tweet" v-if="cred.tweet !== '' && cred.tweet.length <= 280 && sending === false">Tweet</v-btn>
          </v-card-actions>
        </v-card>
        <br>
        <v-card class="round-card">
            <v-flex xs12 sm12 md12>
            <div class='wrap'>
                <v-chip class='hasht-click' @click='replace_tag(w)' v-for="w in words" :key='words.index'>
                  #{{w}}
                </v-chip>
            </div>

            <div v-if="words.length === 0 && hashtags.length===0">
              <span> 
                Suggested hashtags will appear here..
                <v-progress-circular indeterminate class="primary--text" v-show="hashtag_load" v-bind:size="15" v-bind:width="5"></v-progress-circular>
              </span>
            </div>
            <v-divider></v-divider>
            <div class='wrap'>
                <v-chip class='hasht-click' @click="add_tag(h)" v-for="h in hashtags" :key="hashtags.index">
                  #{{h}}
                </v-chip>
            </div>
            <br>
            <span>Worlwide Trending</span>
            <v-divider></v-divider>
            <div class='wrap'>
              <v-progress-circular indeterminate class="primary--text" v-show="worldwide.length ===0" v-bind:size="30" v-bind:width="2"></v-progress-circular>
                <v-chip class='hasht-click' @click="add_tag(h.name.replace('#',''))" v-for="h in worldwide" :key="worldwide.index">
                  {{h.name}}
                </v-chip>
            </div>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md6>
        <div class="subheading"> Preview </div>
        <br>
        <v-divider></v-divider>
        <br>
        <v-card class="round-card">
           <v-card-title primary-title>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img v-bind:src="user.twitter.profile_image">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ user.twitter.name }} 
                  </v-list-tile-title>
                  <v-list-tile-title>
                    <small>@{{ user.twitter.screen_name }}</small>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-title>
          <div class="tweet-sample-area">
            <div v-if="cred.tweet !== ''" v-html="cred.tweet_copy">

            </div>
            <div v-if="cred.tweet === ''">
              Your tweet sample will appear here..
            </div>
          </div>
          <v-divider></v-divider>
          <v-flex xs6 sm12 md6>
          <v-card-actions>
            <v-btn icon>
                <span class="Icon Icon--medium Icon--reply"></span>
            </v-btn>
             <v-spacer></v-spacer>
            <v-btn icon>
              <span class="Icon Icon--medium Icon--retweet"></span>
            </v-btn>
             <v-spacer></v-spacer>
            <v-btn icon>
              <span class="Icon Icon--heart Icon--medium"></span>
            </v-btn>
             <v-spacer></v-spacer>
            <v-btn icon>
              <span class="Icon Icon--medium Icon--analytics"></span>
            </v-btn>
          </v-card-actions>
        </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
import Tweet from '@/api/Tweet'
import _ from 'lodash'
import Predict from '@/api/PredictHashtag'
import Trends from '@/api/Trends'
export default {
  name: 'create_tweet',
  data () {
    return {
      hashtag_load: false,
      user: this.$store.getters.user,
      cred: {
        tweet: this.$store.getters.tweetMsg,
        tweet_copy: ''
      },
      auth_header: {
        'Authorization': localStorage.getItem('eclmtoken')
      },
      words: [],
      hashtags: [],
      worldwide: [],
      sending: false,
      imageList: []
    }
  },
  watch: {
    'cred.tweet': function () {
      this.write_tweet()
    }
  },
  beforeCreate () {
    Trends.worldwide()
    .then(response => {
      this.worldwide = response.data
    })
    .catch(error => {
      this.$store.dispatch('show_error', error.response.data.message)
    })
    .catch(error => {
      console.log(error)
      this.$store.dispatch('show_error', 'Unexpected Error')
    })
  },
  methods: {
    send_tweet () {
      this.sending = true
      Tweet.sendTweet(this.cred)
      .then(response => {
        this.$store.dispatch('show_error', response.data.message)
        this.cred.tweet = ''
        this.words = []
        this.hashtags = []
        this.sending = false
      })
      .catch(error => {
        this.sending = false
        this.$store.dispatch('show_error', error.response.data.message)
      })
      .catch(error => {
        this.sending = false
        console.log(error)
        this.$store.dispatch('show_error', 'Network Error')
      })
    },
    analyse_tweet: _.debounce(function () {
      this.hashtag_load = true
      Predict.get_tags(this.cred.tweet)
      .then(response => {
        this.words = response.data.words
        this.hashtags = response.data.hashtags
        this.hashtag_load = false
      })
      .catch(error => {
        this.hashtag_load = false
        this.$store.dispatch('show_error', error.response.data.message)
      })
      .catch(() => {
        this.hashtag_load = false
        this.$store.dispatch('show_error', 'Cannot get suggestions')
      })
    }, 1000),
    add_tag (tag) {
      tag = tag.replace(' ', '')
      this.cred.tweet += ` #${tag}`
    },
    replace_tag (tag) {
      if (this.cred.tweet.search(`#${tag}`) === -1) {
        this.cred.tweet = this.cred.tweet.toLowerCase().replace(tag, `#${tag}`)
      }
    },
    write_tweet () {
      this.analyse_tweet()
      this.cred.tweet_copy = this.cred.tweet
      this.cred.tweet_copy = this.cred.tweet_copy.replace(/#(\S+)/g, '<span class="ht-highlight">#$1</span>')
      this.cred.tweet_copy = this.cred.tweet_copy.replace(/@(\S+)/g, '<span class="ht-highlight">@$1</span>')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tweet-sample-area {
   text-align:left; 
   word-wrap:break-word; 
   padding: 0px 30px 10px 30px;
   margin-top:-20px;
}
.hasht-click {
  background: #ddd;
  border-radius:4px;
  cursor: pointer;
  font-weight:500;
}
.hasht-click:hover {
  background: #cddc39;
}
.wrap {
  padding:8px;
  word-wrap: break-word;
}

</style>


<style>

.ht-highlight {
  color: #1b95e0;
  font-weight: normal;
}
</style>