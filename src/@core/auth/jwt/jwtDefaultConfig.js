export default {
  // Endpoints
  socketHost: 'singelsajten.se:8000',
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
  createChatEndpoint: 'http://singelsajten.se:8000/api/chat/',
  girlLikeListEndpoint: 'http://singelsajten.se:8000/api/admin/girl-like/',
  createModeratorEndpoint: 'http://singelsajten.se:8000/api/admin/moderator/',
  getLobbiesEndpoint: 'http://singelsajten.se:8000/api/chat/message/',
  assignChatEndpoint: 'http://singelsajten.se:8000/api/chat/message/',
  massTriggerEndpoint: 'http://singelsajten.se:8000/api/admin/mass-trigger/',
  affiliateEndpoint: 'http://singelsajten.se:8000/api/moderator/affiliate/',
  getmodelDetailview: 'http://singelsajten.se:8000/api/moderator/models/',
  addCoinEndpoint: 'http://singelsajten.se:8000/api/admin/customer/add-coin/',
  deleteCustomerEndpoint: 'http://singelsajten.se:8000/api/admin/customer/delete/',
  updateCoinEndpoint: 'http://singelsajten.se:8000/api/chat/update-coin/',
  moderatorSettingEndpoint: 'http://singelsajten.se:8000/api/admin/moderator-setting/',
  girlMatchListEndpoint: 'http://singelsajten.se:8000/api/admin/girl-match/',
  uploadProfilePhotoEndpoint: 'http://singelsajten.se:8000/api/moderator/model-photo/',
  transactionEndpoint: 'http://singelsajten.se:8000/api/moderator/transactions/',
  getUpdatePasswordEndpoint: 'http://singelsajten.se:8000/change-password/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
