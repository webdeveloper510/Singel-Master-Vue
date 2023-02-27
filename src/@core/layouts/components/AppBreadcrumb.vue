<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header"
  >
    <!-- Content Left -->
    <b-col
      class="content-header-left mb-2"
      cols="12"
      md="12"
    >
      <b-row class="breadcrumbs-top">
        <b-col
          lg="2"
          md="4"
        >
          <div class="d-flex justify-content-start">
            <v-select
              v-model="start_age"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="ageList"
              input-id="address-type"
              :clearable="false"
              class="half-width"
            />

            <b-form-group
              label="~"
              label-for="nested-street"
              label-cols-sm="3"
              label-align-sm="right"
              class="mx-1"
            />
            <v-select
              v-model="end_age"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="ageList"
              input-id="address-type"
              :clearable="false"
              class="half-width"
            />
          </div>
        </b-col>
        <b-col cols="3">
          <b-form-group
            label="Län"
            label-for="county"
            label-cols-sm="3"
            label-align-sm="right"
            class="mb-0"
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
        <b-col cols="3">
          <b-form-group
            label="city"
            label-for="city"
            label-cols-sm="3"
            label-align-sm="right"
            class="mb-0"
          >
            <v-select
              v-model="city"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="cityList[county]"
              input-id="type"
              :clearable="false"
            />
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group
            label="Användarnamn"
            label-for="username"
            label-cols-sm="4"
            label-align-sm="right"
            class="mb-0"
          >
            <b-form-input
              id="username"
              v-model="username"
              placeholder="username"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="1"
          class="text-center"
        >
          <b-button
            variant="primary"
            @click="search"
          >
            Search
          </b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BButton, BFormGroup, BFormInput,
  // BForm, BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

export default {
  directives: {
    Ripple,
  },
  components: {
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    // BForm,
    // BInputGroup,
    vSelect,
  },
  setup() {
    // eslint-disable-next-line camelcase
    const start_age = 18
    // eslint-disable-next-line camelcase
    function range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
    const ageList = range(18, 99)
    // eslint-disable-next-line camelcase
    const end_age = 99
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

    const username = ''

    const city = 'Karlskrona'
    return {
      start_age,
      end_age,
      ageList,
      countyList,
      county,
      cityList,
      city,
      username,
    }
  },
  methods: {
    search() {
      console.log('search')
      console.log(this.county)
    },
  },

}
</script>
