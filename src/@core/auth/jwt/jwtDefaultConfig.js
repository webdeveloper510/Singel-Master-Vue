export default {
  // Endpoints
  socketHost: 'singelsaten.se',
  loginEndpoint: 'http://singelsaten.se:8000/auth/token/login/',
  registerEndpoint: 'http://singelsaten.se:8000/auth/users/',
  refreshEndpoint: 'http://singelsaten.se:8000/jwt/refresh-token',
  logoutEndpoint: 'http://singelsaten.se:8000/jwt/logout',
  getCustomerEndpoint: 'http://singelsaten.se:8000/api/moderator/customers/',
  profileEndpoint: 'http://singelsaten.se:8000/auth/users/me/',
  createModelEndpoint: 'http://singelsaten.se:8000/api/moderator/model/',
  updateModelEndpoint: 'http://singelsaten.se:8000/api/moderator/model-photo/',
  getLikedGirlsEndpoint: 'http://singelsaten.se:8000/api/moderator/liked-girls/',
  userLikeEndpoint: 'http://singelsaten.se:8000/api/moderator/user-like/',
  randomGirlEndpoint: 'http://singelsaten.se:8000/api/moderator/random-girl/',
  createChatEndpoint: 'http://singelsaten.se:8000/api/chat/',
  girlLikeListEndpoint: 'http://singelsaten.se:8000/api/admin/girl-like/',
  createModeratorEndpoint: 'http://singelsaten.se:8000/api/admin/moderator/',
  getLobbiesEndpoint: 'http://singelsaten.se:8000/api/chat/message/',
  assignChatEndpoint: 'http://singelsaten.se:8000/api/chat/message/',
  massTriggerEndpoint: 'http://singelsaten.se:8000/api/admin/mass-trigger/',
  affiliateEndpoint: 'http://singelsaten.se:8000/api/moderator/affiliate/',
  getmodelDetailview: 'http://singelsaten.se:8000/api/moderator/models/',
  addCoinEndpoint: 'http://singelsaten.se:8000/api/admin/customer/add-coin/',
  deleteCustomerEndpoint: 'http://singelsaten.se:8000/api/admin/customer/delete/',
  updateCoinEndpoint: 'http://singelsaten.se:8000/api/chat/update-coin/',
  moderatorSettingEndpoint: 'http://singelsaten.se:8000/api/admin/moderator-setting/',
  girlMatchListEndpoint: 'http://singelsaten.se:8000/api/admin/girl-match/',
  uploadProfilePhotoEndpoint: 'http://singelsaten.se:8000/api/moderator/model-photo/',
  transactionEndpoint: 'http://singelsaten.se:8000/api/moderator/transactions/',
  getUpdatePasswordEndpoint: 'http://singelsaten.se:8000/change-password/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
