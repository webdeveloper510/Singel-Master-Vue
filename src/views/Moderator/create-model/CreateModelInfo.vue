<template>
  <div>
    <validation-observer ref="createModelForm">
      <b-form>
        <h2 class="mb-2">
          Model Information
        </h2>
        <b-row>
          <!-- Field: First Name -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Användarnamn"
              label-for="username"
            >
              <validation-provider
                #default="{ errors }"
                name="username"
                vid="username"
                rules="required"
              >
                <b-form-input
                  id="username"
                  v-model="userDataInfo.username"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Förnamn"
              label-for="firstname"
            >
              <b-form-input
                id="firstname"
                v-model="userDataInfo.first_name"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Second Name -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Efternamn"
              label-for="last-name"
            >
              <b-form-input
                id="last-name"
                v-model="userDataInfo.last_name"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Birth date Name -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >

            <b-form-group
              label="Födelsedatum"
              label-for="birth-date"
            >
              <validation-provider
                #default="{ errors }"
                name="First Name"
                rules="required"
              >
                <flat-pickr
                  v-model="userDataInfo.birthday"
                  class="form-control"
                  :config="{ dateFormat: 'Y-m-d'}"
                  placeholder="YYYY-MM-DD"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: Gender -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Kön"
              label-for="gender"
              label-class="mb-1"
            >
              <b-form-radio-group
                id="gender"
                v-model="userDataInfo.gender"
                :options="genderOptions"
                value="male"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Seeking -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Jag söker efter en"
              label-for="seeking"
              label-class="mb-1"
            >
              <b-form-radio-group
                id="seeking"
                v-model="userDataInfo.seeking"
                :options="genderOptions"
                value="male"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Status -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Status"
              label-for="user-status"
            >
              <v-select
                v-model="userDataInfo.status"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="statusOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="user-status"
              />
            </b-form-group>
          </b-col>

          <!-- Field: county -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Län"
              label-for="county"
              class="mb-1"
            >
              <validation-provider
                #default="{ errors }"
                name="county"
                rules="required"
              >
                <v-select
                  v-model="county"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="countyList1"
                  input-id="county"
                  :clearable="false"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Field: city -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Stad"
              label-for="city"
              class="mb-1"
            >
              <validation-provider
                #default="{ errors }"
                name="city"
                rules="required"
              >
                <v-select
                  v-model="userDataInfo.city"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="cityList[county.value]"
                  input-id="city"
                  :clearable="false"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Hårfärg"
              label-for="user-hair-color"
            >
              <v-select
                v-model="userDataInfo.hair_color"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="hairColorOption"
                :clearable="false"
                input-id="user-hair-color"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Ögonfärg"
              label-for="user-eye-color"
            >
              <v-select
                v-model="userDataInfo.eye_color"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="eyeColorOption"
                :clearable="false"
                input-id="user-hair-color"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Rökvanor"
              label-for="smoking-habit"
            >
              <v-select
                v-model="userDataInfo.smoking_habit"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="smokingHabitsOption"
                :clearable="false"
                input-id="smoking-habit"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Dryckesvanor"
              label-for="smoking-habit"
            >
              <v-select
                v-model="userDataInfo.drinking_habit"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="drinkingHabitOption"
                :clearable="false"
                input-id="drinking-habit"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Sexuell läggning"
              label-for="sexual-position"
            >
              <v-select
                v-model="userDataInfo.sexual_position"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="sexualPositionOption"
                :clearable="false"
                input-id="sexual-position"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Etnicitet"
              label-for="ethnicity"
            >
              <v-select
                v-model="userDataInfo.ethnicity"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="ethnicityOption"
                :clearable="false"
                input-id="ethnicity"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Barn"
              label-for="children"
            >
              <v-select
                v-model="userDataInfo.children"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="childrenOption"
                :clearable="false"
                input-id="children"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Kroppstyp"
              label-for="body-type"
            >
              <v-select
                v-model="userDataInfo.body_type"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="bodyTypeOption"
                :clearable="false"
                input-id="body-type"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Längd"
              label-for="height"
            >
              <b-form-input
                v-model="userDataInfo.height"
                input-id="height"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            class="mt-2"
          >
            <b-form-group
              label="Om mig"
              label-for="height"
            >
              <b-form-textarea
                id="about-me"
                v-model="userDataInfo.about_me"
                placeholder=""
                rows="3"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-button
          variant="primary"
          typeof="submit"
          class="my-1 mb-sm-0 mr-0 mr-sm-1"
          :block="$store.getters['app/currentBreakPoint'] === 'xs'"
          @click.prevent="submit"
        >
          Spara ändringar
        </b-button>
      </b-form>

      <!-- Action Buttons -->

    </validation-observer>
    <b-modal
      ref="my-modal"
      title="Success"
      ok-only
      ok-variant="success"
      ok-title="Ok"
      modal-class="modal-success"
      centered
    >
      <b-card-text>
        {{ message }}
      </b-card-text>
    </b-modal>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BRow, BCol, BFormGroup, BFormInput, BForm, BFormRadioGroup, BFormTextarea, BModal, BCardText,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import flatPickr from 'vue-flatpickr-component'
