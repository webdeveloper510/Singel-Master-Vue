<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ userData.username }}
        </p>
        <span
          v-if="userData.role === 'user'"
          class="user-status text-warning"
        >{{ userDataStore.coins }} coins</span>
        <span
          v-else-if="userData.role === 'moderator' || userData.role === 'admin'"
          class="user-status text-warning"
        >Revenue: $ {{ revenue }}</span>
      </div>
      <b-avatar
        size="40"
        :src="userData.avatar"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon
          v-if="!userData.fullName"
          icon="UserIcon"
          size="22"
        />
      </b-avatar>
    </template>

    <b-dropdown-item
      v-if="userData.role === 'user'"
      :to="{ name: 'profile-edit'}"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="UserIcon"
        class="mr-50"
      />
      <span>Min profil</span>
    </b-dropdown-item>

    <b-dropdown-item
      v-if="userData.role === 'user'"
      :to="{ name: 'customer-chat' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="MessageSquareIcon"
        class="mr-50"
      />
      <span>Chatt</span>
    </b-dropdown-item>

    <b-dropdown-divider v-if="userData.role === 'user'" />

    <b-dropdown-item
      v-if="userData.role === 'user'"
      :to="{ name: 'store' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="CreditCardIcon"
        class="mr-50"
      />
      <span>Butik</span>
    </b-dropdown-item>
    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="logout"
    >
      <feather-icon
        size="16"
        icon="LogOutIcon"
        class="mr-50"
      />
      <span>Logga ut</span>
    </b-dropdown-item></b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      avatarText,
    }
  },
  computed: {
    userDataStore() {
      return this.$store.state.appConfig.userData
    },
    revenue() {
      return this.$store.state.appConfig.revenue
    },
  },
  mounted() {
    if (this.userData.role === 'moderator' || this.userData.role === 'admin') {
      useJwt.getRevenue()
        .then(result => {
          this.$store.commit('appConfig/UPDATE_REVENUE', result.data.revenue)
        })
    }
  },
  methods: {
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
  },
}
</script>
