import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }
    console.log(this.axiosIns)
    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        // Get token from localStorage
        const accessToken = this.getToken()
        // console.log(accessToken)
        // If token is present add it to request's Authorization Header
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error),
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => response,
      error => {
        // const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config

        // if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then(r => {
              this.isAlreadyFetchingAccessToken = false

              // Update accessToken in localStorage
              this.setToken(r.data.accessToken)
              this.setRefreshToken(r.data.refreshToken)

              this.onAccessTokenFetched(r.data.accessToken)
            })
          }
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(accessToken => {
              // Make sure to assign accessToken according to your response.
              // Check: https://pixinvent.ticksy.com/ticket/2413870
              // Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axiosIns(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      },
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  register(...args) {
    return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
  }

  activate(...args) {
    return this.axiosIns.post(this.jwtConfig.activateEndpoint, ...args)
  }

  createModel(...args) {
    return this.axiosIns.post(this.jwtConfig.createModelEndpoint, ...args)
  }

  createModerator(...args) {
    return this.axiosIns.post(this.jwtConfig.createModeratorEndpoint, ...args)
  }

  updateModel(id, ...args) {
    return this.axiosIns.put(`${this.jwtConfig.updateModelEndpoint + id}/`, ...args)
  }

  getModels(query) {
    return this.axiosIns.get(this.jwtConfig.createModelEndpoint + query)
  }

  getCustomers(query) {
    return this.axiosIns.get(this.jwtConfig.getCustomerEndpoint + query)
  }

  getModelDetail(id) {
    return this.axiosIns.get(`${this.jwtConfig.getmodelDetailview + id}`)
  }

  getModelPublicPhotos(id) {
    return this.axiosIns.get(`${this.jwtConfig.uploadProfilePhotoEndpoint}?model_id=${id}&private=0`)
  }

  getModelPrivatePhotos(id) {
    return this.axiosIns.get(`${this.jwtConfig.uploadProfilePhotoEndpoint}?model_id=${id}&private=1`)
  }

  uploadProfilePhoto(...args) {
    return this.axiosIns.post(this.jwtConfig.uploadProfilePhotoEndpoint, ...args)
  }

  createChat(...args) {
    return this.axiosIns.post(this.jwtConfig.createChatEndpoint, ...args)
  }

  massTrigger(...args) {
    return this.axiosIns.post(this.jwtConfig.massTriggerEndpoint, ...args)
  }

  removeProfilePhoto(id) {
    return this.axiosIns.delete(`${this.jwtConfig.photoDetailEndpoint + id}/`)
  }

  profile() {
    return this.axiosIns.get(this.jwtConfig.profileEndpoint)
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    })
  }

  getLobbies(...args) {
    return this.axiosIns.get(this.jwtConfig.getLobbiesEndpoint, ...args)
  }

  getCustomerDetail(customerId) {
    return this.axiosIns.get(`${this.jwtConfig.getCustomerEndpoint + customerId}/`)
  }

  createLog(...args) {
    return this.axiosIns.post(this.jwtConfig.LogsEndpoint, ...args)
  }

  updateLog(logId, ...args) {
    return this.axiosIns.put(`${this.jwtConfig.LogsEndpoint + logId}/`, ...args)
  }

  activeChat(chatId, ...args) {
    return this.axiosIns.put(`${this.jwtConfig.chatDetailEndpoint + chatId}/`, ...args)
  }

  pushChat(...args) {
    return this.axiosIns.post(this.jwtConfig.pushChatEndpoint, ...args)
  }

  assignChat(...args) {
    return this.axiosIns.post(this.jwtConfig.assignChatEndpoint, ...args)
  }

  getAssigned() {
    return this.axiosIns.get(`${this.jwtConfig.getLobbiesEndpoint}?status=assign`)
  }

  getModerators() {
    return this.axiosIns.get(this.jwtConfig.createModeratorEndpoint)
  }

  updateCustomerDetail(customerId, ...args) {
    console.log(...args)
    return this.axiosIns.put(`${this.jwtConfig.getCustomerEndpoint + customerId}/`, ...args)
  }

  UpdatePassword(formData) {
    return this.axiosIns.post(this.jwtConfig.getUpdatePasswordEndpoint, formData)
  }

  updateCustomerAvatar(customerId, ...args) {
    return this.axiosIns.put(`${this.jwtConfig.getCustomerPhotoEndpoint + customerId}/`, ...args)
  }

  updateCoin() {
    return this.axiosIns.post(this.jwtConfig.updateCoinEndpoint)
  }

  getAffiliateList(type, moderator = '') {
    return this.axiosIns.get(`${this.jwtConfig.affiliateEndpoint}?type=${type}&moderator=${moderator}`)
  }

  createAffiliate(...args) {
    return this.axiosIns.post(this.jwtConfig.affiliateEndpoint, ...args)
  }

  deleteAffiliate(id) {
    return this.axiosIns.delete(`${this.jwtConfig.affiliateEndpoint + id}/`)
  }

  getModeratorSettingList(type, moderator = '') {
    return this.axiosIns.get(`${this.jwtConfig.moderatorSettingEndpoint}?type=${type}&moderator=${moderator}`)
  }

  getModeratorSetting() {
    return this.axiosIns.get(this.jwtConfig.moderatorSettingEndpoint)
  }

  updateModeratorSetting(id, ...args) {
    return this.axiosIns.put(`${this.jwtConfig.moderatorSettingEndpoint + id}/`, ...args)
  }

  createTransaction(...args) {
    return this.axiosIns.post(this.jwtConfig.transactionEndpoint, ...args)
  }

  getRevenue(...args) {
    return this.axiosIns.post(this.jwtConfig.revenueEndpoint, ...args)
  }

  getTransaction(moderator = '', year = '', month = '') {
    return this.axiosIns.get(`${this.jwtConfig.transactionEndpoint}?moderator=${moderator}&year=${year}&month=${month}`)
  }

  getModeratorStatistic(...args) {
    return this.axiosIns.post(this.jwtConfig.statisticEndpoint, ...args)
  }

  userLike(...args) {
    return this.axiosIns.post(this.jwtConfig.userLikeEndpoint, ...args)
  }

  userLikeget(...args) {
    return this.axiosIns.get(this.jwtConfig.getLikedGirlsEndpoint, ...args)
  }

  getLikedGirls() {
    return this.axiosIns.get(this.jwtConfig.getLikedGirlsEndpoint)
  }

  addCoin(...args) {
    return this.axiosIns.post(this.jwtConfig.addCoinEndpoint, ...args)
  }

  deleteCustomer(...args) {
    return this.axiosIns.post(this.jwtConfig.deleteCustomerEndpoint, ...args)
  }

  getRandomGirl() {
    return this.axiosIns.get(this.jwtConfig.randomGirlEndpoint)
  }

  inactiveChat(...args) {
    return this.axiosIns.post(this.jwtConfig.inactiveChatEndpoint, ...args)
  }

  getLikedList(query) {
    return this.axiosIns.get(this.jwtConfig.girlLikeListEndpoint + query)
  }

  matchGirl(...args) {
    return this.axiosIns.post(this.jwtConfig.girlLikeListEndpoint, ...args)
  }

  getMatchList(...args) {
    return this.axiosIns.post(this.jwtConfig.girlMatchListEndpoint, ...args)
  }
}
