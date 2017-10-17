import { Doughnut } from 'vue-chartjs'

export default Doughnut.extend({
  props: ['data', 'heading', 'label'],
  mounted () {
    this.renderChart({
      labels: this.label,
      datasets: [
        {
          backgroundColor: [
            '#a5bb0c',
            '#41B883',
            '#E46651',
            '#140b7b',
            '#bb0c83',
            '#00D8FF',
            '#DD1B16',
            '#7b270b'
          ],
          data: this.data
        }
      ]
    },
      {
        responsive: true,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var allData = data.datasets[tooltipItem.datasetIndex].data
              var tooltipLabel = data.labels[tooltipItem.index]
              var tooltipData = allData[tooltipItem.index]
              var total = 0
              for (var i in allData) {
                total += allData[i]
              }
              var tooltipPercentage = Math.round((tooltipData / total) * 100)
              return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)'
            }
          }
        },
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        title: {
          display: true,
          text: this.heading
        }
      })
  }
})
