import useJwt from '@core/auth/jwt/useJwt'
import axios from '@axios'

// const csrftoken = window.$cookies.get('csrftoken')
// axios.defaults.headers.common.HTTP_X_CSRFTOKEN = csrftoken
const { jwt } = useJwt(axios, {})
export default jwt
