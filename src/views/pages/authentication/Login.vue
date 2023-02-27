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
          <b-card-title
            class="mb-1 font-weight-bold"
            title-tag="h2"
          >
            Välkommen till SingelSajten! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Logga in på ditt konto och påbörja äventyret redan idag!
          </b-card-text>

          <b-alert
            v-if="error_show"
            variant="primary"
            show
          >
            <div class="alert-body font-small-2">
              <p>
                <small class="mr-50">Användarnamn/Lösenordet är inte korrekt.</small>
              </p>
            </div>

          </b-alert>

          <!-- form -->
          <validation-observer
            ref="loginForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent="login"
            >
              <!-- email -->
              <b-form-group
                    label="Användarnamn"
                    label-for="login-username"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Username"
                      vid="username"
                      rules="required"
                    >
                      <b-form-input
                        id="login-username"
                        v-model="username"
                        name="login-username"
                        :state="errors.length > 0 ? false:null"
                        placeholder="johndoe"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Lösenord</label>
                  <b-link :to="{name:'auth-forgot-password'}">
                    <small>Glömt Lösenord?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Kom ihåg mig
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid"
              >
                Logga in
                <b-spinner
                  v-if="loading"
                  small
                />
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>Ny på våran plattform? </span>
            <b-link :to="{name:'auth-register'}">
              <span>&nbsp;Skapa ett konto här!</span>
            </b-link>
          </b-card-text>

        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, VBTooltip,
  BAlert, BSpinner,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
import store from '@/store/index'
// import { getHomeRouteForLoggedInUser } from '@/auth/utils'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    BSpinner,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      username: '',
      sideImg: require('@/assets/images/pages/12.jpg'),

      // validation rules
      required,
      email,
      error_show: false,
      loading: false,
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
    console.log('adfa')
  },
  methods: {
    login() {
      // console.log('adfa', this.username)
      this.loading = false
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          useJwt.login({
            username: this.username,
            password: this.password,
          })
            .then(response => {
              this.loading = false
              useJwt.setToken(response.data.auth_token)
              console.log(response.data.auth_token)
              useJwt.profile()
                .then(response1 => {
                  const userData = response1.data
                  userData.ability = [
                    {
                      action: 'manage',
                      subject: 'all',
                    },
                  ]
                  this.$store.commit('appConfig/UPDATE_USERDATA', userData)
                  localStorage.setItem('userData', JSON.stringify(userData))
                  this.$ability.update(userData.ability)
                  if (userData.role === 'user') {
                    this.$router.push({ name: 'members' })
                    this.$store.commit('appConfig/UPDATE_LAYOUT_TYPE', 'horizontal')
                    console.log(this)
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
                this.loading = false
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
