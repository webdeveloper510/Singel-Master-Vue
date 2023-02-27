<template>
  <div>
    <b-card-code
      title="Affiliate List"
      no-body
    >
      <b-table
        :fields="fields"
        :items="customers"
        responsive
        class="mb-0"
        :tbody-tr-class="rowClass"
      >
        <template #cell(customer)="data">
          <span
            class="text-nowrap"
          >
            <b-avatar
              :src="data.item.customer.avatar"
              class="mr-1"
            />
            <span class="text-nowrap">{{ data.item.customer.username }}</span>
          </span>
        </template>

        <template #cell(moderator)="data">
          <span
            class="text-nowrap"
          >
            <b-avatar
              :src="data.item.moderator.avatar"
              class="mr-1"
            />
            <span class="text-nowrap">{{ data.item.moderator.username }}</span>
          </span>
        </template>

        <!-- A custom formatted column -->
        <template #cell(id)="client">
          <b-button
            variant="gradient-primary"
            class="ml-0"
            size="sm"
            @click="removeCancel(client.item.id)"
          >
            Cancel
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
        { key: 'customer', label: 'Customer' },
        { key: 'moderator', label: 'Moderator' },
        { key: 'id', label: 'Delete' },
      ],
      items: [],
      assignedItems: [],
      lobbySocket: store.state.appConfig.lobbySocket,
      assignModalShow: false,
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
    this.fetchAffiliateList()
  },
  methods: {
    fetchAffiliateList() {
      useJwt.getAffiliateList('all')
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
    removeCancel(id) {
      useJwt.deleteAffiliate(id)
        .then(response => {
          console.log(response)
          this.fetchAffiliateList()
        }).catch(error => {
          console.log(error)
        })
    },
    assignChat() {
      this.assignModalShow = false
      const payload = {
        customer: this.assignChatIdSelected,
        moderator: this.assignModerator,
        config: '0.8',
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
