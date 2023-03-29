export default {
  // Endpoints
  socketHost: '213.188.153.139',
  loginEndpoint: 'http://213.188.153.139:8000/auth/token/login/',
  registerEndpoint: 'http://213.188.153.139:8000/auth/users/',
  createModelEndpoint: 'http://213.188.153.139:8000/api/moderator/model/',
  createModeratorEndpoint: 'http://213.188.153.139:8000/api/admin/moderator/',
  getCustomerEndpoint: 'http://213.188.153.139:8000/api/moderator/customers/',
  uploadProfilePhotoEndpoint: 'http://213.188.153.139:8000/api/moderator/model-photo/',
  photoDetailEndpoint: 'http://213.188.153.139:8000/api/moderator/model-photo/',
  getLobbiesEndpoint: 'http://213.188.153.139:8000/api/chat/',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  createChatEndpoint: 'http://213.188.153.139:8000/api/chat/',
  chatDetailEndpoint: 'http://213.188.153.139:8000/api/chat/detail/',
  LogsEndpoint: 'http://213.188.153.139:8000/api/chat/logs/',
  massTriggerEndpoint: '/admin/mass-trigger/',

  profileEndpoint: 'http://213.188.153.139:8000/auth/users/me/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
