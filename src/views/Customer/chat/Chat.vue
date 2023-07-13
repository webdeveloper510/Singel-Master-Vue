<template>
  <!-- Need to add height inherit because Vue 2 don't support multiple root ele -->
  <div style="height: inherit;">
    <!-- Main Area -->
    <section class="chat-app-window">

      <!-- Start Chat Logo -->
      <div
        v-if="!activeChat.girl"
        class="start-chat-area"
      >
        <div class="mb-1 start-chat-icon">
          <feather-icon
            icon="MessageSquareIcon"
            size="56"
          />
        </div>
        <h4
          class="sidebar-toggle start-chat-text"
          @click="startConversation"
        >
          Start Conversation
        </h4>
      </div>

      <!-- Chat Content -->
      <div
        v-else
        class="active-chat"
      >
        <!-- Chat Navbar -->
        <div class="chat-navbar">
          <header class="chat-header">

            <!-- Avatar & Name -->
            <div class="d-flex align-items-center">

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
          class="user-chats scroll-area"
        >
          <chat-log
            :chat-data="activeChat"
            :profile-user-avatar="profileUserDataMinimal.avatar"
          />
        </vue-perfect-scrollbar>

        <!-- Message Input -->
        <b-form
          class="chat-app-form"
          @submit.prevent="sendMessage()"
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
            Bild
          </b-button>
          <b-button
            variant="primary"
            type="submit"
            @click="sendMessage()"
          >
            Skicka
          </b-button>
        </b-form>

      </div>
    </section>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <chat-left-sidebar
        :chats-contacts="chatsContacts"
        :active-chat-contact-id="activeChat ? activeChat.id : null"
        :mq-shall-show-left-sidebar.sync="mqShallShowLeftSidebar"
        @open-chat="openChatOfContact"
      />
    </portal>
    <b-modal
      id="modal-photo"
      ref="modal-photo"
      v-model="modalShow"
      title="Välj Bild"
      ok-title="Avbryt"
      ok-only
      size="lg"
    >
      <div class="p-lg-1">

        <b-card>
          <b-card-title class="mb-0">
            Bild
          </b-card-title>

          <vue2-dropzone
            id="dropzone"
            ref="myVueDropzone"
            :options="dropzoneOptions"
            :use-custom-slot="true"
            @vdropzone-success="uploadFile"
          >
            <div class="dropzone-custom-content">
              <h5 class="dropzone-custom-title">
                Dra och släpp för att ladda upp bilder!
              </h5>
            </div>
          </vue2-dropzone>
          <b-card-title class="mt-2">
            Bildtexter
          </b-card-title>
          <b-form-input
            v-model="imageCaption"
            placeholder="Mata in ditt meddelande"
          />
          <b-button
            variant="primary"
            class="mt-1"
            @click="sendFile()"
          >
            Skicka
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
  BAvatar, BForm, BInputGroup, BFormInput, BButton, BModal, VBModal, BCard, BCardTitle,
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
import jwtDefaultConfig from '@core/auth/jwt/jwtDefaultConfig'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import useJwt from '@/auth/jwt/useJwt'
import router from '@/router'

