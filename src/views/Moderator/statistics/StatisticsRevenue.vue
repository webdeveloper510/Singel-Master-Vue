<template>
  <b-card no-body>
    <b-card-header>
      <div>
        <b-card-title class="mb-1">
          Income Statistics
        </b-card-title>
        <b-card-sub-title>Show revenue statistics per day</b-card-sub-title>
      </div>
    </b-card-header>

    <!-- chart -->
    <b-card-body>
      <chartjs-component-line-chart
        ref="chart"
        :height="400"
        :data="data.revenueChart.data"
        :options="data.revenueChart.options"
        :plugins="plugins"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCardSubTitle, BCardTitle,
} from 'bootstrap-vue'
import ChartjsComponentLineChart from './charts-components/ChartjsComponentLineChart.vue'
import chartjsData from './chartjsData'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardSubTitle,
    BCardTitle,
    ChartjsComponentLineChart,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      chartjsData,
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
