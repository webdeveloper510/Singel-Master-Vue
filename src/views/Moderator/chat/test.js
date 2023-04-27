export default {
  // Endpoints
  socketHost: '127.0.0.1',
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
  createChatEndpoint: 'http://127.0.0.1:8000/api/chat/detail/',
  girlLikeListEndpoint: 'http://127.0.0.1:8000/api/moderator/user-like/',
  createModeratorEndpoint: 'http://127.0.0.1:8000/api/moderator/model/',
  getLobbiesEndpoint: 'http://127.0.0.1:8000/api/chat/assign/',
  assignChatEndpoint: 'http://127.0.0.1:8000/api/chat/check_chat_assign/',
  massTriggerEndpoint: 'http://127.0.0.1:8000/api/admin/mass-trigger/',
  affiliateEndpoint: 'http://127.0.0.1:8000/api/moderator/affiliate/',
  getmodelDetailview: 'http://127.0.0.1:8000/api/moderator/models/',
  addCoinEndpoint: 'http://127.0.0.1:8000/api/admin/customer/add-coin/',
  deleteCustomerEndpoint: 'http://127.0.0.1:8000/api/admin/customer/delete/',
  updateCoinEndpoint: 'http://127.0.0.1:8000/api/chat/update-coin/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
