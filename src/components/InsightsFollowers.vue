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
        <pie-chart 
          :heading="heading" 
          :data="data.interest.data"
          :label="data.interest.label"
        ></pie-chart>
      </v-card>
      <br>
      <v-divider></v-divider>
      <br>
      <v-data-table
      v-bind:headers="headers"
      v-bind:items="data.people"
      v-bind:search="search"
      v-bind:pagination.sync="pagination"
      hide-actions
      class="elevation-1"
      >
        <template slot="items" scope="props">
            <td class="text-xs-left">
              <v-avatar tile class="border-img">
                <img v-bind:src="props.item.profile_image">
              </v-avatar>
            </td>
            <td class="text-xs-left">
                {{ props.item.name }}
            </td>
            <td  class="text-xs-left">@{{ props.item.username }}</td>
            <td  class="text-xs-center">
              <v-chip>
                <v-avatar class="primary">{{ props.item.interests[0] }}</v-avatar>
                {{ props.item.interests }}
              </v-chip>
            </td>
            <td  class="text-xs-right">{{ props.item.followers }}</td>
            <td  class="text-xs-right">{{ props.item.following }}</td>
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
      search: '',
      pagination: {},
      selected: [],
      headers: [
        { text: '', value: '', sortable: false },
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Username', value: 'username', align: 'left' },
        { text: 'Interest', value: 'interests', align: 'center' },
        // { text: 'Bio', value: 'bio', sortable: false, align: 'center', expandable: true },
        { text: 'Followers', value: 'followers' },
        { text: 'Following', value: 'following' }
      ],
      data: this.$store.getters.insights_followers,
      heading: 'Followers\'s Interest %'
    }
  },
  computed: {
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.data.people.length / this.pagination.rowsPerPage) : 0
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
 .border-img {
    margin: 8px auto;
 }

</style>

