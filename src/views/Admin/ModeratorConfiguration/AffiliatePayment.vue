<template>
  <b-card-code
    title="Customer payment"
    no-body
  >
    <b-table
      :fields="fields"
      :items="data"
      responsive
      class="mb-0"
    >
      <template #cell(username)="data">
        {{ data.item.customer.username }}
      </template>
      <template #cell(paid_at)="data">
        {{ dateF(data.item.paid_at) }}
      </template>
    </b-table>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BTable,
} from 'bootstrap-vue'

export default {
  components: {
    BCardCode,
    BTable,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fields: [
        { key: 'username', label: 'username' },
        { key: 'price', label: 'Price(SEK)' },
        { key: 'paid_at', label: 'Paid on' },
      ],
      items: [
        {
          username: 'smith112',
          price: '123.99',
          paid_on: '2021-12-12',
        },
        {
          username: 'smith112',
          price: '23.99',
          paid_on: '2021-12-16',
        },
        {
          username: 'James189',
          price: '33.99',
          paid_on: '2021-12-18',
        },
        {
          username: 'James189',
          price: '55.99',
          paid_on: '2021-09-12',
        },
        {
          username: 'James189',
          price: '23.99',
          paid_on: '2021-03-12',
        },
      ],
      transactions: [],
    }
  },
  mounted() {
    this.transactions = this.data
  },
  methods: {
    dateF(s) {
      if (s) {
        return s.split('T')[0]
      }
      return ''
    },
  },
}
</script>
