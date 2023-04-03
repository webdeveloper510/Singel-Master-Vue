<template>
  <!-- Need to add height inherit because Vue 2 don't support multiple root ele -->
  <div style="height: inherit">
    <!-- Main Area -->

    <section class="chat-app-window">

      <!-- Start Chat Logo -->
      <div
        v-if="!activeChat.girl"
      />

      <!-- Chat Content -->
      <div
        v-else
        class="active-chat"
      >
        <!-- Chat Navbar -->
        <div class="chat-navbar">
          <header
            v-if="activeChat"
            class="chat-header chat-log"
          >
            <b-form-textarea
              v-model="activeChat.long_log"
              placeholder="Write logs"
              @mouseout="updateChatLog"
            />

            <!-- Avatar & Name -->
            <div class="d-none align-items-center d-none">

              <!-- Toggle Icon -->
              <div class="sidebar-toggle d-block d-lg-none mr-1">
                <feather-icon
                  icon="MenuIcon"
                  class="cursor-pointer"
                  size="21"
                  @click="mqShallShowLeftSidebar = true"
                />
              </div>

              <b-avatar
                size="36"
                :src="activeChat.girl.avatar"
                class="mr-1 cursor-pointer badge-minimal"
                badge
                :badge-variant="resolveAvatarBadgeVariant(activeChat.girl.status)"
              />
              <h6 class="mb-0">
                {{ activeChat.girl.username }}
              </h6>
            </div>
          </header>
        </div>

        <!-- User Chat Area -->
        <vue-perfect-scrollbar
          ref="refChatLogPS"
          :settings="perfectScrollbarSettings"
          class="user-chats scroll-area user-chats-log"
        >
          <chat-log
            :chat-data="activeChat"
            :profile-user-avatar="activeChat.girl.avatar"
          />
        </vue-perfect-scrollbar>

        <!-- Message Input -->
        <b-form
          class="chat-app-form"
          @submit.prevent="sendMessage"
        >
          <b-input-group class="input-group-merge form-send-message mr-1">
            <b-form-input
              v-model="chatInputMessage"
              placeholder="Skriv ditt meddelande"
            />
          </b-input-group>
          <b-button
            v-b-modal.modal-photo
            variant="primary"
            class="mr-1"
          >
            photo
          </b-button>
          <b-button
            variant="primary"
            type="submit"
          >
            Send
          </b-button>
        </b-form>
      </div>
    </section>

    <!-- Active Chat Contact Details Sidebar -->
    <chat-active-chat-content-details-sidedbar
      v-if="activeChat.girl"
      :shall-show-active-chat-contact-sidebar.sync="shallShowActiveChatContactSidebar"
      :contact="activeChat.customer || {}"
      :log-data="activeChat.customer_log"
      :chat-id="activeChat ? activeChat.id : null"
    />

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <chat-left-sidebar
        v-if="activeChat.girl"
        :chats-contacts="chatsContacts"
        :model-data="activeChat.girl"
        :log-data="activeChat.girl_log"
        :active-chat-contact-id="activeChat ? activeChat.id : null"
        :mq-shall-show-left-sidebar.sync="mqShallShowLeftSidebar"
        @open-chat="openChatOfContact"
      />
    </portal>
    <b-modal
      id="modal-photo"
      ref="modal-photo"
      v-model="modalShow"
      title="Select Photo"
      ok-title="Cancel"
      ok-only
      size="lg"
    >
      <div class="p-1">

        <b-card>
          <b-card-title class="mb-0">
            Photos
          </b-card-title>
          <div style="width: 100%">
            <div
              class="images-wrapper d-block"
              style="width: 100%"
            >
              <div
                v-for="(image, imageIndex) in chatPhotos"
                :key="imageIndex"
                class="image mr-2"
                :style="{ backgroundImage: 'url(' + image.photo + ')' }"
                :class="selectedImage === image?'selected':null"
                @click="selectedImage=image"
              />
            </div>
          </div>
          <b-card-title class="mt-2">
            Captions
          </b-card-title>
          <b-form-input
            v-model="imageCaption"
            placeholder="Input your message"
          />
          <b-button
            variant="primary"
            class="mt-1"
            @click="sendFile()"
          >
            Send
          </b-button>
        </b-card>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  ref, onUnmounted, nextTick,
} from '@vue/composition-api'
import {
  BAvatar, BForm, BInputGroup, BFormInput, BButton, BModal, VBModal, BCard, BCardTitle, BFormTextarea,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
// import { formatDate } from '@core/utils/filter'
import { $themeBreakpoints } from '@themeConfig'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import store from '@/store'
import ChatLeftSidebar from './ChatLeftSidebar.vue'
import chatStoreModule from './chatStoreModule'
import ChatLog from './ChatLog.vue'
import useChat from './useChat'
import router from '@/router'
import ChatActiveChatContentDetailsSidedbar from './ChatActiveChatContentDetailsSidedbar.vue'
import jwtDefaultConfig from '@core/auth/jwt/jwtDefaultConfig'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {

    // BSV
    BAvatar,
    // BDropdown,
    // BDropdownItem,
    BForm,
    BInputGroup,
    BFormInput,
    BButton,
    BModal,
    BCard,
    BCardTitle,
    // 3rd Party
    VuePerfectScrollbar,

    // SFC
    ChatLeftSidebar,
    ChatActiveChatContentDetailsSidedbar,
    ChatLog,
    BFormTextarea,
  },
  directives: {
    'b-modal': VBModal,
  },
  data() {
    return {
      imageCaption: '',
      selectedImage: null,
      time: 0,
    }
  },
  setup() {
    const CHAT_APP_STORE_MODULE_NAME = 'app-chat'

    // Register module
    if (!store.hasModule(CHAT_APP_STORE_MODULE_NAME)) store.registerModule(CHAT_APP_STORE_MODULE_NAME, chatStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CHAT_APP_STORE_MODULE_NAME)) store.unregisterModule(CHAT_APP_STORE_MODULE_NAME)
    })

    const { resolveAvatarBadgeVariant } = useChat()

    // Scroll to Bottom ChatLog
    const refChatLogPS = ref(null)
    const scrollToBottomInChatLog = () => {
      const scrollEl = refChatLogPS.value.$el || refChatLogPS.value
      scrollEl.scrollTop = scrollEl.scrollHeight
    }

    // ------------------------------------------------
    // Chats & Contacts
    // ------------------------------------------------

    const chatsContacts = ref([])
    const contacts = ref([])
    const mySocket = ref({})
    const apiSever = jwtDefaultConfig.socketHost
    const modalShow = ref(false)
    const lobbySocket = ref(store.state.appConfig.lobbySocket)

    const profileUserDataMinimal = ref(JSON.parse(localStorage.getItem('userData')))

    const fetchChatAndContacts = () => {
      store.dispatch('app-chat/fetchChatsAndContacts')
        .then(response => {
          chatsContacts.value = response.data
        })
    }

    const chatPhotos = ref([])
    const getChatPhotos = girlId => {
      store.dispatch('app-chat/getChatPhotos', { girlId })
        .then(response => {
          chatPhotos.value = response.data
        })
    }

    fetchChatAndContacts()

    // ------------------------------------------------
    // Single Chat
    // ------------------------------------------------
    const activeChat = ref({})
    const chatInputMessage = ref('')
    const timer = ref({ id: 0 })
    const openChatOfContact = chatId => {
      // Reset  input value
      chatInputMessage.value = ''

      store.dispatch('app-chat/getChat', { chatId })
        .then(response => {
          activeChat.value = response.data
          if (activeChat.value.status === 'assign') {
            if (activeChat.value.assigned_moderator) {
              if (activeChat.value.assigned_moderator.id !== profileUserDataMinimal.value.id) {
                alert('You have not permission!')
                router.push({ name: 'moderator-lobby' })
              }
            }
          } else {
            alert('You have not permission!')
            router.push({ name: 'moderator-lobby' })
          }

          timer.value.id = setTimeout(() => {
            useJwt.activeChat(activeChat.value.id, { active: 1 })
            router.push({ name: 'moderator-lobby' })

            alert('time out')
          }, 300000)

          // Set unseenMsgs to 0
          const contact = chatsContacts.value.find(c => c.id === chatId)
          if (contact) contact.unseenMsgs = 0

          getChatPhotos(activeChat.value.girl.id)

          // Scroll to bottom
          nextTick(() => {
            scrollToBottomInChatLog()
          })
        })
      const socket = new WebSocket(`ws://${apiSever}/ws/chat/${chatId}/`)
      socket.onopen = e => {
        console.log('chat socket opened!', e)
      }
      socket.onclose = e => {
        console.error('chat socket closed unexpectedly!', e)
      }
      socket.onmessage = e => {
        const data = JSON.parse(e.data)
        const { message } = data
        activeChat.value.messages.push(message)
        chatInputMessage.value = ''
        nextTick(() => {
          scrollToBottomInChatLog()
        })
      }
      mySocket.value = socket

      // if SM device =>  Close Chat & Contacts left sidebar
      // eslint-disable-next-line no-use-before-define
      mqShallShowLeftSidebar.value = false
    }

    const sendMessage = () => {
      if (!chatInputMessage.value) return
      const payload = {
        command: 'new_message',
        tag: 'text',
        message: {
          content: chatInputMessage.value,
          file_url: '',
          file_name: '',
          file_size: '',
        },
        senderType: 'model',
        chatId: activeChat.value.id,
        senderId: profileUserDataMinimal.value.id,
      }

      mySocket.value.send(
        JSON.stringify(payload),
      )

      lobbySocket.value.send(JSON.stringify({
        command: 'send_notification',
        content: {
          chatId: activeChat.value.id,
          senderType: 'model',
        },
      }))

      router.push({ name: 'moderator-lobby' })

      useJwt.getRevenue()
        .then(result => {
          store.commit('appConfig/UPDATE_REVENUE', result.data.revenue)
        })
    }

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const shallShowUserProfileSidebar = ref(false)

    // UI + SM Devices
    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()
    const startConversation = () => {
      if (store.state.app.windowWidth < $themeBreakpoints.lg) {
        mqShallShowLeftSidebar.value = true
      }
    }

    // Active Chat Contact Details
    const shallShowActiveChatContactSidebar = ref(true)

    openChatOfContact(router.currentRoute.params.chat_id)

    return {
      // Filters
      // formatDate,

      // useChat
      resolveAvatarBadgeVariant,

      // Chat & Contacts
      chatsContacts,
      contacts,

      // Single Chat
      refChatLogPS,
      activeChat,
      chatInputMessage,
      openChatOfContact,
      sendMessage,
      mySocket,

      // Profile User Minimal Data
      profileUserDataMinimal,

      // User Profile Sidebar

      shallShowUserProfileSidebar,
      // Active Chat Contact Details

      // UI
      perfectScrollbarSettings,

      // UI + SM Devices
      startConversation,
      mqShallShowLeftSidebar,
      shallShowActiveChatContactSidebar,
      modalShow,
      chatPhotos,
      getChatPhotos,
      timer,
    }
  },
  beforeDestroy() {
    console.log('timer out,')
    console.log('timer out,', this.timer.id)
    if (this.timer.id) {
      clearInterval(this.timer.id)
    }
  },
  methods: {
    sendFile() {
      if (this.selectedImage) {
        const payload = {
          command: 'new_message',
          tag: 'file',
          message: {
            content: this.imageCaption ? this.imageCaption : 'Image',
            file_url: this.selectedImage.photo,
            file_name: '',
            file_size: '',
          },
          senderType: 'model',
          chatId: this.activeChat.id,
          senderId: this.activeChat.girl.id,
        }

        this.mySocket.send(
          JSON.stringify(payload),
        )
        this.$router.push({ name: 'moderator-lobby' })
      }
    },
    updateChatLog() {
      console.log('chat long log:', this.activeChat.long_log)
      useJwt.activeChat(this.activeChat.id, { long_log: this.activeChat.long_log })
    },
  },

}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
@import "~@core/scss/base/pages/app-chat.scss";
@import "~@core/scss/base/pages/app-chat-list.scss";
</style>
