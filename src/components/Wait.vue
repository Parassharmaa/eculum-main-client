<template>
	<div>
    <center>
      <v-progress-circular indeterminate class="primary--text" v-bind:size="90" v-bind:width="1"></v-progress-circular>
    </center>
  </div>
</template>

<script>
import jwtAPI from '@/api/JwtToken.js'

export default {
  name: 'wait',
  created () {
    let loginHash = this.$route.query.token
    if (loginHash === undefined) {
      this.$router.push('/')
    }
    jwtAPI.getToken(loginHash)
    .then(response => {
      this.$store.dispatch('login', response.data.token).then(res => {
        this.$router.push('/app')
      })
    })
    .catch(error => {
      this.$store.dispatch('show_error', error.response.data.message)
      this.$router.push('/')
    })
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
    text-align: center;
}

</style>

