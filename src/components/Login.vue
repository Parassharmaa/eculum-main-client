<template>
	<v-layout row>
    <v-flex>
      <v-card class="login-card" elevation-10>
      	<center>
        <a href="http://localhost:5000/api/v1/auth/twitter" class="btn-url">
          	<v-btn round primary dark class="twitter-color">
          		<img class="btn-icon" src="../assets/Twitter_Social_Icon_Circle_Color.png">
          		Login with Twitter
          	</v-btn>
        </a>
      	<br><br>
      	or
      	<!-- <v-divider></v-divider> -->
    <form v-on:keyup.enter="login">
    <v-text-field
      v-model="cred.email"
      label="E-mail"
      single-line
      :error-messages="errors.collect('email')"
      v-validate="'required|email'"
      data-vv-name="email"
      required
    ></v-text-field>
    <router-link to=''>
      <p class="text-xs-right"> Forgot your password? </p>
    </router-link>
    <v-text-field
      v-model="cred.password"
      label="Password"
      single-line
      hint="At least 8 characters"
      :error-messages="errors.collect('password')"
      v-validate="'required'"
      type="password"
      data-vv-name="password"
      required
      ></v-text-field>

    <v-btn @click="login" primary>Login &nbsp;&nbsp;<v-progress-circular v-show="loading" v-bind:size="15" v-bind:width="5" indeterminate class="white-text" style="flex:1"></v-progress-circular></v-btn>
  </form>
      </center>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import emailLoginAPI from '@/api/EmailLogin'

export default {
  name: 'login',

  $validates: true,

  data () {
    return {
      cred: {
        email: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$validator.validateAll()
      .then(isValidated => {
        if (isValidated) {
          emailLoginAPI.postCred(this.cred)
          .then(response => {
            if (response.status === 200) {
              this.$router.push(response.data.next)
            }
          })
          .catch(error => {
            alert(error.response.data.message)
            this.cred.email = ''
            this.cred.password = ''
            this.loading = false
            this.$validator.clean()
          })
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.twitter-color {
	background-color: #1da1f2 !important;
	color:#fff !important;
}

p {
    text-align: center;
}

.login-card {
	margin: auto;
	margin-top:60px;
	max-width:350px;
	text-align: center;
    padding:15px 30px;
}

.btn-icon {
	width: 36px;
	min-width: 36px;
	height: 36px;
	min-height: 30px;
	font-size: 16px;
	line-height: 36px;
}

.login-card .md-subhead span {
	vertical-align: middle;
}

.login-card .md-icon {
	margin: 8px;
	color: rgba(#000, .54) !important;
}

.login-card .md-button {
	border-radius: 2px !important;
}

.btn-url {
    text-decoration: none;
}
</style>

