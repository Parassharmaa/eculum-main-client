<template>
	<div>
    <center>
      <md-spinner :md-size="130" :md-stroke="1" md-indeterminate></md-spinner>
    </center>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'wait',
  created () {
    let loginHash = window.location.hash.replace('#', '')
    window.location.hash = ''
    axios.get(`http://localhost:5000/api/v1/auth-token?login_hash=${loginHash}`)
    .then(response => {
      console.log(response.data)
      this.$store.dispatch('login', response.data.token).then(res => {
        this.$router.push('/app')
      })
    })
    .catch(e => {
      console.log(e)
    })
  }
}
</script>
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
    text-align: center;
}

</style>

