import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchChatsAndContacts() {
      return new Promise((resolve, reject) => {
        axios
          .get('http://singelsajten.se:8000/api/chat/')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    getProfileUser() {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/chat/users/profile-user')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    getChat(ctx, { chatId }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://singelsajten.se:8000/api/chat/detail/${chatId}/`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    sendMessage(ctx, { contactId, message, senderId }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/apps/chat/chats/${contactId}`, { message, senderId })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
