export default {
  // Endpoints
  socketHost: '127.0.0.1',
  loginEndpoint: 'http://127.0.0.1:8000/auth/token/login/',
  registerEndpoint: 'http://127.0.0.1:8000/auth/users/',
  createModelEndpoint: 'http://127.0.0.1:8000/api/moderator/model/',
  createModeratorEndpoint: 'http://127.0.0.1:8000/api/admin/moderator/',
  getCustomerEndpoint: 'http://127.0.0.1:8000/api/moderator/customers/',
  uploadProfilePhotoEndpoint: 'http://127.0.0.1:8000/api/moderator/model-photo/',
  photoDetailEndpoint: 'http://127.0.0.1:8000/api/moderator/model-photo/',
  getLobbiesEndpoint: 'http://127.0.0.1:8000/api/chat/',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  createChatEndpoint: 'http://127.0.0.1:8000/api/chat/',
  chatDetailEndpoint: 'http://127.0.0.1:8000/api/chat/detail/',
  LogsEndpoint: 'http://127.0.0.1:8000/api/chat/logs/',
  massTriggerEndpoint: '/admin/mass-trigger/',

  profileEndpoint: 'http://127.0.0.1:8000/auth/users/me/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
