<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height">
      <b-col
        xl="4"
        md="12"
      >
        <affiliate-information :data="setting" />
      </b-col>
      <b-col
        xl="8"
        md="12"
      >
        <affiliate-revenue :data="data.statisticsItems" />
      </b-col>
      <b-col xl="12">
        <affiliate-payment :data="transactions" />
      </b-col>
      <b-col xl="6">
        <affiliate-customer :data="customers" />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'

import { getUserData } from '@/auth/utils'
import AffiliateInformation from './AffiliateInformation.vue'
import AffiliateRevenue from './AffiliateRevenue.vue'
import AffiliatePayment from './AffiliatePayment.vue'
import AffiliateCustomer from './AffiliateCustomer.vue'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BRow,
    BCol,
    AffiliateInformation,
    AffiliateRevenue,
    AffiliatePayment,
    AffiliateCustomer,
  },
  data() {
    return {
      data: {},
      transactions: [],
      customers: [],
      setting: null,
    }
  },
  created() {
    // data
    this.$http.get('/ecommerce/data')
      .then(response => {
        this.data = response.data
        console.log(this.data)
      })

    useJwt.getTransaction()
      .then(response => {
        this.transactions = response.data
        useJwt.getAffiliateList()
          .then(response1 => {
            this.customers = response1.data

            this.data.statisticsItems[0].title = this.customers.length
            this.data.statisticsItems[1].title = `€ ${this.sumCustomerPayment(this.transactions)}`

            useJwt.getModeratorSettingList()
              .then(result => {
                this.setting = result.data
                const userData = getUserData()

                this.setting.username = userData.username
                let revenue = this.sumCustomerPayment(this.transactions)
                revenue *= parseFloat(this.setting[0].affiliate)
                revenue /= 100
                this.data.statisticsItems[2].title = `€ ${revenue.toFixed(2)}`
              })
          })
      })
  },
  methods: {
    sumCustomerPayment(transactions) {
      let total = 0
      transactions.forEach(item => {
        total += parseFloat(item.price)
      })
      return total
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