export default {
  components: {

    // BSV
    BAvatar,
    // BDropdown,
    // BDropdownItem,socketHost
    BForm,
    BInputGroup,
    BFormInput,
    BButton,
    BModal,

    // 3rd Party
    VuePerfectScrollbar,

    // SFC
    ChatLeftSidebar,
    ChatLog,
    vue2Dropzone,
    BCard,
    BCardTitle,
  },
  directives: {
    'b-modal': VBModal,
  },
  data() {
    const token = localStorage.getItem('accessToken')
    return {
      dropzoneOptions: {
        url: 'http://singelsajten.se/api/chat/upload-photo/',
        thumbnailWidth: 150,
        maxFilesize: 10.0,
        maxFiles: 1,
        headers: {
          Authorization: `Token ${token}`,
        },
      },
      imageCaption: '',
      selectedImage: null,
      time: 0,
    }
  },
  setup() {
    const CHAT_APP_STORE_MODULE_NAME = 'app-chat'

    const lobbySocket = ref(store.state.appConfig.lobbySocket)

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
    const mySocket = ref(0)
    const apiSever = jwtDefaultConfig.socketHost
    const modalShow = ref(false)

    const fetchChatAndContacts = () => {
      store.dispatch('app-chat/fetchChatsAndContacts')
        .then(response => {
          console.log(response.data, '=============>response.data in lobby')
          chatsContacts.value = response.data
        })
        .catch(error => console.error(error))
    }

    fetchChatAndContacts()

    // ------------------------------------------------
    // Single Chat
    // ------------------------------------------------
    const activeChat = ref({})
    const chatInputMessage = ref('')
    const openChatOfContact = chatId => {
      // Reset send message input value
      chatInputMessage.value = ''

      store.dispatch('app-chat/getChat', { chatId })
        .then(response => {
          console.log(response, '<-------------------------------')
          activeChat.value = response.data
          // Set unseenMsgs to 0
          const contact = chatsContacts.value.find(c => c.id === chatId)
          if (contact) contact.unseenMsgs = 0

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
        console.log('chat Customer socket closed unexpectedly!', e)
      }
      socket.onmessage = e => {
        console.log('chat message received')
        const data = JSON.parse(e.data)
        const { message } = data
        activeChat.value.messages.push(message)
        chatInputMessage.value = ''
        nextTick(() => {
          scrollToBottomInChatLog()
        })
      }

      // if (mySocket.value) {
      //   mySocket.value.close()
      // }

      mySocket.value = socket

      // if SM device =>  Close Chat & Contacts left sidebar
      // eslint-disable-next-line no-use-before-define
      mqShallShowLeftSidebar.value = false
    }
    const sendMessage = () => {
      console.log('HERE')
      if (!chatInputMessage.value) {
        return
      }
      console.log('here', chatInputMessage.value)
      /* coin check */
      const coin = store.state.appConfig.userData.coins
      console.log(coin)
      if (coin < 10) {
        alert('coin error')
        return
      }
      console.log('activechat--------------->', activeChat)
      const payload = {
        command: 'new_message',
        tag: 'text',
        message: {
          content: chatInputMessage.value,
          file_url: '',
          file_name: '',
          file_size: '',
        },
        senderType: 'user',
        chatId: activeChat.value.id,
        customer: activeChat.value.customer.id,
        girl: activeChat.value.girl.id,
      }
      console.log(JSON.stringify(payload))
      if (mySocket) {
        mySocket.value.send(
          JSON.stringify(payload),
        )
        console.log(mySocket.value.readyState)
        if (mySocket.value && mySocket.value.readyState === WebSocket.OPEN) {
          mySocket.value.send(JSON.stringify(payload))
          console.log(mySocket)
          useJwt.updateCoin()
            .then(result => {
              console.log('here ----------->', JSON.stringify(payload))
              store.commit('appConfig/UPDATE_USERDATA', result.data)
              const userData = result.data
              userData.ability = [
                {
                  action: 'manage',
                  subject: 'all',
                },
              ]
              localStorage.setItem('userData', JSON.stringify(userData))
              console.log('here *****%%%%*****----------->', JSON.stringify(payload))
              useJwt.sendMessage(JSON.stringify(payload))
                .then(result2 => {
                  console.log('result------>', result2.data)
                })
            })
        }
      }

      const payload1 = {
        command: 'send_notification',
        content: payload,
      }
      lobbySocket.value.send(
        JSON.stringify(payload1),
      )
    }

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const shallShowUserProfileSidebar = ref(false)

    const profileUserDataMinimal = ref(JSON.parse(localStorage.getItem('userData')))

    // UI + SM Devices
    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()
    const startConversation = () => {
      if (store.state.app.windowWidth < $themeBreakpoints.lg) {
        mqShallShowLeftSidebar.value = true
      }
    }

    lobbySocket.value.onmessage = e => {
      const data = JSON.parse(e.data)

      const { command, content } = data
      console.log(data, 'data========================================>')

      if (command === 'send_notification') {
        if (content.chatId) {
          if (content.senderType === 'user') {
            const contact = chatsContacts.value.find(c => c.id === content.chatId)
            console.log(contact, '-------------------------> contact')
            if (contact) contact.unseenMsgs += 1
          }
        }
      }
    }

    if (router.currentRoute.params.chatId) {
      openChatOfContact(router.currentRoute.params.chatId)
    }

    return {
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
      modalShow,
      lobbySocket,
    }
  },
  methods: {
    uploadFile(file, response) {
      if (file) {
        this.selectedImage = response.file
      }
    },
    sendFile() {
      if (this.selectedImage) {
        const payload = {
          command: 'new_message',
          tag: 'file',
          message: {
            content: this.imageCaption ? this.imageCaption : 'Image',
            file_url: this.selectedImage,
            file_name: '',
            file_size: '',
          },
          senderType: 'user',
          chatId: this.activeChat.id,
          senderId: this.activeChat.customer.id,
        }

        this.mySocket.send(
          JSON.stringify(payload),
        )
      } else {
        alert('select Image')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
[dir] {
  .dark-layout {
    .content-area-wrapper {
      .sidebar {
        .sidebar-content {
          background-color: #242424 !important;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import "~@core/scss/base/pages/app-chat.scss";
@import "~@core/scss/base/pages/app-chat-list.scss";
</style>
