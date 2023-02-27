<template>
  <b-row class="match-height">
    <b-col cols="12">
      <statistics-all :data="statisticsItems" />
    </b-col>
    <b-col cols="12">
      <statistics-message
        ref="messageChart"
        :data="chartjsData"
      />
    </b-col>
    <b-col cols="12">
      <statistics-revenue
        ref="revenueChart"
        :data="chartjsData"
      />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import StatisticsMessage from './StatisticsMessage.vue'
import StatisticsRevenue from './StatisticsRevenue.vue'
import StatisticsAll from './StatisticsAll.vue'
import useJwt from '@/auth/jwt/useJwt'
import chartjsData from './chartjsData'

export default {
  components: {
    BRow,
    BCol,
    StatisticsMessage,
    StatisticsRevenue,
    StatisticsAll,
  },
  data() {
    return {
      chartjsData,
      statisticsItems: [
        {
          icon: 'CalendarIcon',
          color: 'light-primary',
          title: '1235',
          subtitle: 'Message count for this Month',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'LayersIcon',
          color: 'light-info',
          title: '58',
          subtitle: 'Message count for Today',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'SettingsIcon',
          color: 'light-success',
          title: '$ 0.16',
          subtitle: 'Commission Rate for one message',
          customClass: '',
        },
        {
          icon: 'DollarSignIcon',
          color: 'light-primary',
          title: '$ 1235',
          subtitle: 'Commission for this Month',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'CreditCardIcon',
          color: 'light-info',
          title: '$ 58',
          subtitle: 'Commission for Today',
          customClass: 'mb-2 mb-xl-0',
        },
      ],
    }
  },
  mounted() {
    useJwt.getRevenue()
      .then(result => {
        this.statisticsItems[0].title = result.data.messageMonth
        this.statisticsItems[1].title = result.data.messageToday
        this.statisticsItems[2].title = result.data.messageCommission
        this.statisticsItems[3].title = `$ ${result.data.messageIncomeMonth}`
        this.statisticsItems[4].title = `$ ${result.data.messageIncomeToday}`
      })

    useJwt.getModeratorStatistic()
      .then(result => {
        console.log(result)
        this.chartjsData.lineChart.data.labels = result.data.days
        this.chartjsData.lineChart.data.datasets[0].data = result.data.messages
        this.chartjsData.revenueChart.data.labels = result.data.days
        this.chartjsData.revenueChart.data.datasets[0].data = result.data.messages_revenue
        this.$refs.messageChart.updateChart()
        this.$refs.revenueChart.updateChart()
      })
  },
}
</script>
