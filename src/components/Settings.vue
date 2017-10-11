<template>
  <div>
    <div class="subheading"> Settings </div>
    <v-divider></v-divider>
    <br>
    <v-card class="pa-3">
      <v-text-field
        v-model="data.email"
        label="E-mail"
        :error-messages="errors.collect('email')"
        v-validate="'required|email'"
        data-vv-name="email"
        required
      ></v-text-field>
      <div class="text-xs-right">
      <v-btn
        class="primary"
        @click="change_email"
      >
      {{ loading1 }}
      </v-btn>
      </div>
      <br>
      <v-divider></v-divider>
      <v-text-field
      v-model="pswd.old_password"
      label="Current Password"
      single-line
      :error-messages="errors.collect('password')"
      v-validate="'required'"
      type="password"
      data-vv-name="password"
      required
      ></v-text-field>
      <v-text-field
      v-model="pswd.new_password"
      label="New Password"
      single-line
      :error-messages="errors.collect('password')"
      v-validate="'required'"
      type="password"
      data-vv-name="password"
      required
      ></v-text-field>
      <div class="text-xs-right">
      <v-btn
        class="primary"
        @click="change_password"
      >
      {{ loading2 }}
      </v-btn>
    </div>
    </v-card>
  </div>
</template>

<script>

import User from '@/api/User'

export default{
  data () {
    return {
      loading1: 'Update Email',
      loading2: 'Update Password',
      data: this.$store.getters.user,
      pswd: {
        old_password: '',
        new_password: ''
      }
    }
  },
  methods: {
    change_password () {
      this.loading2 = 'Updating....'
      User.changePassword(this.pswd)
      .then(response => {
        this.$store.dispatch('login', response.data.token).then(res => {
          this.$store.dispatch('show_error', response.data.message)
          this.pswd.old_password = ''
          this.pswd.new_password = ''
          this.loading2 = 'Update Password'
          this.$validator.clean()
        })
      })
      .catch(error => {
        this.$store.dispatch('show_error', error.response.data.message)
        this.loading2 = 'Update Password'
        this.$validator.clean()
      })
      .catch(error => {
        this.$store.dispatch('show_error', 'Unexpected Error')
        this.loading2 = 'Update Password'
        console.log(error)
      })
    },
    change_email () {
      this.loading1 = 'Updating....'
      User.changeEmail({'new_email': this.data.email})
      .then(response => {
        this.$store.dispatch('login', response.data.token).then(res => {
          this.$store.dispatch('show_error', response.data.message)
          this.pswd.old_password = ''
          this.pswd.new_password = ''
          this.loading1 = 'Update Email'
          this.$validator.clean()
        })
      })
      .catch(error => {
        this.$store.dispatch('show_error', error.response.data.message)
        this.loading1 = 'Update Email'
        this.$validator.clean()
      })
      .catch(error => {
        this.$store.dispatch('show_error', 'Unexpected Error')
        this.loading1 = 'Update Email'
        console.log(error)
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

