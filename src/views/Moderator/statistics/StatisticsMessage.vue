<template>
  <b-card no-body>
    <b-card-header>
      <div>
        <b-card-title class="mb-1">
          Message Statistics
        </b-card-title>
        <b-card-sub-title>Show Message Statistics per day</b-card-sub-title>
      </div>
    </b-card-header>

    <!-- chart -->
    <b-card-body>
      <chartjs-component-bar-chart
        ref="chart"
        :height="400"
        :data="data.lineChart.data"
        :options="data.lineChart.options"
        :plugins="plugins"
      />
    </b-card-body>

  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCardSubTitle, BCardTitle,
} from 'bootstrap-vue'
// import ChartjsComponentLineChart from './charts-components/ChartjsComponentLineChart.vue'
import ChartjsComponentBarChart from './charts-components/ChartjsComponentBarChart.vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardSubTitle,
    BCardTitle,
    // ChartjsComponentLineChart,
    ChartjsComponentBarChart,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      plugins: [
        // to add spacing between legends and chart
        {
          beforeInit(chart) {
            /* eslint-disable func-names, no-param-reassign */
            chart.legend.afterFit = function () {
              this.height += 20
            }
            /* eslint-enable */
          },
        },
      ],
    }
  },
  methods: {
    updateChart() {
      this.$refs.chart.updateChart()
    },
  },
}
</script>
