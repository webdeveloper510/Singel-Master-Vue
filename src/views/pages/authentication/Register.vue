<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />

        <h2 class="brand-text text-primary ml-1 ">
          SingelSajten
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="6"
        class="d-none d-lg-flex align-items-center p-0 m-0"
      >
        <div class="w-100 h-100 d-lg-flex align-items-center justify-content-center p-0 m-0">
          <b-img
            fluid
            :src="imgUrl"
            alt="Register V2"
            class="object-cover h-100"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
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
            class="mb-1"
            title-tag="h2"
          >
            Registrering
          </b-card-title>
          <b-card-text class="mb-2">
            Registrera dig nu så du kan börja lära känna nya människor!
          </b-card-text>

          <!-- form -->
          <validation-observer
            ref="registerForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-register-form mt-2"
              @submit.prevent="register"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Användarnamn"
                    label-for="register-username"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Username"
                      vid="username"
                      rules="required"
                    >
                      <b-form-input
                        id="register-username"
                        v-model="username"
                        name="register-username"
                        :state="errors.length > 0 ? false:null"
                        placeholder="johndoe"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Email"
                    label-for="register-email"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Email"
                      vid="email"
                      rules="required|email"
                    >
                      <b-form-input
                        id="register-email"
                        v-model="userEmail"
                        name="register-email"
                        :state="errors.length > 0 ? false:null"
                        placeholder="john@example.com"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label-for="register-password"
                    label="Lösenord"
                  >
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
                          id="register-password"
                          v-model="password"
                          class="form-control-merge"
                          :type="passwordFieldType"
                          :state="errors.length > 0 ? false:null"
                          name="register-password"
                          placeholder="········"
                        />
                        <b-input-group-append is-text>
                          <feather-icon
                            :icon="passwordToggleIcon"
                            class="cursor-pointer"
                            @click="togglePasswordVisibility"
                          />
                        </b-input-group-append>
                      </b-input-group>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col cols="6" class="date-picker" >
                  <b-form-group
                    label="Födelsedatum"
                    label-for="birthday"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="birthday"
                      vid="birthday"
                      rules="required"
                    >
                    <dropdown-datepicker
                      ref="datepicker"
                      v-model="birthday"
                      name="birthday"
                      id="birthday"
                      v-bind:allow-past="true"
                      v-bind:allow-future="true"
                      v-bind:max-year="2023"
                      v-bind:value={id:day,id:month,id:year}
                      class="ff date-style"
                      month-format="short"
                      display-format="dmy"
                      year-label="yyyy"
                      month-label="mm"
                      day-label="dd"
                      @click.native="method"
                    />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Län"
                    label-for="county"
                    class="mb-1"
                  >
                    <v-select
                      v-model="county"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="countyList"
                      input-id="county"
                      :clearable="false"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Stad"
                    label-for="city"
                    class="mb-1"
                  >
                    <v-select
                      v-model="city"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="cityList[county]"
                      input-id="city"
                      :clearable="false"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Kön"
                    label-for="gender"
                    label-class="mb-1"
                  >
                    <b-form-radio-group
                      id="gender"
                      v-model="gender"
                      :options="genderOptions"
                      value="male"
                    />
                  </b-form-group>
                </b-col>

                <b-col cols="6">
                  <b-form-group
                    label="Söker"
                    label-for="seeking"
                    label-class="mb-1"
                  >
                    <b-form-radio-group
                      id="seeking"
                      v-model="seeking"
                      :options="genderOptions"
                      value="male"
                    />
                  </b-form-group>
                </b-col>
              </b-row>

              <b-form-group class="mt-2">
                <validation-provider
                  #default="{ errors }"
                  name="status"
                  vid="status"
                  rules="required"
                >
                  <b-form-checkbox
                    id="register-privacy-policy"
                    v-model="status"
                    name="checkbox-1"
                  >
                    Jag är över 18 år. Jag har läst och förstått och accepterat
                    <b-link :to="{name:'terms-conditions'}">
                      Allmänna Villkor
                    </b-link>
                    och
                    <b-link :to="{name:'policy-cookie'}">
                      Sekretess & Cookies
                    </b-link>
                    .
                    Jag godkänner också att få kontouppdateringar, nyhetsbrev och meddelanden från andra medlemmar,
                    skickade från Singelsajten.se.
                  </b-form-checkbox>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-button
                class="mt-2"
                variant="primary"
                block
                type="submit"
                :disabled="invalid"
              >
                <b-spinner
                  v-if="loading"
                  small
                />
                Skapa ditt konto
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>Har du redan ett konto?</span>
            <b-link :to="{name:'auth-login'}">
              <span>&nbsp;Logga in istället</span>
            </b-link>
          </p>

          <b-alert
            v-if="response_show"
            variant="success"
            show
          >
            <div class="alert-body font-small-2">
              <p>
                <small class="mr-50">Ditt konto har skapats framgångsrikt.</small>
              </p>
            </div>
          </b-alert>
        </b-col>
      </b-col>
      <!-- /Register-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
  BFormRadioGroup,
  BAlert,
  BSpinner,
  // BFormDatepicker,
} from 'bootstrap-vue'
// import flatPickr from 'vue-flatpickr-component'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import vSelect from 'vue-select'
import store from '@/store/index'
import useJwt from '@/auth/jwt/useJwt'
import DropdownDatepicker from 'vue-dropdown-datepicker'

