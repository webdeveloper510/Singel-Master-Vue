<template>
  <b-card no-body>
    <div class="filters px-2 d-flex aling-items-center justify-content-center py-1">
      <div class="input-container mr-3 d-flex align-items-center">
        <input type="checkbox" v-model="filters.today" id="today">
        <label class="mb-0 ml-1" for="today">Today</label>
      </div>
      <div class="input-container mr-3 d-flex align-items-center">
        <input type="checkbox" v-model="filters.yesterday" id="yesterday">
        <label class="mb-0 ml-1" for="yesterday">Yesterday</label>
      </div>
      <div class="input-container mr-3 d-flex align-items-center">
        <input type="checkbox" v-model="filters.thisMonth" id="this-month">
        <label class="mb-0 ml-1" for="this-month">This Month</label>
      </div>
      <div class="input-container mr-3 d-flex align-items-center">
        <input type="checkbox" v-model="filters.customDates" id="custom-dates">
        <label class="mb-0 ml-1" for="custom-dates">Custom Dates</label>
      </div>
      <div class="input-container mr-3 d-flex align-items-center">
        <input type="date" v-model="filters.fromDate" placeholder="From">
      </div>
      <div class="input-container d-flex align-items-center mr-4">
        <input type="date" v-model="filters.toDate" placeholder="To">
      </div>
      <button type="button" class="btn btn btn-gradient-primary" @click="OnChange()">Search</button>
    </div>
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

<style>
.filters {
    padding-bottom: 5rem !important;
  }
  .filters input[type=checkbox] {
      position: relative;
      cursor: pointer;
  }
  .filters input[type=checkbox]:before {
    content: "";
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    top: -3px;
    left: -3px;
    background-color:#e9e9e9;
    border-radius: 50%;
  }
  .filters input[type=checkbox]:checked:before {
    content: "";
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    top: -3px;
    left: -3px;
    background-color:#1E80EF;
    border-radius: 50%;
  }
  .filters input[type=checkbox]:checked:after {
    content: "";
    display: block;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    top: 2px;
    left: 6px;
    border-radius: 50%;
  }
  .filters label {
    font-size: 18px;
  }

  .filters input[type=date] {
    background: none;
    border: none;
    border-bottom: 1px solid #fff ;
    color: #fff;
  }
</style>

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
      filters: {
        today: false,
        yesterday: false,
        thisMonth: false,
        customDates: false,
        fromDate: '',
        toDate: '',
      },
    }
  },
  mounted() {
    this.transactions = this.data
    this.data1 = this.data
    console.log(this.filters.today)
    console.log(this.filters.fromDate, this.filters.toDate)
  },
  methods: {
    updateChart() {
      this.$refs.chart.updateChart()
    },
    dateF(s) {
      if (s) {
        return s.split('T')[0]
      }
      return ''
    },
    OnChange() {
      console.log(this.filters.fromDate, this.filters.toDate)
      this.transactions = [...this.data]
      if (this.filters.today || this.filters.yesterday || this.filters.thisMonth || this.filters.customDates) {
        if (this.filters.today) {
          const today = new Date().toISOString().split('T')[0]
          console.log(today)
          this.data = this.transactions.filter(t => t.paid_at.split('T')[0] === today)
        }
        if (this.filters.yesterday) {
          console.log('Yesterday', this.filters.yesterday)
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
          console.log(yesterday)
          this.data = this.transactions.filter(t => t.paid_at.split('T')[0] === yesterday)
        }
        if (this.filters.thisMonth) {
          console.log('Month', this.filters.thisMonth)
          const thisMonth = new Date().toISOString().split('-').slice(0, 2)
            .join('-')
          this.data = this.transactions.filter(t => t.paid_at.split('-').slice(0, 2).join('-') === thisMonth)
        }
        if (this.filters.customDates) {
          console.log(this.filters.customDates)
          const fromDate = new Date(this.filters.fromDate).toISOString().split('T')[0]
          const toDate = new Date(this.filters.toDate).toISOString().split('T')[0]
          console.log(fromDate, toDate)
          this.data = this.transactions.filter(t => t.paid_at.split('T')[0] >= fromDate && t.paid_at.split('T')[0] <= toDate)
        } else {
          this.filter.fromDate = ''
          this.filter.toDate = ''
          this.data = [...this.data1]
        }
      } else {
        console.log('Else')
        this.data = [...this.data1]
      }
    },
  },
}
</script>
