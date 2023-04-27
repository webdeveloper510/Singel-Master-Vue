export default {
  // Endpoints
  socketHost: 'singelsajten.se',
  loginEndpoint: 'http://singelsajten.se:8000/auth/token/login/',
  registerEndpoint: 'http://singelsajten.se:8000/auth/users/',
  refreshEndpoint: 'http://singelsajten.se:8000/jwt/refresh-token',
  logoutEndpoint: 'http://singelsajten.se:8000/jwt/logout',
  getCustomerEndpoint: 'http://singelsajten.se:8000/api/moderator/customers/',
  profileEndpoint: 'http://singelsajten.se:8000/auth/users/me/',
  createModelEndpoint: 'http://singelsajten.se:8000/api/moderator/model/',
  updateModelEndpoint: 'http://singelsajten.se:8000/api/moderator/model-photo/',
  getLikedGirlsEndpoint: 'http://singelsajten.se:8000/api/moderator/liked-girls/',
  userLikeEndpoint: 'http://singelsajten.se:8000/api/moderator/user-like/',
  randomGirlEndpoint: 'http://singelsajten.se:8000/api/moderator/random-girl/',
  createChatEndpoint: 'http://singelsajten.se:8000/api/chat/detail/',
  girlLikeListEndpoint: 'http://singelsajten.se:8000/api/moderator/user-like/',
  createModeratorEndpoint: 'http://singelsajten.se:8000/api/moderator/model/',
  getLobbiesEndpoint: 'http://singelsajten.se:8000/api/chat/assign/',
  assignChatEndpoint: 'http://singelsajten.se:8000/api/chat/check_chat_assign/',
  massTriggerEndpoint: 'http://singelsajten.se:8000/api/admin/mass-trigger/',
  affiliateEndpoint: 'http://singelsajten.se:8000/api/moderator/affiliate/',
  getmodelDetailview: 'http://singelsajten.se:8000/api/moderator/models/',
  addCoinEndpoint: 'http://singelsajten.se:8000/api/admin/customer/add-coin/',
  deleteCustomerEndpoint: 'http://singelsajten.se:8000/api/admin/customer/delete/',
  updateCoinEndpoint: 'http://singelsajten.se:8000/api/chat/update-coin/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
