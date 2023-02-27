<template>
  <div class="navbar-container main-menu-content">
    <horizontal-nav-menu-items
      v-if="userData.role === 'user'"
      :items="navMenuItems"
    />
    <horizontal-nav-menu-items
      v-else-if="userData.role === 'moderator'"
      :items="navMenuItemsModerator"
    />
    <horizontal-nav-menu-items
      v-else-if="userData.role === 'admin'"
      :items="navMenuItemsAdmin"
    />
  </div>
</template>

<script>
import {
  ref,
} from '@vue/composition-api'

import navMenuItems from '@/navigation/horizontal'
import navMenuItemsModerator from '@/navigation/horizontal/moderator'
import navMenuItemsAdmin from '@/navigation/horizontal/admin'
import HorizontalNavMenuItems from './components/horizontal-nav-menu-items/HorizontalNavMenuItems.vue'

export default {
  components: {
    HorizontalNavMenuItems,
  },
  setup() {
    // eslint-disable-next-line no-unused-vars
    const userData = ref(JSON.parse(localStorage.getItem('userData')))
    console.log(JSON.stringify(userData))

    return {
      navMenuItems,
      navMenuItemsModerator,
      navMenuItemsAdmin,
      userData,
    }
  },
}

</script>

<style lang="scss">
@import "~@core/scss/base/core/menu/menu-types/horizontal-menu.scss";
</style>
