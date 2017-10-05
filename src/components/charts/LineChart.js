import { Line } from 'vue-chartjs'

export default Line.extend({
  props: ['labels', 'data', 'heading'],
  mounted () {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [{
          backgroundColor: 'rgba(54, 162, 235,0)',
          borderColor: 'rgb(54, 162, 235)',
          label: this.heading[0],
          data: this.data[0]
        },
        {
          backgroundColor: 'rgba(54, 162, 235,0)',
          borderColor: 'rgb(154, 162, 235)',
          label: this.heading[1],
          data: this.data[1]
        }]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Network Growth'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Days'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: '%'
            },
            ticks: {
              // forces step size to be 5 units
              // stepSize: 100
            }
          }]
        }
      }
    )
  }
})

