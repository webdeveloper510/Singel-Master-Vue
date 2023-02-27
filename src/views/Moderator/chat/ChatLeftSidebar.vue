<template>
  <div class="sidebar-left">
    <div class="sidebar">

      <!-- Logged In User Profile Sidebar -->
      <user-profile-sidebar
        :shall-show-user-profile-sidebar="true"
        :profile-user-data="modelData"
        :log-data="logData"
        :chat-id="activeChatContactId"
        @close-sidebar="$emit('update:shall-show-user-profile-sidebar', false)"
      />
      <!-- Sidebar Content -->
      <div
        class="sidebar-content"
        :class="{'show': mqShallShowLeftSidebar}"
      >

        <!-- Sidebar close icon -->
        <span class="sidebar-close-icon">
          <feather-icon
            icon="XIcon"
            size="16"
            @click="$emit('update:mq-shall-show-left-sidebar', false)"
          />
        </span>

        <!-- ScrollArea: Chat & Contacts -->
        <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="chat-user-list-wrapper list-group scroll-area"
        >

          <!-- Chats Title -->
          <h4 class="chat-list-title">
            Model Information
          </h4>

          <!-- Chats -->
          <ul class="chat-users-list chat-list media-list">
            <chat-contact
              v-for="contact in filteredChatsContacts"
              :key="contact.id"
              :user="contact"
              tag="li"
              :class="{'active': activeChatContactId === contact.id}"
              is-chat-contact
              @click="$emit('open-chat', contact.id)"
            />
          </ul>

        </vue-perfect-scrollbar>
      </div>

    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { ref, computed } from '@vue/composition-api'
import ChatContact from './ChatContact.vue'
import UserProfileSidebar from './UserProfileSidebar.vue'

export default {
  components: {

    // BSV
    // 3rd party
    VuePerfectScrollbar,

    // SFC
    ChatContact,
    UserProfileSidebar,
  },
  props: {
    chatsContacts: {
      type: Array,
      required: true,
    },
    modelData: {
      type: Object,
      required: true,
    },
    logData: {
      type: Object,
      default: null,
    },
    activeChatContactId: {
      type: Number,
      default: null,
    },
    mqShallShowLeftSidebar: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const resolveChatContact = userId => props.contacts.find(contact => contact.id === userId)

    // Search Query
    const searchQuery = ref('')

    const searchFilterFunction = contact => contact.customer.username.toLowerCase().includes(searchQuery.value.toLowerCase())
    const filteredChatsContacts = computed(() => props.chatsContacts.filter(searchFilterFunction))
    const filteredContacts = computed(() => props.contacts.filter(searchFilterFunction))

    return {
      // Search Query
      searchQuery,
      filteredChatsContacts,
      filteredContacts,

      // UI
      resolveChatContact,
      perfectScrollbarSettings,
    }
  },
}
</script>
