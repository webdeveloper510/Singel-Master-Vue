<template>
  <div>
    <b-tabs pills>
      <b-tab active>
        <template #title>
          <feather-icon
            icon="HeartIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Liked</span>
        </template>
        <b-table
          :fields="likedFields"
          :items="likedGirls"
          responsive
          class="mb-0"
        >
          <template #cell(user)="data">
            <span
              class="text-nowrap"
            >
              <b-avatar
                :src="data.item.user.avatar"
                class="mr-1"
              />
              <span class="text-nowrap">{{ data.item.user.username }}</span>
            </span>
          </template>
          <template #cell(girl)="data">
            <span
              class="text-nowrap"
            >
              <b-avatar
                :src="data.item.girl.avatar"
                class="mr-1"
              />
              <span class="text-nowrap">{{ data.item.girl.username }}</span>
            </span>
          </template>

          <!-- A custom formatted column -->
          <template #cell(id)="client">
            <b-button
              variant="primary"
              class="ml-0 mr-1"
              size="sm"
              title="open detail"
              @click="match(client.item.id)"
            >
              Match
            </b-button>
          </template>
        </b-table>

      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon
            icon="LinkIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Match</span>
        </template>

        <b-card-code
          no-body
        >
          <b-form-input
            v-model="matchFilter"
            placeholder="Search"
            type="text"
            class="ml-1 mb-1"
            style="width: 300px"
          />
          <b-table
            :fields="matchedFields"
            :items="girls"
            :filter="matchFilter"
            responsive
            class="mb-0"
            :tbody-tr-class="rowClass"
          >
            <template #cell(girl)="user">
              <span
                class="text-nowrap"
              >
                <b-avatar
                  :src="user.item.avatar"
                  class="mr-1"
                />
                <span class="text-nowrap">{{ user.item.username }}</span>
              </span>
            </template>

            <template #cell(matches)="user">
              <span
                class="text-nowrap"
              >
                <span class="text-nowrap">{{ user.item.matches }}</span>
                <b-button
                  class="ml-2"
                  variant="primary"
                  @click="matchList(user.item.id)"
                >View</b-button>
              </span>
            </template>

          </b-table>
        </b-card-code>
      </b-tab>
    </b-tabs>

    <b-modal
      id="assign-modal"
      ref="assign-modal"
      v-model="matchDetailModalShow"
      ok-title="cancel"
      ok-only
      centered
    >
      <h3 class="mb-2">
        Matched Customers
      </h3>
      <div>
        <div
          v-for="item in matchCustomers"
          :key="item.id"
          class="mb-1"
        >
          <span
            class="text-nowrap"
          >
            <b-avatar
              :src="item.user.avatar"
              class="mr-1"
            />
            <span class="text-nowrap">{{ item.user.username }}</span>
          </span>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  BTab, BTabs, BTable, BButton, BAvatar, BFormInput,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
// eslint-disable-next-line import/extensions

export default {
  components: {
    BTab,
    BTabs,
    BTable,
    BButton,
    BAvatar,
    BFormInput,
    BCardCode,
  },
  data() {
    return {
      likedFields: [
        { key: 'user', label: 'Customer' },
        { key: 'girl', label: 'Girl' },
        { key: 'id', label: 'Actions' },
      ],
      likedGirls: [],
      matchFilter: '',
      matchedFields: [
        { key: 'girl', label: 'Girl' },
        { key: 'age', label: 'Age' },
        { key: 'matches', label: 'Matched Customers' },
      ],
      girls: [],
      matchDetailModalShow: false,
      matchCustomers: [],
    }
  },
  mounted() {
    this.getLikedList()
    this.getMatchedList()
  },
  methods: {
    getLikedList() {
      const query = '?user_like=1&girl_like=0'
      useJwt.getLikedList(query)
      // console.log(useJwt.getLikedList(query))
        .then(response => {
          this.likedGirls = response.data
          console.log('THIS LIKED GIRLS', this.likedGirls)
        })
    },
    getMatchedList() {
      useJwt.getMatchList()
        .then(response => {
          this.girls = response.data
        })
    },
    match(id) {
      const payload = {
        item_id: id,
      }
      useJwt.matchGirl(payload)
        .then(response => {
          console.log(response)
          this.getLikedList()
          this.getMatchedList()
        })
    },
    matchList(id) {
      this.matchDetailModalShow = true
      const query = `?user_like=1&girl_like=1&girl=${id}`
      useJwt.getLikedList(query)
        .then(response => {
          this.matchCustomers = response.data
          console.log('matchCustomers matchCustomers matchCustomers', this.matchCustomers)
        })
    },
    rowClass(item, type) {
      if (!item || type !== 'row') return
      // eslint-disable-next-line consistent-return
      if (item.matches === 0) return 'd-none'
    },
  },
}
</script>

<style>

</style>
