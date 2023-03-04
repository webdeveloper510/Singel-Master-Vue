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
  getLikedGirlsEndpoint: 'http://127.0.0.1:8000/api/moderator/liked-girls/',
  userLikeEndpoint: 'http://127.0.0.1:8000/api/moderator/user-like/',
  randomGirlEndpoint: 'http://127.0.0.1:8000/api/moderator/random-girl/',
  createChatEndpoint: 'http://127.0.0.1:8000/api/chat/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
