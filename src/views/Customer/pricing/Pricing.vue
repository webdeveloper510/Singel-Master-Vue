<template>
  <section
    v-if="Object.keys(pricing).length"
    id="pricing-plan"
  >
    <!-- title text and switch button -->
    <div class="text-center">
      <h1 class="mt-5">
        Här kan du köpa dina mynt
      </h1>
      <p class="mb-2 pb-75">
        Vid köp av ett större paket får du fler mynt för ett billigare pris, kom igång att börja chatta redan idag!
      </p>
    </div>
    <!--/ title text and switch button -->

    <!-- pricing plan cards -->
    <b-row class="pricing-card">
      <b-col
        offset-sm-2
        sm="10"
        md="12"
        offset-lg="2"
        lg="11"
        class="mx-auto mt-5"
      >
        <b-row>
          <b-col
            v-for="item in pricing.data"
            :key="item.coin"
            md="2"
          >
            <b-card
              align="center"
            >
              <b-img
                src="@/assets/images/illustration/coins2.svg"
                class="mb-2 mt-5 half-width"
                alt="basic svg img"
              />
              <div class="annual-plan">
                <div class="plan-price mt-2">
                  <span class="font-weight-bolder text-primary font-large-1">{{ item.coin }}</span><br><br>
                  <span class="font-medium-3">Mynt</span>
                </div>
                <div class="plan-price mt-4">
                  <span class="font-weight-bolder text-primary font-large-1">€{{ item.price }}</span><br><br>
                </div>
              </div>
              <b-button
                v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                block
                class="mt-2"
                variant="outline-success"
                @click="buy(item)"
              >
                Buy
              </b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!--/ pricing plan cards -->
    <!-- pricing faq -->
    <div class="pricing-faq mt-5 py-5 px-md-5">
      <h2 class="text-center">
        Säkert - Tryggt - Smidigt - Diskret
      </h2>
      <p class="text-center mt-2">
        Alla betalningar är helt säkrade med https-format och PCI-godkända väletablerade betalningsleverantörer. Inköp av mynt kan göras med VISA, Mastercard och eventuellt olika lokala betalningsmetoder som ständigt läggs till för att underlätta våra kunder. För att skicka ett meddelande kostar det 10 mynt. När du köper mynt kan du använda dessa på alla funktioner och privilegier vi erbjuder på webbplatsen. Alla ytterligare externa tjänster som inte ingår i webbplatsens normala funktioner som erbjuds av oss eller andra samarbetspartners tillhandahålls mot extra kostnader om medlemmen vill använda någon av dessa tjänster. Varje extern tjänst har sina egna villkor och vi rekommenderar att du kontrollerar dessa noggrant innan du går in i dem. Så välkommen att prova vår fantastiska sida och börja chatta, flörta och dejta redan idag. Vänligen läs allt i mer information på vår sida om villkor.
      </p>
    </div>
    <!--/ pricing faq -->
  </section>
</template>

<script>
import {
  BRow, BCol, BCard, BImg, BButton,
  // BCardText, BListGroup, BListGroupItem, BBadge,
} from 'bootstrap-vue'
// import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
// import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import Ripple from 'vue-ripple-directive'
import useJwt from '@/auth/jwt/useJwt'
import store from '@/store'
/* eslint-disable global-require */
export default {
  components: {
    // BFormCheckbox,
    BButton,
    // BCardText,
    // BListGroup,
    // BListGroupItem,
    BRow,
    BCol,
    BCard,
    // BBadge,
    BImg,
    // AppCollapseItem,
    // AppCollapse,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      status: 'monthly',
      monthlyPlanShow: true,
      pricing: {},
    }
  },
  created() {
    this.$http.get('/pricing/data').then(res => { this.pricing = res.data })
  },
  methods: {
    tooglePlan() {
      if (this.status === 'monthly') {
        this.monthlyPlanShow = true
      } else {
        this.monthlyPlanShow = false
      }
    },
    buy(item) {
      useJwt.createTransaction(item)
        .then(result => {
          this.$swal({
            title: 'You purchased Successfully!',
            text: 'We updated your coins, you get more coins!',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
          store.commit('appConfig/UPDATE_USERDATA', result.data)
          const userData = result.data
          userData.ability = [
            {
              action: 'manage',
              subject: 'all',
            },
          ]
          localStorage.setItem('userData', JSON.stringify(userData))
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-pricing.scss';
</style>
