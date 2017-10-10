import { Pie } from 'vue-chartjs'

export default Pie.extend({
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
        maintainAspectRatio: false,
        title: {
          display: true,
          text: this.heading
        }
      })
  }
})
