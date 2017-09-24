<template>
  <div>
    <canvas id="lineChart"></canvas>
  </div>
</template>

<script>

import Chart from 'chart.js'

export default {
  props: ['labels', 'data', 'heading'],
  mounted () {
    var ctx = document.getElementById('lineChart')
    window.$chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.heading,
          data: this.data
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