export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BFormRadioGroup,
    // flatPickr,
    BAlert,
    BSpinner,
    // BFormDatepicker,
    DropdownDatepicker,
    // validations
    ValidationProvider,
    ValidationObserver,
    vSelect,
  },
  mixins: [togglePasswordVisibility],
  data() {
    const countyList = ['Blekinges', 'Dalarnas', 'Gotlands', 'Gävleborgs', 'Hallands', 'Jämtlands', 'Jönköpings',
      'Kalmar', 'Kronobergs', 'Norrbottens', 'Skåne', 'Stockholms', 'Södermanlands', 'Uppsala', 'Värmlands', 'Västerbottens',
      'Västernorrlands', 'Västmanlands', 'Västra_Götalands', 'Örebro', 'Östergötlands']
    const county = 'Blekinges'
    const cityList = {
      Blekinges: ['Karlshamn', 'Karlskrona', 'Olofström', 'Ronneby', 'Sölvesborg'],
      Dalarnas: ['Avesta', 'Borlänge', 'Falun', 'Gagnef', 'Hedemora', 'Leksand', 'Ludvika', 'Malung-Sälen', 'Mora',
        'Orsa', 'Rättvik', 'Smedjebacken', 'Säter', 'Vansbro', 'Älvdalen'],
      Gotlands: ['Gotland'],
      Gävleborgs: ['Bollnäs', 'Gävle', 'Hofors', 'Hudiksvall', 'Ljusdal', 'Nordanstig', 'Ockelbo', 'Ovanåker', 'Sandviken', 'Söderhamn'],
      Hallands: ['Falkenberg', 'Halmstad', 'Hylte', 'Kungsbacka', 'Laholm', 'Varberg'],
      Jämtlands: ['Berg', 'Bräcke', 'Härjedalen', 'Krokom', 'Ragunda', 'Strömsund', 'Åre', 'Östersund'],
      Jönköpings: ['Aneby', 'Eksjö', 'Gislaved', 'Gnosjö', 'Habo', 'Jönköping', 'Mullsjö', 'Nässjö', 'Sävsjö', 'Tranås', 'Vaggeryd', 'Vetlanda', 'Värnamo'],
      Kalmar: ['Borgholm', 'Emmaboda', 'Hultsfred', 'Högsby', 'Kalmar', 'Mönsterås', 'Mörbylånga', 'Nybro', 'Oskarshamn', 'Torsås', 'Vimmerby', 'Västervik'],
      Kronobergs: ['Alvesta', 'Lessebo', 'Ljungby', 'Markaryd', 'Tingsryd', 'Uppvidinge', 'Växjö', 'Älmhult'],
      Norrbottens: ['Arjeplog', 'Arvidsjaur', 'Boden', 'Gällivare', 'Haparanda', 'Jokkmokk', 'Kalix', 'Kiruna', 'Luleå', 'Pajala', 'Piteå', 'Älvsbyn', 'Överkalix', 'Övertorneå'],
      Skåne: ['Bjuv', 'Bromölla', 'Burlöv', 'Båstad', 'Eslöv', 'Helsingborg', 'Hässleholm', 'Höganäs', 'Hörby', 'Höör', 'Klippan', 'Kristianstad', 'Kävlinge', 'Landskrona', 'Lomma', 'Lund', 'Malmö', 'Osby', 'Perstorp', 'Simrishamn', 'Sjöbo', 'Skurup', 'Staffanstorp', 'Svalöv', 'Svedala', 'Tomelilla', 'Trelleborg', 'Vellinge', 'Ystad', 'Åstorp', 'Ängelholm', 'Örkelljunga', 'Östra Göinge'],
      Stockholms: ['Botkyrka', 'Danderyd', 'Ekerö', 'Haninge', 'Huddinge', 'Järfälla', 'Lidingö', 'Nacka', 'Norrtälje', 'Nykvarn', 'Nynäshamn', 'Salem', 'Sigtuna', 'Sollentuna', 'Solna', 'Stockholm', 'Sundbyberg', 'Södertälje', 'Tyresö', 'Täby', 'Upplands Väsby', 'Upplands-Bro', 'Vallentuna', 'Vaxholm', 'Värmdö', 'Österåker'],
      Södermanlands: ['Eskilstuna', 'Flen', 'Gnesta', 'Katrineholm', 'Nyköping', 'Oxelösund', 'Strängnäs', 'Trosa', 'Vingåker'],
      Uppsala: ['Enköping', 'Heby', 'Håbo', 'Knivsta', 'Tierp', 'Uppsala', 'Älvkarleby', 'Östhammar'],
      Värmlands: ['Arvika', 'Eda', 'Filipstad', 'Forshaga', 'Grums', 'Hagfors', 'Hammarö', 'Karlstad', 'Kil', 'Kristinehamn', 'Munkfors', 'Storfors', 'Sunne', 'Säffle', 'Torsby', 'Årjäng'],
      Västerbottens: ['Bjurholm', 'Dorotea', 'Lycksele', 'Malå', 'Nordmaling', 'Norsjö', 'Robertsfors', 'Skellefteå', 'Sorsele', 'Storuman', 'Umeå', 'Vilhelmina', 'Vindeln', 'Vännäs', 'Åsele'],
      Västernorrlands: ['Härnösand', 'Kramfors', 'Sollefteå', 'Sundsvall', 'Timrå', 'Ånge', 'Örnsköldsvik'],
      Västmanlands: ['Arboga', 'Fagersta', 'Hallstahammar', 'Kungsör', 'Köping', 'Norberg', 'Sala', 'Skinnskatteberg', 'Surahammar', 'Västerås'],
      Västra_Götalands: ['Ale', 'Alingsås', 'Bengtsfors', 'Bollebygd', 'Borås', 'Dals-Ed', 'Essunga', 'Falköping', 'Färgelanda',
        'Grästorp', 'Gullspång', 'Göteborg', 'Götene', 'Herrljunga', 'Hjo', 'Härryda', 'Karlsborg', 'Kungälv', 'Lerum',
        'Lidköping', 'Lilla Edet', 'Lysekil', 'Mariestad', 'Mark', 'Mellerud', 'Munkedal', 'Mölndal', 'Orust', 'Partille',
        'Skara', 'Skövde', 'Sotenäs', 'Stenungsund', 'Strömstad', 'Svenljunga', 'Tanum', 'Tibro', 'Tidaholm', 'Tjörn', 'Tranemo',
        'Trollhättan', 'Töreboda', 'Uddevalla', 'Ulricehamn', 'Vara', 'Vårgårda', 'Vänersborg', 'Åmål', 'Öckerö'],
      Örebro: ['Askersund', 'Degerfors', 'Hallsberg', 'Hällefors', 'Karlskoga', 'Kumla', 'Laxå', 'Lekeberg', 'Lindesberg', 'Ljusnarsberg', 'Nora', 'Örebro'],
      Östergötlands: ['Boxholm', 'Finspång', 'Kinda', 'Linköping', 'Mjölby', 'Motala', 'Norrköping', 'Söderköping', 'Vadstena', 'Valdemarsvik', 'Ydre', 'Åtvidaberg', 'Ödeshög'],
    }
    // const app = new Vue({
    //   el: '#app',
    //   data: {
    //     selected: '',
    //     products: [
    //       {id_day: 1},
    //       {id_month: 1},
    //       {id_year: 1}
    //       ]
    //     }
    //   })
    const city = 'Karlskrona'

    // eslint-disable-next-line no-unused-vars
    const genderOptions = ['Man', 'Kvinna']

    return {
      status: '',
      username: '',
      userEmail: '',
      password: '',
      birthday: '',
      gender: 'Man',
      seeking: 'Kvinna',
      sideImg: require('@/assets/images/pages/12.jpg'),
      // validation
      required,
      email,
      countyList,
      county,
      cityList,
      city,
      genderOptions,
      response_show: false,
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
  methods: {
    register() {
      console.log(this)
      this.loading = true
      this.$refs.registerForm.validate().then(success => {
        if (success) {
          useJwt.register({
            username: this.username,
            email: this.userEmail,
            password: this.password,
            birthday: this.birthday,
            county: this.county,
            city: this.city,
            role: 'user',
          })
            .then(response => {
              console.log(response)
              this.response_show = true
              this.loading = true
            })
            .catch(error => {
              console.log(error)
              this.$refs.registerForm.setErrors(error.response.data)
              this.loading = false
            })
        }
      })
    },
    method() {
      console.log(`Picked date ${this}`)
    },
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
