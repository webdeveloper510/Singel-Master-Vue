export default {
  // Endpoints
  socketHost: '127.0.0.1:8000',
  loginEndpoint: 'http://127.0.0.1:8000/auth/token/login/',
  registerEndpoint: 'http://127.0.0.1:8000/auth/users/',
  refreshEndpoint: 'http://127.0.0.1:8000/jwt/refresh-token',
  logoutEndpoint: 'http://127.0.0.1:8000/jwt/logout',
  getCustomerEndpoint: 'http://127.0.0.1:8000/api/moderator/customers/',
  profileEndpoint: 'http://127.0.0.1:8000/auth/users/me/',
  createModelEndpoint: 'http://127.0.0.1:8000/api/moderator/model/',
  updateModelEndpoint: 'http://127.0.0.1:8000/api/moderator/model-photo/',
  getLikedGirlsEndpoint: 'http://127.0.0.1:8000/api/moderator/liked-girls/',
  userLikeEndpoint: 'http://127.0.0.1:8000/api/moderator/user-like/',
  randomGirlEndpoint: 'http://127.0.0.1:8000/api/moderator/random-girl/',
  createChatEndpoint: 'http://127.0.0.1:8000/api/chat/',
  girlLikeListEndpoint: 'http://127.0.0.1:8000/api/admin/girl-like/',
  createModeratorEndpoint: 'http://127.0.0.1:8000/api/admin/moderator/',
  getLobbiesEndpoint: 'http://127.0.0.1:8000/api/chat/message/',
  assignChatEndpoint: 'http://127.0.0.1:8000/api/chat/message/',
  massTriggerEndpoint: 'http://127.0.0.1:8000/api/admin/mass-trigger/',
  affiliateEndpoint: 'http://127.0.0.1:8000/api/moderator/affiliate/',
  getmodelDetailview: 'http://127.0.0.1:8000/api/moderator/models/',
  addCoinEndpoint: 'http://127.0.0.1:8000/api/admin/customer/add-coin/',
  deleteCustomerEndpoint: 'http://127.0.0.1:8000/api/admin/customer/delete/',
  updateCoinEndpoint: 'http://127.0.0.1:8000/api/chat/update-coin/',
  moderatorSettingEndpoint: 'http://127.0.0.1:8000/api/admin/moderator-setting/',
  girlMatchListEndpoint: 'http://127.0.0.1:8000/api/admin/girl-match/',
  uploadProfilePhotoEndpoint: 'http://127.0.0.1:8000/api/moderator/model-photo/',
  transactionEndpoint: 'http://127.0.0.1:8000/api/moderator/transactions/',
  getUpdatePasswordEndpoint: 'http://127.0.0.1:8000/change-password/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
