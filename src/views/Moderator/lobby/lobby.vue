<template>
  <div>
    <b-card-code
      title="Lobby"
      no-body
    >
      <b-table
        :fields="fields"
        :items="items"
      >
        <template #cell(customer)="client">
          <span
            class="text-nowrap"
          >
            <b-avatar
              :src="client.value.avatar"
              class="mr-1"
            />
            <span class="text-nowrap">{{ client.value.username }}</span>
          </span>
        </template>
        <template #cell(girl)="girl">
          <span
            class="text-nowrap"
          >
            <b-avatar
              :src="girl.value.avatar"
              class="mr-1"
            />
            <span class="text-nowrap">{{ girl.value.username }}</span>
          </span>
        </template>
        <template #cell(lobbyTime)="lobbyTime">
          <span
            class="text-nowrap"
          >
            {{ dateFormat(lobbyTime.value) }}
          </span>
        </template>

        <!-- A custom formatted column -->
        <template #cell(id)="chatId">
          <b-button
            variant="gradient-success"
            size="sm"
            @click="chatOpen(chatId.value)"
          >
            Chat
          </b-button>
          <b-button
            variant="gradient-danger"
            class="ml-2"
            size="sm"
            @click="openPushChat(chatId.value)"
          >
            Push/Hold
          </b-button>

          <b-button
            variant="gradient-primary"
            class="ml-2"
            size="sm"
            @click="openAssignModal(chatId.value)"
          >
            Assign to
          </b-button>

          <b-button
            v-if="userData.role == 'admin'"
            variant="gradient-primary"
            class="ml-2"
            size="sm"
            @click="removeLobby(chatId.value)"
          >
            Remove
          </b-button>

        </template>

      </b-table>
    </b-card-code>

    <b-card-code
      v-if="assignedItems.length"
      title="Assinged to You"
      no-body
    >
      <b-table
        :fields="fields"
        :items="assignedItems"
      >
        <template #cell(customer)="client">
          <span
            class="text-nowrap"
          >
            <b-avatar
              :src="client.value.avatar"
              class="mr-1"
            />
            <span class="text-nowrap">{{ client.value.username }}</span>
          </span>
        </template>
        <template #cell(girl)="girl">
          <span
            class="text-nowrap"
          >
            <b-avatar
              :src="girl.value.avatar"
              class="mr-1"
            />
            <span class="text-nowrap">{{ girl.value.username }}</span>
          </span>
        </template>

        <template #cell(lobbyTime)="lobbyTime">
          <span
            class="text-nowrap"
          >
            {{ dateFormat(lobbyTime.value) }}
          </span>
        </template>

        <!-- A custom formatted column -->
        <template #cell(id)="chatId">
          <b-button
            variant="gradient-danger"
            class="btn-icon rounded-circle"
            size="sm"
            :to="{ name: 'moderator-chat', params: { chat_id: chatId.value } }"
          >
            <feather-icon icon="MessageSquareIcon" />
          </b-button>

        </template>

      </b-table>
    </b-card-code>

    <b-modal
      id="push-modal"
      ref="push-modal"
      v-model="pushModalShow"
      title="Select time to push"
      ok-title="cancel"
      ok-only
      centered
    >
      <b-form-group>
        <b-form-radio-group
          id="gender"
          v-model="pushTime"
          :options="pushTimeOptions"
          value="male"
          stacked
        />
      </b-form-group>

      <b-button @click="pushChat">
        Push chat
      </b-button>
    </b-modal>
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
        Assign
      </b-button>

    </b-modal>
  </div>
</template>

<style>
table tr td {
  border-right: 1px solid #fff;
}
table tr td:last-child {
  border-right: none;
}
</style>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BTable, BButton, BAvatar, BModal, BFormGroup, BFormRadioGroup,
} from 'bootstrap-vue'

import useJwt from '@/auth/jwt/useJwt'
import store from '@/store'
import moment from 'moment'
import { getUserData } from '@/auth/utils'

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
        { key: 'girl', label: 'Girl' },
        { key: 'lobbyTime', label: 'Time' },
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
      userData: getUserData(),
    }
  },
  mounted() {
    this.fetchLobby()
    this.fetchModerators()
    this.lobbySocket.onmessage = e => {
      const data = JSON.parse(e.data)
      const { command, content } = data
      if (command === 'send_notification') {
        if (content === 'remove-lobby' || content === 'add-lobby') {
          this.fetchLobby()
        }
      }
    }
  },
  methods: {
    dateFormat(s) {
      return moment(s).local().format('HH:mm - DD/MM')
    },
    fetchModerators() {
      useJwt.getModerators()
        .then(response => {
          this.moderators = []
          const { data } = response
          data.forEach(item => {
            this.moderators.push(item.username)
          })
        }).catch(error => {
          console.log(error)
        })
    },
    fetchLobby() {
      useJwt.getLobbies({})
        .then(response => {
          this.items = response.data
          console.log(this.items)
        }).catch(error => {
          console.log(error)
        })

      useJwt.getAssigned()
        .then(response => {
          this.assignedItems = response.data
          console.log(this.assignedItems)
        }).catch(error => {
          console.log(error)
        })
    },
    rowClass(item, type) {
      if (!item || type !== 'row') return
      // eslint-disable-next-line consistent-return
      if (item.status === 'remind') return 'table-reminder'
    },
    chatOpen(chatId) {
      const payload = {
        chatId,
        moderator: this.userName,
      }
      console.log('assigned')
      useJwt.assignChat(payload)
        .then(response => {
          console.log(response.data)
          this.$router.push({ name: 'moderator-chat', params: { chat_id: chatId } })
        }).catch(error => {
          alert(error)
        })
    },
    openPushChat(chatId) {
      this.pushChatIdSelected = chatId
      this.pushModalShow = true
    },
    openAssignModal(chatId) {
      this.assignChatIdSelected = chatId
      this.assignModalShow = true
    },
    pushChat() {
      this.pushModalShow = false
      useJwt.pushChat({ chatId: this.pushChatIdSelected, pushTime: this.pushTime })
        .then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
    },
    assignChat() {
      this.assignModalShow = false
      const payload = {
        chatId: this.assignChatIdSelected,
        moderator: this.assignModerator,
      }
      useJwt.assignChat(payload)
        .then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
    },
    removeLobby(chatId) {
      const payload = {
        chatId,
      }
      useJwt.inactiveChat(payload)
        .then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
    },
  },

}
</script>
