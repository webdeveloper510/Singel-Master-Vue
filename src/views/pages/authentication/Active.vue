<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">
          SingelSajten</h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="6"
        class="d-none d-lg-flex align-items-center p-0 m-0"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center p-0 m-0 h-100">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login V2"
            class="object-cover h-100"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="6"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >

          <b-alert
            variant="primary"
            show
          >
            <div class="alert-body font-small-2">
              <p>
                <small class="mr-50">{{ message }}</small>
              </p>
            </div>

          </b-alert>

          <b-card-text class="text-center mt-2">
            <b-button
              :to="{name:'auth-login'}"
              variant="primary"
            >
              <span>Logga in istället</span>
            </b-button>
          </b-card-text>

        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BImg, VBTooltip,
  BAlert, BButton,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
import store from '@/store/index'
import router from '@/router'
// import { getHomeRouteForLoggedInUser } from '@/auth/utils'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BImg,
    BAlert,
    VuexyLogo,
    BButton,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: 'bzVUKAYSbP4XzL@',
      username: 'aaa',
      sideImg: require('@/assets/images/pages/12.jpg'),

      // validation rules
      required,
      email,
      error_show: false,
      message: '',
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/12.jpg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  mounted() {
    const { uid } = router.currentRoute.params
    const { token } = router.currentRoute.params
    const payload = {
      uid,
      token,
    }
    useJwt.activate(payload)
      .then(response => {
        console.log(response)
        this.message = 'Your account is activated, Please login.'
      })
      .catch(error => {
        console.log(error)
        this.message = 'Your token is invalid.'
      })
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          useJwt.login({
            username: this.username,
            password: this.password,
          })
            .then(response => {
              useJwt.setToken(response.data.auth_token)
              useJwt.profile()
                .then(response1 => {
                  const userData = response1.data
                  userData.ability = [
                    {
                      action: 'manage',
                      subject: 'all',
                    },
                  ]
                  localStorage.setItem('userData', JSON.stringify(userData))
                  this.$ability.update(userData.ability)
                  if (userData.role === 'user') {
                    this.$router.push({ name: 'members' })
                    this.$store.commit('appConfig/UPDATE_LAYOUT_TYPE', 'horizontal')
                  } else {
                    this.$router.push({ name: 'moderator-lobby' })
                    this.$store.commit('appConfig/UPDATE_LAYOUT_TYPE', 'vertical')
                  }
                })

              // // ? This is just for demo purpose as well.
              // // ? Because we are showing eCommerce app's cart items count in navbar\
              // this.$store.commit('appConfig/UPDATE_LAYOUT_TYPE', 'horizontal')
              //
              // // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
              // this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
              //   .then(() => {
              //     this.$toast({
              //       component: ToastificationContent,
              //       position: 'top-right',
              //       props: {
              //         title: `Welcome ${userData.fullName || userData.username}`,
              //         icon: 'CoffeeIcon',
              //         variant: 'success',
              //         text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
              //       },
              //     })
              //   })
            })
            .catch(error => {
              if (error) {
                this.error_show = true
              }
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
