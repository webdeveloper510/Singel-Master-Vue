<template>
  <div>
    <b-card-code
      title="Moderators"
      no-body
    >
      <b-table
        :fields="fields"
        :items="moderators"
        responsive
        class="mb-0"
        :tbody-tr-class="rowClass"
      >
        <template #cell(moderator)="data">
          <span
            class="text-nowrap"
          >
            <span class="text-nowrap">{{ data.item.moderator.username }}</span>
          </span>
        </template>
        <template #cell(message)="data">
          <span
            class="text-nowrap"
          >
            <span class="text-nowrap">€ {{ data.item.message }}</span>
          </span>
        </template>

        <template #cell(affiliate)="data">
          <span
            class="text-nowrap"
          >
            <span class="text-nowrap">{{ data.item.affiliate }}%</span>
          </span>
        </template>

        <template #cell(revenue)="data">
          <span
            class="text-nowrap"
          >
            <span class="text-nowrap">€ {{ data.item.revenue }}</span>
          </span>
        </template>
        <!-- A custom formatted column -->
        <template #cell(id)="client">
          <b-button
            variant="warning"
            class="ml-0 mr-1 btn-icon"
            size="sm"
            title="Open Detail"
            :to="{name:'admin-moderator-configuration-detail', params:{'moderatorUsername':client.item.moderator.username}}"
          >
            <feather-icon icon="MonitorIcon" />
          </b-button>

          <b-button
            variant="gradient-primary"
            class="mr-1 btn-icon"
            size="sm"
            title="Configuration"
            @click="editSettings(client.item)"
          >
            <feather-icon icon="SettingsIcon" />
          </b-button>

          <b-button
            variant="gradient-primary"
            class="mr-1 btn-icon"
            size="sm"
            title="Configuration"
            @click="remove(client.item)"
          >
            <feather-icon icon="TrashIcon" />
          </b-button>

        </template>

      </b-table>
    </b-card-code>

    <b-modal
      v-if="selectedModerator"
      id="assign-modal"
      ref="assign-modal"
      v-model="assignModalShow"
      title="Change moderator setting"
      ok-title="cancel"
      ok-only
      centered
    >
      <h4 class="my-2">
        username:<b class="ml-1">{{ selectedModerator.moderator.username }}</b>
      </h4>
      <b-form-group
        label-for="message"
        label="Message Price(€)"
      >
        <b-form-input
          id="message"
          v-model="selectedModerator.message"
          type="number"
        />
      </b-form-group>
      <b-form-group
        label-for="affiliate"
        label="Affiliate commission(%)"
      >
        <b-form-input
          id="affiliate"
          v-model="selectedModerator.affiliate"
          type="number"
        />
      </b-form-group>

      <b-button @click="changeModeratorSetting()">
        Change
      </b-button>
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
      <p v-if="selectedModerator">
        Are you sure to remove Moderator @{{ selectedModerator.moderator.username }}
      </p>
      <b-button @click="deleteModerator()">
        Remove
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BTable, BButton, BModal, BFormGroup, BFormInput,
} from 'bootstrap-vue'

import useJwt from '@/auth/jwt/useJwt'
import store from '@/store'

export default {
  components: {
    BTable,
    BButton,
    BCardCode,
    BModal,
    BFormGroup,
    BFormInput,
  },
  data() {
    return {
      fields: [
        { key: 'moderator', label: 'Moderator' },
        { key: 'message', label: 'Message Price' },
        { key: 'affiliate', label: 'Affiliate Commission' },
        { key: 'revenue', label: 'Revenue on this Month' },
        { key: 'customers', label: 'Affiliated Customers' },
        { key: 'id', label: 'Detail/Config' },
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
      selectedModerator: null,
      deleteModalShow: false,
    }
  },
  mounted() {
    this.fetchModeratorSettings()
  },
  methods: {
    fetchModeratorSettings() {
      useJwt.getModeratorSettingList('all')
        .then(response => {
          this.moderators = response.data
        }).catch(error => {
          console.log(error)
        })
    },

    rowClass(item, type) {
      if (!item || type !== 'row') return
      // eslint-disable-next-line consistent-return
      if (item.status === 'remind') return 'table-reminder'
    },
    editSettings(data) {
      this.assignModalShow = true
      this.selectedModerator = data
    },
    changeModeratorSetting() {
      this.assignModalShow = false
      useJwt.updateModeratorSetting(this.selectedModerator.pk, this.selectedModerator)
        .then(response => {
          console.log(response.data)
          this.fetchModeratorSettings()
        }).catch(error => {
          console.log(error)
        })
    },
    dateFormat(s) {
      return s.split('T')[0]
    },
    deleteModerator() {
      const payload = {
        customer: this.selectedModerator.moderator.id,
      }
      useJwt.deleteCustomer(payload)
        .then(result => {
          console.log(result)
          this.fetchModeratorSettings()
          this.deleteModalShow = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    remove(item) {
      this.deleteModalShow = true
      this.selectedModerator = item
    },
  },

}
</script>
