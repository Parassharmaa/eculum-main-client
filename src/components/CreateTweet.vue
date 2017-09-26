<template>
	<div>
    <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6 sm12 md6>
        <div class="subheading"> Create Tweet </div>
        <br>
        <v-divider></v-divider>
        <br>
        <v-card>
           <v-text-field
              label="What's happening?"
              v-model="tweet"
              counter
              max="140"
              full-width
              hide-details
              multi-line
              single-line
            ></v-text-field>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn primary round>Tweet</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs6 sm12 md6>
        <div class="subheading"> Preview </div>
        <br>
        <v-divider></v-divider>
        <br>
        <v-card>
           <v-card-title primary-title>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img v-bind:src="user.twitter.profile_image">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ user.twitter.name }} 
                    <small>@{{ user.twitter.screen_name }}</small>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                {{tweet}}
              </v-list-tile>
            </v-list>
            <div>
              
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions class="white">
            <v-btn icon>
              <v-icon>reply</v-icon>
            </v-btn>
             <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>refresh</v-icon>
            </v-btn>
             <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>
             <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>message</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>

export default {
  name: 'create_tweet',
  data () {
    return {
      user: this.$store.getters.user,
      tweet: 'hello'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

