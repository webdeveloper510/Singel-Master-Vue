<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <b-navbar-nav class="nav align-items-center mr-auto">
      <girl-popup v-if="customer" />
      <girl-popup
        v-else
        style="visibility: hidden;"
      />
    </b-navbar-nav>

    <!--    &lt;!&ndash; Left Col &ndash;&gt;-->
    <!--    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">-->
    <!--      &lt;!&ndash;      <bookmarks />&ndash;&gt;-->
    <!--    </div>-->
    <!-- Right Col -->
    <b-navbar-nav class="nav align-items-center ml-auto">
      <!--      <locale />-->
      <!--      <dark-Toggler class="d-none d-lg-block" />-->
      <!--      <search-bar />-->
      <!--      <cart-dropdown />-->
      <notification-dropdown style="display: none!important;" />
      <user-dropdown
        v-if="customer"
      />
      <b-button
        v-else-if="authenticated"
        @click="logout"
      > LogOut
      </b-button>
      <b-button
        v-else
        :to="{name:'auth-login'}"
      > Login
      </b-button>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BButton,
} from 'bootstrap-vue'
// import Bookmarks from './components/Bookmarks.vue'
// import Locale from './components/Locale.vue'
// import DarkToggler from './components/DarkToggler.vue'
// import SearchBar from './components/SearchBar.vue'
// import CartDropdown from './components/CartDropdown.vue'
import NotificationDropdown from './components/NotificationDropdown.vue'
import UserDropdown from './components/UserDropdown.vue'
// eslint-disable-next-line import/no-unresolved
import GirlPopup from './components/GirlPopup.vue'
import useJwt from '@/auth/jwt/useJwt'
import { initialAbility } from '@/libs/acl/config'

export default {
  components: {
    BLink,
    BButton,
    // Navbar Components
    BNavbarNav,
    // Bookmarks,
    // Locale,
    // DarkToggler,
    // SearchBar,
    // CartDropdown,
    NotificationDropdown,
    UserDropdown,
    GirlPopup,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },

  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))

    let customer = false
    let authenticated = false
    if (userData) {
      const { role } = userData
      authenticated = true
      customer = role === 'user'
    }

    return {
      customer,
      authenticated,
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
