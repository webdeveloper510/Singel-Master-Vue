<template>
  <div>
    <b-card-code
      title="Customers"
      no-body
    >
      <b-form-input
        v-model="searchTerm"
        placeholder="Search"
        type="text"
        class="ml-1 mb-1"
        style="width: 300px"
      />
      <b-table
        :fields="fields"
        :items="customers"
        responsive
        class="mb-0"
        :tbody-tr-class="rowClass"
        :filter="searchTerm"
      >
        <template #cell(customer)="client">
          <span
            class="text-nowrap"
          >
            <b-avatar
              :src="client.item.avatar"
              class="mr-1"
            />
            <span class="text-nowrap">{{ client.item.username }}</span>
          </span>
        </template>

        <template #cell(registered_at)="client">
          {{ dateOnly(client.item.registered_at) }}
        </template>

        <!-- A custom formatted column -->
        <template #cell(id)="client">
          <b-button
            v-b-tooltip.hover
            variant="warning"
            class="ml-0 mr-1 btn-icon"
            size="sm"
            title="open detail"
            @click="openDetailModal(client.item)"
          >
            <feather-icon icon="MonitorIcon" />
          </b-button>
          <b-button
            v-b-tooltip.hover
            variant="success"
            class="mr-1 btn-icon"
            size="sm"
            title="Add Coin"
            @click="openCoinModal(client.item)"
          >
            <feather-icon icon="LayersIcon" />
          </b-button>
          <b-button
            v-b-tooltip.hover
            variant="gradient-primary"
            class="ml-0 btn-icon"
            size="sm"
            title="Remove"
            @click="openDeleteModal(client.item)"
          >
            <feather-icon icon="UserMinusIcon" />
          </b-button>
        </template>
      </b-table>
    </b-card-code>

    <b-modal
      id="detail-modal"
      ref="detail-modal"
      v-model="detailModalShow"
      title="Customer Details"
      ok-title="cancel"
      ok-only
      centered
      size="lg"
    >
      <div
        v-if="selectedCustomer"
        class="row"
      >
        <div
          v-for="(value, key) in selectedCustomer"
          :key="key"
          class="col-6 mt-2"
        >
          <h5 class="text-capitalize mb-75">
            {{ key }}
          </h5>
          <div v-if="key === 'avatar'">
            <b-avatar
              :src="value"
              class="mr-1"
            />
          </div>
          <div v-else-if="key === 'last_login'">
            <p style="color:grey">
              {{ dateFormat(value) }}
            </p>
          </div>
          <div v-else-if="key === 'registered_at'">
            <p style="color:grey">
              {{ dateFormat(value) }}
            </p>
          </div>
          <div v-else>
            <p style="color:grey">
              {{ value }}
            </p>
          </div>

        </div>
      </div>
    </b-modal>
    <b-modal
      id="coin-modal"
      ref="coin-modal"
      v-model="coinModalShow"
      title="Add Coin to Customer"
      ok-title="cancel"
      ok-only
      centered
    >
      <div v-if="selectedCustomer">
        <h3 class="my-2">
          Add Coin to Customer: @{{ selectedCustomer.username }}
        </h3>
        <b-form-input
          v-model="coin"
          type="number"
          placeholder="input coins"
          :state="true"
        />
        <b-button
          class="btn btn-success my-2"
          @click="addCoin()"
        >Add Coin</b-button>
      </div>
    </b-modal>
    <b-modal
      id="delete-modal"
      ref="delete-modal"
      v-model="deleteModalShow"
      title="Remove Customer"
      ok-title="cancel"
      ok-only
      centered
    >
      <p v-if="selectedCustomer">
        Are you sure to remove Customer @{{ selectedCustomer.username }}
      </p>
      <b-button @click="deleteCustomer()">
        Remove
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BTable, BButton, BAvatar, BModal, BFormInput, VBTooltip,
} from 'bootstrap-vue'

import useJwt from '@/auth/jwt/useJwt'
import store from '@/store'
import moment from 'moment'

export default {
  components: {
    BTable,
    BButton,
    BCardCode,
    BAvatar,
    BModal,
    BFormInput,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      searchTerm: '',
      fields: [
        { key: 'customer', label: 'Client' },
        { key: 'email', label: 'Email' },
        { key: 'age', label: 'age' },
        { key: 'coins', label: 'coins' },
        { key: 'registered_at', label: 'Registered Date' },
        { key: 'id', label: 'Actions' },
      ],
      items: [],
      assignedItems: [],
      lobbySocket: store.state.appConfig.lobbySocket,
      detailModalShow: false,
      deleteModalShow: false,
      coinModalShow: false,
      pushChatIdSelected: 0,
      pushTimeOptions: [
        { text: '5min', value: 5 },
        { text: '15min', value: 10 },
        { text: '30min', value: 30 },
        { text: '45min', value: 45 },
        { text: '1h', value: 60 },
        { text: '1h 15min', value: 75 },
        { text: '1h 30min', value: 90 },
        { text: '1h 45min', value: 105 },
        { text: '2h', value: 120 },
        { text: '3h', value: 180 },
        { text: '4h', value: 240 },
        { text: '5h', value: 300 },
      ],
      pushTime: '1h',
      userName: JSON.parse(localStorage.getItem('userData')).username,
      assignChatIdSelected: null,
      assignModerator: null,
      moderators: [],
      customers: [],
      selectedCustomer: null,
      coin: 0,
    }
  },
  mounted() {
    this.fetchModerators()
    this.fetchNewCustomers()
  },
  methods: {
    fetchNewCustomers() {
      useJwt.getCustomers('?new=0')
        .then(response => {
          this.customers = response.data
          console.log('CUSTOMERS========>', this.customers)
        }).catch(error => {
          console.log(error)
        })
    },
    fetchModerators() {
      useJwt.getModerators()
        .then(response => {
          this.moderators = []
          const { data } = response
          data.forEach(item => {
            this.moderators.push(item.username)
          })
          console.log(this.moderators)
        }).catch(error => {
          console.log(error)
        })
    },
    rowClass(item, type) {
      if (!item || type !== 'row') return
      // eslint-disable-next-line consistent-return
      if (item.status === 'remind') return 'table-reminder'
    },
    openDeleteModal(customer) {
      this.selectedCustomer = customer
      this.deleteModalShow = true
    },
    openDetailModal(customer) {
      this.detailModalShow = true
      this.selectedCustomer = customer
    },
    openCoinModal(customer) {
      this.coinModalShow = true
      this.selectedCustomer = customer
    },
    addCoin() {
      const payload = {
        customer: this.selectedCustomer.id,
        coin: this.coin,
      }
      useJwt.addCoin(payload)
        .then(result => {
          console.log(result)
          this.fetchNewCustomers()
          this.coinModalShow = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteCustomer() {
      const payload = {
        customer: this.selectedCustomer.id,
      }
      useJwt.deleteCustomer(payload)
        .then(result => {
          console.log(result)
          this.fetchNewCustomers()
          this.deleteModalShow = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    assignChat() {
      this.assignModalShow = false
      const payload = {
        customer: this.assignChatIdSelected,
        moderator: this.assignModerator,
      }
      useJwt.createAffiliate(payload)
        .then(response => {
          console.log(response.data)
          this.fetchNewCustomers()
        }).catch(error => {
          console.log(error)
        })
    },
    dateOnly(s) {
      return s.split('T')[0]
    },
    dateFormat(s) {
      return moment(s).local().format('HH:mm - DD/MM/YYYY')
    },
  },

}
</script>
