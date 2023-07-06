import axios from '@axios'

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://singelsajten.se:8000'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchChatsAndContacts() {
      return new Promise((resolve, reject) => {
        axios
          .get(`${API_BASE_URL}/api/chat/`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    getProfileUser() {
      return new Promise((resolve, reject) => {
        axios
          .get(`${API_BASE_URL}/apps/chat/users/profile-user`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    getChat(ctx, { chatId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${API_BASE_URL}/api/chat/detail/${chatId}/`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    sendMessage(ctx, { contactId, message, senderId }) {
      console.log()
      return new Promise((resolve, reject) => {
        axios
          .post(`${API_BASE_URL}/apps/chat/chats/${contactId}`, { message, senderId })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
