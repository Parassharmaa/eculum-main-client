import { Pie } from 'vue-chartjs'

export default Pie.extend({
  mounted () {
    this.renderChart({
      labels: ['Technology', 'Education', 'Business', 'Arts'],
      datasets: [
        {
          backgroundColor: [
            '#41B883',
            '#E46651',
            '#00D8FF',
            '#DD1B16'
          ],
          data: [30, 20, 20, 30]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})
