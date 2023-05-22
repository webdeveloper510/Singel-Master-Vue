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
  createChatEndpoint: 'http://singelsaten.se:8000/api/chat/detail/',
  girlLikeListEndpoint: 'http://singelsaten.se:8000/api/moderator/user-like/',
  createModeratorEndpoint: 'http://singelsaten.se:8000/api/moderator/model/',
  getLobbiesEndpoint: 'http://singelsaten.se:8000/api/chat/assign/',
  assignChatEndpoint: 'http://singelsaten.se:8000/api/chat/check_chat_assign/',
  massTriggerEndpoint: 'http://singelsaten.se:8000/api/admin/mass-trigger/',
  affiliateEndpoint: 'http://singelsaten.se:8000/api/moderator/affiliate/',
  getmodelDetailview: 'http://singelsaten.se:8000/api/moderator/models/',
  addCoinEndpoint: 'http://singelsaten.se:8000/api/admin/customer/add-coin/',
  deleteCustomerEndpoint: 'http://singelsaten.se:8000/api/admin/customer/delete/',
  updateCoinEndpoint: 'http://singelsaten.se:8000/api/chat/update-coin/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
