<template>
  <div>
    <b-card-code
      title="New Customers"
      no-body
    >
      <b-table
        :fields="fields"
        :items="customers"
        responsive
        class="mb-0"
        :tbody-tr-class="rowClass"
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
          {{ dateFormat(client.item.registered_at) }}
        </template>

        <!-- A custom formatted column -->
        <template #cell(id)="client">
          <b-button
            variant="gradient-primary"
            class="ml-0"
            size="sm"
            @click="openAssignModal(client.item.id)"
          >
            Affiliate
          </b-button>

        </template>

      </b-table>
    </b-card-code>

    <b-modal
      id="assign-modal"
      ref="assign-modal"
      v-model="assignModalShow"
      title="Select moderator to assign"
      ok-title="cancel"
      ok-only
      centered
    >
      <b-form-group>
        <b-form-radio-group
          v-model="assignModerator"
          :options="moderators"
          value="male"
          stacked
        />
      </b-form-group>

      <b-button @click="assignChat">
        Affiliate
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BTable, BButton, BAvatar, BModal, BFormGroup, BFormRadioGroup,
} from 'bootstrap-vue'

import useJwt from '@/auth/jwt/useJwt'
import store from '@/store'

export default {
  components: {
    BTable,
    BButton,
    BCardCode,
    BAvatar,
    BModal,
    BFormRadioGroup,
    BFormGroup,
  },
  data() {
    return {
      fields: [
        { key: 'customer', label: 'Client' },
        { key: 'email', label: 'Email' },
        { key: 'age', label: 'age' },
        { key: 'registered_at', label: 'Registered Date' },
        { key: 'id', label: 'Action' },

      ],
      items: [],
      assignedItems: [],
      lobbySocket: store.state.appConfig.lobbySocket,
      pushModalShow: false,
      assignModalShow: false,
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
    }
  },
  mounted() {
    this.fetchModerators()
    this.fetchNewCustomers()
  },
  methods: {
    fetchNewCustomers() {
      useJwt.getCustomers('?new=1')
        .then(response => {
          this.customers = response.data
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
    openAssignModal(chatId) {
      this.assignChatIdSelected = chatId
      this.assignModalShow = true
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
    dateFormat(s) {
      return s.split('T')[0]
    },
  },

}
</script>
