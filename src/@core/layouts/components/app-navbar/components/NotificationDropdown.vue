<template>
  <b-nav-item-dropdown
    class="dropdown-notification mr-25 d-block"
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        :badge="notifications.length"
        badge-classes="bg-danger"
        class="text-body"
        icon="BellIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          Notifications
        </h4>
        <b-badge
          pill
          variant="light-primary"
        >
          {{ notifications.length }} New
        </b-badge>
      </div>
    </li>
    <div class="notification-container">
      <b-link
        v-for="notification in reversedNotifications"
        :key="notification.id"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :src="notification.avatar"
              :text="notification.avatar"
              :variant="notification.type"
            />
          </template>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
          </p>
          <small class="notification-text">{{ notification.subtitle }}</small>
        </b-media>
      </b-link>
    </div>
    <!-- Notifications -->
    <vue-perfect-scrollbar
      v-if="notifications"
      v-once
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area d-none"
      tagname="li"
    >
      <!-- Account Notification -->
      <b-link
        v-for="notification in reversedNotifications"
        :key="notification.id"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :src="notification.avatar"
              :text="notification.avatar"
              :variant="notification.type"
            />
          </template>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
          </p>
          <small class="notification-text">{{ notification.subtitle }}</small>
        </b-media>
      </b-link>
      <b-button @click="addNotification()">
        add notification
      </b-button>

    </vue-perfect-scrollbar>

  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BLink, BAvatar, BButton,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BAvatar,
    BButton,
    VuePerfectScrollbar,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      notifications: [
        {
          id: 0,
          title: 'Revised Order 👋',
          avatar: 'OT',
          subtitle: 'MD Inc. order updated',
          type: 'light-danger',
        },
        {
          id: 1,
          title: 'Revised Order 👋 1',
          avatar: 'MY',
          subtitle: 'MD Inc. order updated1',
          type: 'light-danger',
        },
      ],
    }
  },
  setup() {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    return {
      perfectScrollbarSettings,
    }
  },

  computed: {
    reversedNotifications() {
      console.log(this.notifications)
      return this.notifications.slice().reverse()
    },
  },
  methods: {
    addNotification() {
      const newNotification = {
        title: 'Revised Order new 👋',
        avatar: 'MD',
        subtitle: 'MD Inc. order updated',
        type: 'light-danger',
      }
      this.notifications.push(newNotification)
      console.log(this.notifications)
    },
  },
}
</script>

<style>

</style>
