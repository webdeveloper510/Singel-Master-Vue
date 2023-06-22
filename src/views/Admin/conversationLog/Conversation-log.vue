<template>
    <div class="pb-5">
      <div>
        <b-button
          v-b-modal.modal-prevent-closing
          variant="gradient-primary"
          class="btn"
        >Select Customer
        </b-button>
        <b-card-code
          v-if="selectedCustomerId"
          title="To Customer"
          no-body
          class="mt-2"
        >
          <b-table
            :fields="fields"
            :items="selectedCustomer"
            responsive
            class="mb-0"
          >
            <template #cell(avatar)="avatar">
              <span
                class="text-nowrap"
              >
                <b-avatar
                  :src="avatar.value"
                  class="mr-1"
                />
              </span>
            </template>
          </b-table>
        </b-card-code>
        <b-modal
          id="modal-prevent-closing"
          ref="my-modal"
          v-model="modalShow"
          title="Select Customer"
          ok-title="Close"
          ok-only
          size="xl"
        >
          <customers @select-customer="selectCustomer" />
        </b-modal>
      </div>
      <div
        v-if="selectedCustomerId"
        class="mt-2"
      >
        <b-button
          v-b-modal.select-girl
          variant="gradient-primary"
          class="btn"
        >Select Model
        </b-button>
        <b-card-code
          v-if="selectedGirlId"
          title="From Model"
          no-body
          class="mt-2"
        >
          <b-table
            :fields="fields"
            :items="selectedGirl"
            responsive
            class="mb-0"
          >
            <template #cell(avatar)="avatar">
              <span
                class="text-nowrap"
              >
                <b-avatar
                  :src="avatar.value"
                  class="mr-1"
                />
              </span>
            </template>
          </b-table>
        </b-card-code>
        <b-modal
          id="select-girl"
          ref="girls-modal"
          v-model="modalGirlShow"
          title="Select Modal"
          ok-title="Close"
          size="xl"
        >
          <models @select-girl="selectGirl" />
        </b-modal>
      </div>
      <div
        v-if="selectedGirlId"
        class="mt-4"
      >
        <h4>Input your first message</h4>
        <b-form-textarea
          id="about-me"
          v-model="messageText"
          placeholder=""
          rows="3"
          class="mt-2"
        />
        <b-button
          v-if="messageText"
          variant="gradient-primary"
          class="btn mt-2 mb-4"
          @click="triggerMessage"
        >Send Message
        </b-button>
      </div>
    </div>
  </template>
<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BTable, BButton, BAvatar, BModal, VBModal, BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import Customers from './Customers.vue'
import Models from './Models.vue'
import useJwt from '@/auth/jwt/useJwt'
import {
  ref,
} from '@vue/composition-api'

export default {
  name: 'Trigger',
  components: {
    BButton,
    BCardCode,
    BTable,
    BAvatar,
    BModal,
    Customers,
    Models,
    BFormTextarea,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      fields: [
        { key: 'avatar', label: 'Photo' },
        { key: 'gender', label: 'Gender' },
        { key: 'username', label: 'username' },
        { key: 'county', label: 'County' },
        { key: 'city', label: 'City' },
        { key: 'age', label: 'Age' },
        { key: 'about_me', label: 'Description' },
      ],
      items: [
      ],
    }
  },
  setup() {
    const selectedCustomerId = ref('')
    const selectedCustomer = ref([])
    const selectedGirlId = ref('')
    const selectedGirl = ref([])
    const modalShow = ref(false)
    const modalGirlShow = ref(false)
    const messageText = ref('')
    const selectCustomer = customerId => {
      selectedCustomerId.value = customerId
      useJwt.getCustomerDetail(customerId)
        .then(response => {
          selectedCustomer.value = []
          selectedCustomer.value.push(response.data)
          modalShow.value = false
        }).catch(error => {
          console.log(error)
        })
    }
    const selectGirl = girlId => {
      selectedGirlId.value = girlId
      useJwt.getModelDetail(girlId)
        .then(response => {
          selectedGirl.value = []
          selectedGirl.value.push(response.data)
          modalGirlShow.value = false
        }).catch(error => {
          console.log(error)
        })
    }
    return {
      selectCustomer,
      selectedCustomerId,
      selectedCustomer,
      modalShow,
      modalGirlShow,
      selectGirl,
      selectedGirl,
      selectedGirlId,
      messageText,
    }
  },
  methods: {
    triggerMessage() {
      useJwt.createChat({ girl: this.selectedGirlId, customer: this.selectedCustomerId, message: this.messageText })
        .then(response => {
          console.log(response.data)
          this.$router.push({ name: 'moderator-chat', params: { chat_id: response.data.id } })
        }).catch(error => {
          console.log(error)
        })
    },
  },

}
</script>

<style scoped>

</style>
