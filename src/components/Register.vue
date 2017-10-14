<template>
	<v-layout row>
    <v-flex>
      <v-card class="login-card" elevation-10 transition="slide-x-transition">
      	<center>
          <p>Last Step...</p>
    <form v-on:keyup.enter="register">
    <v-text-field
      v-model="cred.email"
      label="E-mail"
      single-line
      :error-messages="errors.collect('email')"
      v-validate="'required|email'"
      data-vv-name="email"
      required
    ></v-text-field>
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
      <div class="text-xs-center caption"> By clicking on Register you accept our <br> 
        <a href=""> Terms & Condition  </a>
      </div>
      <br>
    <v-btn @click="register" primary>Register &nbsp;&nbsp;<v-progress-circular v-show="loading" v-bind:size="15" v-bind:width="5" indeterminate class="white-text" style="flex:1"></v-progress-circular></v-btn>
  </form>
      </center>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import emailRegisterAPI from '@/api/EmailRegister'

export default {
  name: 'register',

  $validates: true,

  data () {
    return {
      cred: {
        email: '',
        password: '',
        register_token: ''
      },
      loading: false
    }
  },
  created () {
    this.cred.register_token = this.$route.query.token
    if (this.cred.register_token === undefined) {
      this.$store.dispatch('show_error', 'Please Try Again Later')
      this.$router.push('/')
    }
  },
  methods: {
    register () {
      this.loading = true
      this.$validator.validateAll()
      .then(isValidated => {
        if (isValidated) {
          emailRegisterAPI.postCred(this.cred)
          .then(response => {
            if (response.status === 200) {
              this.$router.push(response.data.next)
            }
          })
          .catch(error => {
            this.$store.dispatch('show_error', error.response.data.message)
            this.loading = false
            this.$validator.clean()
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch('show_error', 'Unexpected Error')
            this.loading = false
            console.log(error)
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
    font-size: 22px
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

