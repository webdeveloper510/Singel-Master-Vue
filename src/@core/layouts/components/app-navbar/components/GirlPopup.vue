<template>
  <b-nav-item-dropdown
    v-if="userData"
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user girl-popup"
  >
    <template #button-content>
      <b-avatar
        size="40"
        :src="userData.avatar"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      />
      <div class="d-sm-flex d-none user-nav float-right align-items-start ml-1">
        <p class="user-name font-weight-bolder mb-0 ml-0">
          {{ userData.username }}
        </p>
        <span class="user-status text-success">{{ userData.age }}</span>
      </div>
      <div class="d-flex align-items-start justify-content-center ml-1 flex-column">
        <b-button
          variant="primary"
          @click="create_chat(userData.id)"
        >
          Send Message
        </b-button>
      </div>

    </template>
  </b-nav-item-dropdown>
</template>

<script>
import { BAvatar, BButton, BNavItemDropdown } from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BNavItemDropdown,
    BAvatar,
    BButton,
  },
  data() {
    return {
      userData: null,
      avatarText,
      userId: JSON.parse(localStorage.getItem('userData')).id,
    }
  },
  mounted() {
    this.fetchGirls()
    setInterval(() => {
      this.fetchGirls()
    }, 60000)
  },
  methods: {
    fetchGirls() {
      useJwt.getRandomGirl()
        .then(result => {
          const { data } = result
          // eslint-disable-next-line prefer-destructuring
          this.userData = data[0]
        })
        .catch(error => {
          console.log(error)
        })
    },
    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      localStorage.removeItem('userData')

      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push({ name: 'auth-login' })
    },
    create_chat(girlId) {
      useJwt.createChat({ girl: girlId, customer: this.userId })
        .then(response => {
          console.log(response.data)
          this.$router.push({
            name: 'customer-chat-spec',
            params: { chatId: response.data.id },
          }).catch(err => {
            console.log(err)
            this.$router.go()
          })
        }).catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
