export default {
  // Endpoints
  socketHost: 'singelsajten.se',
  loginEndpoint: 'http://singelsajten.se:8000/auth/token/login/',
  registerEndpoint: 'http://singelsajten.se:8000/auth/users/',
  createModelEndpoint: 'http://singelsajten.se:8000/api/moderator/model/',
  createModeratorEndpoint: 'http://singelsajten.se:8000/api/admin/moderator/',
  getCustomerEndpoint: 'http://singelsajten.se:8000/api/moderator/customers/',
  uploadProfilePhotoEndpoint: 'http://singelsajten.se:8000/api/moderator/model-photo/',
  photoDetailEndpoint: 'http://singelsajten.se:8000/api/moderator/model-photo/',
  getLobbiesEndpoint: 'http://singelsajten.se:8000/api/chat/',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  createChatEndpoint: 'http://singelsajten.se:8000/api/chat/',
  chatDetailEndpoint: 'http://singelsajten.se:8000/api/chat/detail/',
  LogsEndpoint: 'http://singelsajten.se:8000/api/chat/logs/',
  massTriggerEndpoint: '/admin/mass-trigger/',

  profileEndpoint: 'http://singelsajten.se:8000/auth/users/me/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
