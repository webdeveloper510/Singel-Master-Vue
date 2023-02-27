export default {
  // Endpoints
  socketHost: 'singelsajten.se',
  loginEndpoint: 'http://singelsajten.se:8000/auth/token/login/',
  registerEndpoint: 'http://singelsajten.se:8000/auth/users/',
  createModelEndpoint: '/api/moderator/model/',
  createModeratorEndpoint: '/api/admin/moderator/',
  getCustomerEndpoint: '/api/moderator/customers/',
  uploadProfilePhotoEndpoint: '/api/moderator/model-photo/',
  photoDetailEndpoint: '/api/moderator/model-photo/',
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
