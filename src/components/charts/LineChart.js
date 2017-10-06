import { Line } from 'vue-chartjs'

export default Line.extend({
  props: ['labels', 'data', 'heading', 'label', 'yaxis', 'xaxis'],
  mounted () {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [{
          backgroundColor: 'rgba(54, 162, 235,0)',
          borderColor: 'rgb(54, 162, 235)',
          label: this.label[0],
          data: this.data[0]
        },
        {
          backgroundColor: 'rgba(54, 162, 235,0)',
          borderColor: 'rgb(154, 162, 235)',
          label: this.label[1],
          data: this.data[1]
        }]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: this.heading
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
              labelString: this.xaxis
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.yaxis
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

