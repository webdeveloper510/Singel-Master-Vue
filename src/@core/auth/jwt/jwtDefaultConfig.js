export default {
  // Endpoints
  socketHost: 'singelsajten.se',
  loginEndpoint: 'http://singelsajten.se:8000/auth/token/login/',
  registerEndpoint: 'http://singelsajten.se:8000/auth/users/',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',
  getCustomerEndpoint: 'http://singelsajten.se:8000/api/moderator/customers/',
  profileEndpoint: 'http://singelsajten.se:8000/auth/users/me/',
  createModelEndpoint: 'http://singelsajten.se:8000/api/moderator/model/',
  getLikedGirlsEndpoint: 'http://singelsajten.se:8000/api/moderator/liked-girls/',
  userLikeEndpoint: 'http://singelsajten.se:8000/api/moderator/user-like/',
  randomGirlEndpoint: 'http://singelsajten.se:8000/api/moderator/random-girl/',
  createChatEndpoint: 'http://singelsajten.se:8000/api/chat/',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Token',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