import { required } from '@validations'
import Ripple from 'vue-ripple-directive'
import useUsersList from './useUsersList'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormRadioGroup,
    flatPickr,
    BFormTextarea,
    vSelect,
    BModal,
    BCardText,
  },
  directives: {
    Ripple,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      required,
      message: '',
    }
  },
  setup() {
    const { resolveUserRoleVariant } = useUsersList()

    const { id } = JSON.parse(localStorage.getItem('userData'))

    const userDataInfo = ref({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      gender: 'Kvinna',
      seeking: 'Man',
      birthday: null,
      county: '',
      city: '',
      status: 'Föredrar att inte säga',
      ethnicity: 'Ej angivet',
      hair_color: 'Ej angivet',
      eye_color: 'Ej angivet',
      body_type: 'Ej angivet',
      smoking_habit: 'Ej angivet',
      drinking_habit: 'Ej angivet',
      sexual_position: 'Ej angivet',
      children: 'Ej angivet',
      height: 'Ej angivet',
      creator: id,
      about_me: 'jjj',

    })

    const countyList1 = [
      {
        label: 'Blekinges',
        value: 'Blekinges',
      },
      {
        label: 'Dalarnas',
        value: 'Dalarnas',
      },
      {
        label: 'Gotlands',
        value: 'Gotlands',
      },
      {
        label: 'Gävleborgs',
        value: 'Gävleborgs',
      },
      {
        label: 'Hallands',
        value: 'Hallands',
      },
      {
        label: 'Jämtlands',
        value: 'Jämtlands',
      },
      {
        label: 'Jönköpings',
        value: 'Jönköpings',
      },
      {
        label: 'Kalmar',
        value: 'Kalmar',
      },
      {
        label: 'Kronobergs',
        value: 'Kronobergs',
      },
      {
        label: 'Norrbottens',
        value: 'Norrbottens',
      },
      {
        label: 'Skåne',
        value: 'Skåne',
      },
      {
        label: 'Stockholms',
        value: 'Stockholms',
      },
      {
        label: 'Södermanlands',
        value: 'Södermanlands',
      },
      {
        label: 'Uppsala',
        value: 'Uppsala',
      },
      {
        label: 'Värmlands',
        value: 'Värmlands',
      },
      {
        label: 'Västerbottens',
        value: 'Västerbottens',
      },
      {
        label: 'Västernorrlands',
        value: 'Västernorrlands',
      },
      {
        label: 'Västmanlands',
        value: 'Västmanlands',
      },
      {
        label: 'Västra Götalands',
        value: 'Västra_Götalands',
      },
      {
        label: 'Örebro',
        value: 'Örebro',
      },
      {
        label: 'Östergötlands',
        value: 'Östergötlands',
      },
    ]

    const county = ''

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

    const statusOptions = [
      { label: 'Föredrar att inte säga', value: 'Föredrar att inte säga' },
      { label: 'Singel', value: 'Singel' },
      { label: 'Gift', value: 'Gift' },
      { label: 'Skild', value: 'Skild' },
      { label: 'Separerat', value: 'Separerat' },
      { label: 'Änka', value: 'Änka' },
      { label: 'Komplicerat', value: 'Komplicerat' },
      { label: 'Sambo', value: 'Sambo' },
      { label: 'Särbo', value: 'Särbo' },
    ]

    const hairColorOption = ['Ej angivet', 'Mörkbrun', 'Ljusbrun', 'Blond', 'Svart', 'Grå', 'Röd', 'Inte angivet']
    const eyeColorOption = ['Ej angivet', 'Brun', 'Svart', 'Blå', 'Grön', 'Grå', 'Annat']
    const smokingHabitsOption = ['Ej angivet', 'Jag röker mycket', 'Jag röker lite', 'Jag röker inte alls', 'Fråga mig']
    const drinkingHabitOption = ['Ej angivet', 'Jag dricker ofta', 'Jag dricker lite', 'Jag dricker inte alls', 'Fråga mig']
    const sexualPositionOption = ['Ej angivet', 'Heterosexuell', 'Bisexuell', 'Homosexuell', 'Fråga mig']
    const ethnicityOption = ['Ej angivet', 'Asiatisk', 'Afrikansk', 'Mellanöstern', 'Latin', 'Vit', 'Blandad', 'Fråga mig']
    const childrenOption = ['Ej angivet', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Fråga mig']
    const bodyTypeOption = ['Ej angivet', 'Smal', 'Genomsnitt', 'Atletisk', 'Lite extra kärlek', 'Stor och härlig', 'Fråga mig']

    const genderOptions = [
      { text: 'Man', value: 'Man' },
      { text: 'Kvinna', value: 'Kvinna' },
    ]

    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    return {
      resolveUserRoleVariant,
      avatarText,
      userDataInfo,
      statusOptions,
      genderOptions,
      hairColorOption,
      eyeColorOption,
      smokingHabitsOption,
      sexualPositionOption,
      drinkingHabitOption,
      ethnicityOption,
      childrenOption,
      bodyTypeOption,
      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      countyList1,
      county,
      cityList,
    }
  },
  methods: {
    submit() {
      this.$refs.createModelForm.validate().then(success => {
        if (success) {
          this.userDataInfo.county = this.county.label
          if (!this.value) {
            useJwt.createModel(this.userDataInfo)
              .then(response => {
                this.message = 'Your model is created successfully. Upload photo.'
                this.$refs['my-modal'].show()
                this.$emit('input', response.data.id)
              })
              .catch(error => {
                this.$refs.createModelForm.setErrors(error.response.data)
              })
          } else {
            useJwt.updateModel(this.value, this.userDataInfo)
              .then(response => {
                this.message = 'Your model is Updated successfully.'
                this.$refs['my-modal'].show()
                this.$emit('input', response.data.id)
              })
              .catch(error => {
                this.$refs.createModelForm.setErrors(error.response.data)
              })
          }
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
