<template>
  <div>

    <!-- Media -->
    <b-media
      v-if="userData"
      class="mb-2"
    >
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="avatar"
          :text="avatarText(userData.username)"
          :variant="`light-${resolveUserRoleVariant(userData.role)}`"
          size="150px"
          rounded
        />
      </template>
      <div class="d-flex align-items-center mx-2">
        <div>
          <h4 class="my-2">
            {{ userData.username }}
          </h4>
          <div class="d-flex flex-wrap">
            <b-button
              class="mr-1"
              variant="primary"
              @click="$refs.refInputEl.click()"
            >
              <input
                ref="refInputEl"
                type="file"
                class="d-none"
                @input="inputImageRenderer"
              >
              <span class="d-none d-sm-inline">Uppdatera</span>
              <feather-icon
                icon="EditIcon"
                class="d-inline d-sm-none"
              />
            </b-button>
            <b-button
              class="mr-1"
              variant="primary"
              @click="openPopup">Change Password</b-button>
              <div class="modal-content">
                <div v-if="showPopup" id="assign-modal___BV_modal_body_" class="modal-body">
                  <header id="assign-modal___BV_modal_header_" class="modal-header"><h5 id="assign-modal___BV_modal_title_" class="modal-title">Change Password</h5><button type="button" aria-label="Close" class="close">×</button></header>
                  <div class="modal-body">
                    <div role="group" class="form-group" id="__BVID__360"><label for="affiliate" class="d-block" >Old Password</label>
                    <input type="password" v-model="oldPassword" class="form-control"></div>
                    <div role="group" class="form-group" id="__BVID__360"><label for="affiliate" class="d-block" >New Password</label>
                    <input type="password" v-model="newPassword"  class="form-control"></div>
                    <button @click="changePassword(userData.id)" variant="success"  class="btn btn-primary">Submit</button>
                  </div>
                </div>
              </div>
            <b-button
              class="d-none"
              variant="outline-secondary"
            >
              <span class="d-none d-sm-inline">Radera</span>
              <feather-icon
                icon="TrashIcon"
                class="d-inline d-sm-none"
              />
            </b-button>
          </div>
        </div>
      </div>
    </b-media>

    <validation-observer ref="createModelForm">
      <!-- User Info: Input Fields -->
      <b-form v-if="userData">
        <b-row>
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
                v-model="userData.first_name"
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
                v-model="userData.last_name"
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
                <dropdown-datepicker
                  v-model="userData.birthday"
                  class="form-control"
                  :config="{ dateFormat: 'Y-m-d'}"
                  placeholder="YYYY-MM-DD"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="E-post"
              label-for="Email"
              label-class="mb-1"
            >
              <b-form-input
                id="email"
                v-model="userData.email"
                value="email"
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
              label="Lösenord"
              label-for="Password"
              label-class="mb-1"
            >
              <b-form-input
                id="seeking"
                v-model="userData.password"
                value="password"
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
                v-model="userData.status"
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
                  v-model="userData.city"
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
                v-model="userData.hair_color"
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
                v-model="userData.eye_color"
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
                v-model="userData.smoking_habit"
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
                v-model="userData.drinking_habit"
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
                v-model="userData.sexual_position"
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
                v-model="userData.ethnicity"
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
                v-model="userData.children"
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
                v-model="userData.body_type"
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
                v-model="userData.height"
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
                v-model="userData.about_me"
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
        Your profile is updated successfully.
      </b-card-text>
    </b-modal>

  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm, BFormTextarea, BCardText,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
// import flatPickr from 'vue-flatpickr-component'
import useUsersList from './useUsersList'
import useJwt from '@/auth/jwt/useJwt'
import { required } from '@validations'
import DropdownDatepicker from 'vue-dropdown-datepicker'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    DropdownDatepicker,
    BFormTextarea,
    BCardText,
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      required,
      userData: null,
      county: {
        label: '',
        value: '',
      },
      showPopup: false,
      oldPassword: '',
      newPassword: '',
      toast: null,
    }
  },
  setup() {
    const { resolveUserRoleVariant } = useUsersList()

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

    const avatar = ref('')

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      avatar.value = base64
      const formData = new FormData()
      const { id, username } = JSON.parse(localStorage.getItem('userData'))
      formData.append('avatar', refInputEl.value.files[0])
      formData.append('id', id)
      formData.append('username', username)
      console.log(refInputEl.value.files[0])

      useJwt.updateCustomerAvatar(id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        console.log(response)
      })
    })

    return {
      resolveUserRoleVariant,
      avatarText,
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
      cityList,
      avatar,
      inputImageRenderer,
    }
  },

  mounted() {
    const { id } = JSON.parse(localStorage.getItem('userData'))
    useJwt.getCustomerDetail(id)
      .then(response => {
        this.userData = response.data
        this.county.label = this.userData.county
        this.avatar = this.userData.avatar
      })
  },
  created() {
    this.toast = useToast()
  },
  methods: {
    submit() {
      this.$refs.createModelForm.validate().then(success => {
        if (success) {
          this.userData.county = this.county.label
          useJwt.updateCustomerDetail(this.userData.id, this.userData)
            .then(response => {
              this.$refs['my-modal'].show()
              console.log(response)
            })
            .catch(error => {
              this.$refs.createModelForm.setErrors(error.response.data)
            })
        }
      })
    },
    changePassword() {
      this.showPopup = false
      const formData = new FormData()
      formData.append('old_password', this.oldPassword)
      formData.append('new_password', this.newPassword)
      formData.append('token', localStorage.getItem('accessToken'))

      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer YOUR_AUTHORIZATION_KEY', // Replace YOUR_AUTHORIZATION_KEY with your actual authorization key
      }

      useJwt.UpdatePassword(formData, { headers })
        .then(response => {
          alert(response)
          this.toast.success('Password changed successfully')
        })
        .catch(error => {
          alert(error)
          this.toast.error('Old password Not matched.')
        })
        .finally(() => {
          this.oldPassword = ''
          this.newPassword = ''
        })
    },

    openPopup() {
      this.showPopup = true
    },
  },
}

</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.modal-body{
  background-color: #283046;
}
</style>
