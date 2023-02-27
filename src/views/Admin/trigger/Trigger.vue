<template>
  <div class="pb-5">
    <div
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

import {
  BButton, VBModal, BFormTextarea,
} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'

import useJwt from '@/auth/jwt/useJwt'
import {
  ref,
} from '@vue/composition-api'

export default {
  name: 'Trigger',
  components: {
    BButton,
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
    const selectedIds = ref([])
    const selectedCustomer = ref([])
    const selectedGirlId = ref('')
    const selectedGirl = ref([])
    const modalShow = ref(false)
    const modalGirlShow = ref(false)
    const messageText = ref('')
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
      selectedCustomer,
      modalShow,
      modalGirlShow,
      selectGirl,
      selectedGirl,
      selectedGirlId,
      messageText,
      selectedIds,
    }
  },
  methods: {
    format() {
      this.selectedCustomer = []
      this.selectedIds = []
      this.selectedGirlId = null
      this.selectedGirl = null
    },
    triggerMessage() {
      useJwt.massTrigger({ girl: this.selectedGirlId, customers: this.selectedIds, message: this.messageText })
        .then(response => {
          console.log(response)
          this.$swal({
            title: 'Successfully triggerd.',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
          this.format()
        }).catch(error => {
          console.log(error)
          this.$swal({
            title: 'Error happened.',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
    addCustomer(customer, customerId) {
      const index = this.selectedIds.indexOf(customerId)
      if (index === -1) {
        this.selectedIds.push(customerId)
        this.selectedCustomer.push(customer)
      } else {
        this.selectedIds.splice(index, 1)
        this.selectedCustomer.splice(index, 1)
      }
    },

  },

}
</script>

<style scoped>

</style>
