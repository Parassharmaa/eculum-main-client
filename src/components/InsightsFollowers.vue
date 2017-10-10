<template>
	<div>
		<div class="subheading"> Followers </div>
    <v-divider></v-divider>
    <br>
    <center>
  		<v-progress-circular indeterminate class="primary--text" v-show="$store.getters.pending" v-bind:size="90" v-bind:width="1"></v-progress-circular>
    </center>
    <div v-if="!$store.getters.pending">
      <v-card :height="'300px'" class="pa-2">
        <pie-chart></pie-chart>
      </v-card>
      <br>
      <v-divider></v-divider>
      <br>
      <v-data-table
      v-bind:headers="headers"
      v-bind:items="items"
      v-bind:search="search"
      v-bind:pagination.sync="pagination"
      hide-actions
      class="elevation-1"
      >
        <template slot="items" scope="props">
          <td class="text-xs-center">
            <v-avatar>
              <img v-bind:src="props.item.profile_image">
            </v-avatar>
          </td>
          <td class="text-xs-center">
              {{ props.item.name }}
          </td>
          <td  class="text-xs-right">{{ props.item.username }}</td>
          <td  class="text-xs-center">{{ props.item.bio }}</td>
          <td  class="text-xs-right">{{ props.item.followers }}</td>
          <td  class="text-xs-right">{{ props.item.following }}</td>
          <td  class="text-xs-left">
            <v-chip>
              <v-avatar class="primary">{{ props.item.interests[0] }}</v-avatar>
              {{ props.item.interests }}
            </v-chip>
          </td>
          <td  class="text-xs-right">
            <v-btn small icon class="blue--text">
            <v-icon>
              info
            </v-icon>
          </v-btn></td>
        </template>
      </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>  
    </div>
	</div>
</template>

<script>
import Insights from '@/api/Insights'
import PieChart from './charts/PieChart.js'

export default {
  name: 'insights_overview',
  data () {
    return {
      test: this.$store.getters.insights_followers,
      search: '',
      pagination: {},
      selected: [],
      headers: [
        { text: '', value: '', sortable: false },
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Username', value: 'username' },
        { text: 'Bio', value: 'bio', sortable: false, align: 'center' },
        { text: 'Followers', value: 'followers' },
        { text: 'Following', value: 'following' },
        { text: 'Interest', value: 'interests', align: 'center' },
        { text: '', value: '', sortable: false }
      ],
      items: [
        {
          value: false,
          profile_image: 'https://pbs.twimg.com/profile_images/573372936498765826/okwO7z-Y_normal.png',
          name: 'Qwert',
          username: 'qwerty',
          bio: 'hello world \n jdkjlsdjl c \n jdskjdl jdsjsk jcksjkcsjk',
          followers: 24,
          following: 4.0,
          interests: 'Technology'
        },
        {
          value: false,
          profile_image: 'https://pbs.twimg.com/profile_images/573372936498765826/okwO7z-Y_normal.png',
          name: 'Qwert',
          username: 'qwerty',
          bio: 'hello world \n jdkjlsdjl c \n jdskjdl jdsjsk jcksjkcsjk',
          followers: 24,
          following: 4.0,
          interests: 'Technology'
        },
        {
          value: false,
          profile_image: 'https://pbs.twimg.com/profile_images/573372936498765826/okwO7z-Y_normal.png',
          name: 'Qwert',
          username: 'qwerty',
          bio: 'hello world \n jdkjlsdjl c \n jdskjdl jdsjsk jcksjkcsjk',
          followers: 24,
          following: 4.0,
          interests: 'Technology'
        },
        {
          value: false,
          profile_image: 'https://pbs.twimg.com/profile_images/573372936498765826/okwO7z-Y_normal.png',
          name: 'Qwert',
          username: 'qwerty',
          bio: 'hello world \n jdkjlsdjl c \n jdskjdl jdsjsk jcksjkcsjk',
          followers: 24,
          following: 4.0,
          interests: 'Technology'
        },
        {
          value: false,
          profile_image: 'https://pbs.twimg.com/profile_images/573372936498765826/okwO7z-Y_normal.png',
          name: 'Qwert',
          username: 'qwerty',
          bio: 'hello world \n jdkjlsdjl c \n jdskjdl jdsjsk jcksjkcsjk',
          followers: 24,
          following: 4.0,
          interests: 'Technology'
        }
      ]
    }
  },
  computed: {
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
    }
  },
  components: { PieChart },
  beforeCreate () {
    this.$store.state.pending = true
    Insights.followers()
    .then(response => {
      this.$store.dispatch('load_insights_followers', response.data.data)
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

