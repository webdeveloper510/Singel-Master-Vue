export default {
  // Endpoints
  loginEndpoint: 'http://213.188.153.139:8000/auth/token/login/',
  registerEndpoint: 'http://213.188.153.139:8000/auth/users/',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',
  getCustomerEndpoint: 'http://213.188.153.139:8000/api/moderator/customers/',
  profileEndpoint: 'http://213.188.153.139:8000/auth/users/me/',
  createModelEndpoint: 'http://213.188.153.139:8000/api/moderator/model/',
  getLikedGirlsEndpoint: 'http://213.188.153.139:8000/api/moderator/liked-girls/',
  userLikeEndpoint: 'http://213.188.153.139:8000/api/moderator/user-like/',
  randomGirlEndpoint: 'http://213.188.153.139:8000/api/moderator/random-girl/',
  createChatEndpoint: 'http://213.188.153.139:8000/api/chat/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
