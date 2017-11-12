<template>
	<div>
		<div class="subheading"> Buy premium version </div>
    <v-divider></v-divider>
     <v-layout row justify-center>
    <v-dialog v-model="paymentd" persistent width="'600px'" transition="slide-y-transition">
      <v-card class="round-card">
        <v-card-title>
          <span class="headline">Details</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field 
                  label="First name" 
                  required
                  v-model="data.fname"
                  data-vv-name="first name"
                  v-validate="'required'"
                  :error-messages="errors.collect('first name')"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field 
                  label="Last name" 
                  required
                  v-model="data.lname"
                  data-vv-name="fname"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field 
                  label="Email*" 
                  required
                  v-model="data.email"
                  :error-messages="errors.collect('email')"
                  v-validate="'required|email'"
                  data-vv-name="email"
                  required
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field 
                  label="Country" 
                  required
                  :error-messages="errors.collect('country')"
                  v-model="data.country"
                  v-validate="'required'"
                  data-vv-name="country"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small><br>
          <small>**payment invoice will be sent to your email</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="paymentd = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click='request_submit'>Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
    <br>
    <v-container sm6 wrap grid-list-lg>
    <v-layout row wrap>
    <v-flex d-flex sm12 md7>
        <v-carousel class="elevation-0 round-card">
        <v-carousel-item v-for="f in cfeatures"v-bind:key="f.id" v-bind:src="'a'">
            <v-card class="round-card" style="width: 100%; height:100%; margin-bottom:100px">
              <img
                :src="f.img"
                height="380px"
                width="100%"
                style="object-fit: scale-down"
              >
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ f.headline }}</div>
                  <span class="grey--text">{{ f.caption }}</span>
                </div>
              </v-card-title>
            </v-card>
      </v-carousel-item>
     </v-carousel>
    </v-flex>
    <v-flex xs12 sm12 md5>
      <v-card class="elevation-5 round-card">
        <div class="white--text primary pt-4 pb-3 text-xs-center elevation-5">
            <div class="display-1 pt-4 pb-3">{{price}}</div>
        </div>
        <v-list two-line> 
          <div v-for="lf in features" v-bind:key="lf.id">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ lf.headline }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ lf.caption }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
        </v-list>
        <div class="text-xs-center">
          <v-btn round large class="primary" @click='paymentd=!paymentd'>Buy now</v-btn>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
	</div>
</template>

<script>
import User from '@/api/User'

export default {
  data () {
    return {
      paymentd: false,
      data: {
        fname: '',
        lname: '',
        email: '',
        country: ''
      },
      cfeatures: [
        {
          id: 0,
          headline: 'Go unlimited',
          caption: 'Unlock all features now',
          img: '/static/features/1.png'
        },
        {
          id: 1,
          headline: 'Grow',
          caption: 'Explore audience growth and your domain',
          img: '/static/features/2.png'
        },
        {
          id: 2,
          headline: 'Analyse audience',
          caption: 'Check audience interests',
          img: '/static/features/4.png'
        },
        {
          id: 3,
          headline: 'Profile View and actions',
          caption: 'View profile at glance',
          img: '/static/features/5.png'
        },
        {
          id: 4,
          headline: 'Competitive Analysis',
          caption: 'Compare your profile with others',
          img: '/static/features/7.png'
        },
        {
          id: 5,
          headline: 'Increase your reach',
          caption: 'Grow your audience reach with suggested hashtags',
          img: '/static/features/9.png'
        }
      ],
      features: [
        {
          id: 0,
          headline: 'Followers and Following Insight',
          caption: 'Analyse audience interests and domain'
        },
        {
          id: 1,
          headline: 'Arena: Competitive Analysis',
          caption: 'Match and analyse your profile with others'
        },
        {
          id: 2,
          headline: 'Compose Tweet',
          caption: 'Tweet using powerful hashtags for max impresssions'
        },
        {
          id: 3,
          headline: 'Tweet scheduling',
          caption: 'Coming soon'
        }
      ],
      price: '$ 7.99'
    }
  },
  methods: {
    request_submit () {
      this.$validator.validateAll()
      .then(isValidated => {
        if (isValidated) {
          User.premiumRequest(this.data)
          .then((reponse) => {
            this.$store.dispatch('show_error', 'Thanks, We will contact you soon')
            this.paymentd = false
            this.rdata = {}
          })
          .catch(() => {
            this.$store.dispatch('show_error', 'An error occurred')
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

