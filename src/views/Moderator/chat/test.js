export default {
  // Endpoints
  socketHost: '12.0.0.1:8080',
  loginEndpoint: 'http://localhost:8000/auth/token/login/',
  registerEndpoint: 'http://localhost:8000/auth/users/',
  createModelEndpoint: '/api/moderator/model/',
  createModeratorEndpoint: '/api/admin/moderator/',
  getCustomerEndpoint: '/api/moderator/customers/',
  uploadProfilePhotoEndpoint: '/api/moderator/model-photo/',
  photoDetailEndpoint: '/api/moderator/model-photo/',
  getLobbiesEndpoint: 'http://localhost:8000/api/chat/',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  createChatEndpoint: 'http://localhost:8000/api/chat/',
  chatDetailEndpoint: 'http://localhost:8000/api/chat/detail/',
  LogsEndpoint: 'http://localhost:8000/api/chat/logs/',
  massTriggerEndpoint: '/admin/mass-trigger/',

  profileEndpoint: 'http://localhost:8000/auth/users/me/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
