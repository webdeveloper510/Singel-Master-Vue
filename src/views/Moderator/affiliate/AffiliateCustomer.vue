<!-- <template>
  <b-card-code
    title="Affiliated Customers"
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
      <template #cell(email)="data">
        {{ data.item.customer.email }}
      </template>
      <template #cell(coins)="data">
        {{ data.item.customer.coins }}
      </template>
      <template #cell(id)="data">
        <b-button
          variant="gradient-primary"
          class="ml-0"
          size="sm"
          @click="removeItem(data.item.id)"
        >
          Cancel
        </b-button>

      </template>
    </b-table>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BTable, BButton,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BCardCode,
    BTable,
    BButton,
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
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'coins', label: 'Coins' },
      ],
    }
  },
  methods: {
    removeItem(id) {
      useJwt.deleteAffiliate(id)
        .then(response => {
          console.log(response)
          this.$router.go()
        }).catch(error => {
          console.log(error)
        })
    },
  },
}
</script> -->
