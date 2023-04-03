<template>
  <div>
    <b-row
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
            xl="2"
            lg="3"
            md="6"
          >
            <div class="d-flex justify-content-start">
              <v-select
                v-model="filter.start_age"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="ageList"
                input-id="address-type"
                :clearable="false"
                class="half-width"
                style="min-width:80px;"
              />

              <b-form-group
                label="Ålder"
                label-for="nested-street"
                label-cols-sm="3"
                label-align-sm="right"
                class="mx-1"
              />
              <v-select
                v-model="filter.end_age"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="ageList"
                input-id="address-type"
                :clearable="false"
                class="half-width"
                style="min-width: 80px;"
              />
            </div>
          </b-col>
          <b-col
            xl="3"
            lg="5"
            md="6"
          >
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
                :options="countyList1"
                input-id="county"
                :clearable="true"
                style="min-width: 200px;"
              />
            </b-form-group>
          </b-col>
          <b-col
            xl="3"
            lg="4"
            md="6"
          >
            <b-form-group
              label="Stad"
              label-for="city"
              label-cols-sm="3"
              label-align-sm="right"
              class="mb-0"
            >
              <v-select
                v-model="filter.city"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="getCities(county)"
                input-id="type"
                :clearable="true"
                style="min-width: 200px;"
              />
            </b-form-group>
          </b-col>
          <b-col
            xl="3"
            lg="4"
            md="6"
          >
            <b-form-group
              label="Användarnamn"
              label-for="username"
              label-cols-sm="5"
              label-align-sm="right"
              class="mb-0"
            >
              <b-form-input
                id="username"
                v-model="filter.search"
                placeholder="username"
              />
            </b-form-group>
          </b-col>
          <b-col
            xl="1"
            lg="2"
            md="12"
            class="text-center"
          >
            <b-button
              variant="primary"
              class="btn-search"
              @click="search"
            >
              Search
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col
        v-for="(item, idx) in girls"
        :key="idx"
        md="4"
        lg="3"
        xl="2"
        sm="6"
      >
        <b-card
          :img-src="item.photo"
          img-alt="Card image cap"
          img-top
          style="position: relative"
          class="model-card-image"
        >

          <div class="member-badge float-right" />
          <b-link
            :to="{name:'model-profile', params: { model_id: item.id }}"
          >
            <b-card-title style="text-decoration: underline;">
              {{ item.username }}, {{ item.age }}
            </b-card-title>
          </b-link>
          <b-card-text>
            {{ item.county }} {{ item.city }}
          </b-card-text>
          <b-button
            v-if="item.liked"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            size="sm"
            class="mt-1 mr-1"
            @click="user_like(item.id, idx)"
          >
            <feather-icon
              class="d-none"
              size="16"
              :icon="'HeartIcon'"
            />Unlike
          </b-button>
          <b-button
            v-else
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="gradient-primary"
            size="sm"
            class="mt-1 mr-1"
            @click="user_like(item.id, idx)"
          >
            <feather-icon
              class="d-none"
              size="16"
              :icon="'HeartIcon'"
            />Like
          </b-button>
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-success"
            class="mt-1"
            size="sm"
            @click="create_chat(item.id)"
          >
            <feather-icon
              class="d-none"
              size="16"
              :icon="'MessageSquareIcon'"
            />
            Chatt
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import {
  BCard, BCardText, BButton, BRow, BCol, BCardTitle, BLink, BFormGroup,
  BFormInput,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'

import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BCard,
    BCardText,
    BButton,
    BRow,
    BCol,
    BLink,
    BCardTitle,
    BFormGroup,
    BFormInput,
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      girls: null,
      userId: JSON.parse(localStorage.getItem('userData')).id,
    }
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

    const username = ''
    const city = 'Karlskrona'

    const filter = ref({
      start_age: '',
      end_age: '',
      county: '',
      city: '',
      search: '',
    })

    return {
      start_age,
      end_age,
      ageList,
      county,
      cityList,
      city,
      username,
      filter,
      countyList1,
    }
  },
  mounted() {
    const { query } = this.$route
    let queryString = ''
    if (query) {
      queryString = this.serialize(query)
    }

    useJwt.getModels(queryString)
      .then(response => {
        this.girls = response.data
        console.log('test', this.girls)
      }).catch(error => {
        console.log(error)
      })
  },
  methods: {
    serialize(obj) {
      const str = ['?']
      // eslint-disable-next-line no-restricted-syntax
      for (const p in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(p)) {
          str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
        }
      }
      return str.join('&')
    },
    search() {
      console.log(this.county)
      if (this.county) {
        this.filter.county = this.county.label
      } else {
        this.filter.county = ''
      }

      let queryString = ''
      const query = this.filter
      if (query) {
        queryString = this.serialize(query)
      }
      useJwt.getModels(queryString)
        .then(response => {
          this.girls = response.data
        }).catch(error => {
          console.log(error)
        })
    },
    create_chat(girlId) {
      useJwt.createChat({ girl: girlId, customer: this.userId })
        .then(response => {
          console.log(response.data)
          this.$router.push({ name: 'customer-chat-spec', params: { chatId: response.data.id } })
        }).catch(error => {
          console.log(error)
        })
    },
    getCities(county) {
      if (county) {
        // eslint-disable-next-line no-unused-expressions
        return this.cityList[county.value]
      }
      return []
    },
    user_like(girl, idx) {
      console.log(girl)
      useJwt.userLike({ girl })
        .then(response => {
          this.girls[idx].liked = response.data.liked
          console.log(this.girls[idx].liked)
        }).catch(error => {
          console.log(error)
        })
    },
  },

}
</script>
