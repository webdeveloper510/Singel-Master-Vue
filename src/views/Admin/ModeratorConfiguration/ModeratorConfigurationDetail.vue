<template>
  <section id="dashboard-ecommerce">
    <h2 class="mb-2">
      Detail
      <b-button
        class="float-right"
        variant="primary"
        :to="{name:'admin-moderator-configuration'}"
      >
        To List
      </b-button>
    </h2>
    <b-row class="match-height">
      <b-col
        xl="12"
        md="12"
      >
        <affiliate-information
          :data0="setting"
          :data="informationItems"
        />
      </b-col>
      <b-col
        xl="12"
      >
        <h3>Select Year and month</h3>
        <b-row class="mb-1">
          <b-col lg="4">
            <b-form-input
              v-model="year"
              type="number"
              placeholder="year"
            /></b-col>
          <b-col lg="4">
            <b-form-input
              v-model="month"
              type="number"
              placeholder="month"
            /></b-col>
          <b-col lg="4">
            <b-button
              variant="primary"
              @click="updateChart()"
            >
              update
            </b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        xl="12"
        md="12"
      >
        <affiliate-revenue :data="data.statisticsItems" />
      </b-col>
      <b-col xl="6">
        <affiliate-payment :data="transactions" />
      </b-col>
      <b-col xl="6">
        <affiliate-customer :data="customers" />
      </b-col>
    </b-row>
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
  </section>
</template>

<script>
import {
  BRow, BCol, BButton, BFormInput,
} from 'bootstrap-vue'
import AffiliateInformation from './ModeratorInformation.vue'
import AffiliateRevenue from './AffiliateRevenue.vue'
import AffiliatePayment from './AffiliatePayment.vue'
import AffiliateCustomer from './AffiliateCustomer.vue'
import StatisticsMessage from '@/views/Moderator/statistics/StatisticsMessage.vue'
import StatisticsRevenue from '@/views/Moderator/statistics/StatisticsRevenue.vue'
import StatisticsAll from './StatisticsAll.vue'
import useJwt from '@/auth/jwt/useJwt'
import chartjsData from '@/views/Moderator/statistics/chartjsData'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BFormInput,
    AffiliateRevenue,
    AffiliatePayment,
    AffiliateCustomer,
    AffiliateInformation,
    StatisticsMessage,
    StatisticsRevenue,
    StatisticsAll,
  },
  data() {
    return {
      year: '',
      month: '',
      data: {},
      transactions: [],
      customers: [],
      setting: null,
      moderator: null,
      chartjsData,
      informationItems: [
        {
          icon: 'GiftIcon',
          color: 'light-primary',
          title: '23%',
          subtitle: 'Affiliate configuration',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'MessageSquareIcon',
          color: 'light-info',
          title: '€ 0.36',
          subtitle: 'Message Commission',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'CreditCardIcon',
          color: 'light-success',
          title: '€ 123.46',
          subtitle: 'Total Revenue',
          customClass: '',
        },
      ],
      statisticsItems: [
        {
          icon: 'CalendarIcon',
          color: 'light-primary',
          title: '1235',
          subtitle: 'Message count for this Month',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'DollarSignIcon',
          color: 'light-primary',
          title: '$ 1235',
          subtitle: 'Commission for this Month',
          customClass: 'mb-2 mb-xl-0',
        },
      ],
    }
  },
  created() {
    const today = new Date()
    this.year = today.getFullYear()
    this.month = today.getMonth() + 1
    // date
    this.$http.get('/ecommerce/data')
      .then(response => {
        this.data = response.data
      })
    this.moderator = this.$route.params.moderatorUsername
    this.fetchAffiliate()
    this.fetchRevenue()
    this.fetchStatistic()
  },
  methods: {
    sumCustomerPayment(transactions) {
      let total = 0
      transactions.forEach(item => {
        total += parseFloat(item.price)
      })
      return total
    },
    fetchAffiliate() {
      useJwt.getTransaction(this.moderator, this.year, this.month)
        .then(response => {
          this.transactions = response.data
          useJwt.getAffiliateList('single', this.moderator)
            .then(response1 => {
              this.customers = response1.data

              this.data.statisticsItems[0].title = this.customers.length
              this.data.statisticsItems[1].title = `€ ${this.sumCustomerPayment(this.transactions)}`

              useJwt.getModeratorSettingList('single', this.moderator)
                .then(result => {
                  this.setting = result.data
                  this.setting[0].username = this.$route.params.moderatorUsername
                  let revenue = this.sumCustomerPayment(this.transactions)
                  revenue *= parseFloat(this.setting[0].affiliate)
                  revenue /= 100
                  this.data.statisticsItems[2].title = `€ ${revenue.toFixed(2)}`
                })
            })
        })
    },

    fetchRevenue() {
      useJwt.getRevenue({ moderator: this.moderator, month: this.month, year: this.year })
        .then(result => {
          this.statisticsItems[0].title = result.data.messageMonth
          this.statisticsItems[1].title = `$ ${result.data.messageIncomeMonth}`
        })
    },
    fetchStatistic() {
      useJwt.getModeratorStatistic({ moderator: this.moderator, month: this.month, year: this.year })
        .then(result => {
          this.chartjsData.lineChart.data.labels = result.data.days
          this.chartjsData.lineChart.data.datasets[0].data = result.data.messages
          this.chartjsData.revenueChart.data.labels = result.data.days
          this.chartjsData.revenueChart.data.datasets[0].data = result.data.messages_revenue
          this.$refs.messageChart.updateChart()
          this.$refs.revenueChart.updateChart()
        })
    },
    updateChart() {
      this.fetchAffiliate()
      this.fetchRevenue()
      this.fetchStatistic()
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
