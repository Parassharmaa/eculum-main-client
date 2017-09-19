<template>
	<div>
		<md-card class="login-card">
		  <md-card-area md-inset>
		    <md-card-content>
		      <a href="http://localhost:5000/api/v1/auth/twitter">
		      	<md-button class="md-raised twitter-color">
		      		<img class="btn-icon" src="../assets/Twitter_Social_Icon_Circle_Color.png">
		      		Login with Twitter
		      	</md-button>
		      </a>
		    </md-card-content>
		  </md-card-area>

		  <md-card-content>
			<form validate @submit.stop.prevent="submit">
				<md-input-container md-inline md-clearable>
				    <label>Email</label>
				    <md-input type="email" required></md-input>
			  	</md-input-container>
				<md-input-container md-has-password md-inline>
					<label>Password </label>
					<md-input type="password" required></md-input>
				</md-input-container>
				<md-button class="md-raised md-primary">Login</md-button>
			</form>
		  </md-card-content>
		</md-card>
	</div>
</template>

<script>

export default {
  name: 'login'
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
</style>

