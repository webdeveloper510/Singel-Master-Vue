<template>
  <div class="sidebar-left">
    <div class="sidebar">

      <!-- Logged In User Profile Sidebar -->

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

        <!-- Header -->
        <div class="chat-fixed-search">
          <div class="d-flex align-items-center w-100">
            <!-- Search -->
            <b-input-group class="input-group-merge ml-1 w-100 round">
              <b-input-group-prepend is-text>
                <feather-icon
                  icon="SearchIcon"
                  class="text-muted"
                />
              </b-input-group-prepend>
              <b-form-input
                v-model="searchQuery"
                placeholder="Sök..."
              />
            </b-input-group>
          </div>
        </div>

        <!-- ScrollArea: Chat & Contacts -->
        <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="chat-user-list-wrapper list-group scroll-area"
        >

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
import {
  BInputGroup, BInputGroupPrepend, BFormInput,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { ref, computed } from '@vue/composition-api'
import ChatContact from './ChatContact.vue'

export default {
  components: {

    // BSV
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,

    // 3rd party
    VuePerfectScrollbar,

    // SFC
    ChatContact,
  },
  props: {
    chatsContacts: {
      type: Array,
      required: true,
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

    const searchFilterFunction = contact => contact.girl.username.toLowerCase().includes(searchQuery.value.toLowerCase())
    console.log(props.chatsContacts)
    const filteredChatsContacts = computed(() => props.chatsContacts.filter(searchFilterFunction))

    return {
      // Search Query
      searchQuery,
      filteredChatsContacts,

      // UI
      resolveChatContact,
      perfectScrollbarSettings,
    }
  },
}
</script>
