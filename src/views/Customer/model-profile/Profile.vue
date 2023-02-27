<template>
  <div
    id="user-profile"
  >
    <profile-header
      :header-data="profileData"
      @update-data="updateData"
    />
    <!-- profile info  -->
    <section id="profile-info">
      <b-row>
        <!-- about suggested page and twitter feed -->
        <b-col
          order="2"
          order-lg="1"
          style="flex: 0 0 560px;"
        >
          <b-card>
            <b-card-title class="mb-2">
              Om mig
            </b-card-title>
            <b-card-text>
              {{ profileData.about_me }}
            </b-card-text>
          </b-card>
          <CoolLightBox
            :items="profilePhotos"
            :index="index"
            :effect="'fade'"
            @close="index = null"
          />
          <b-card>
            <b-card-title class="mb-0">
              Photos
            </b-card-title>
            <div style="width: 100%">
              <div
                class="images-wrapper d-block"
                style="width: 100%"
              >
                <div
                  v-for="(image, imageIndex) in profilePhotos"
                  :key="imageIndex"
                  class="image"
                  :style="{ backgroundImage: 'url(' + image + ')' }"
                  @click="index = imageIndex"
                />
              </div>
            </div>
          </b-card>
        </b-col>

        <b-col
          order="1"
          order-lg="2"
        >
          <profile-about :about-data="profileData" />
        </b-col>
        <!-- post -->
      </b-row>
    </section>
    <!--/ profile info  -->
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BCardText, BCardTitle,
} from 'bootstrap-vue'

import ProfileHeader from './ProfileHeader.vue'
import ProfileAbout from './ProfileAbout.vue'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import useJwt from '@/auth/jwt/useJwt'
import router from '@/router'

/* eslint-disable global-require */
export default {
  components: {
    BRow,
    BCol,
    ProfileHeader,
    ProfileAbout,
    BCard,
    BCardText,
    BCardTitle,
  },
  data() {
    return {
      profileData: {},
      items: [
        'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
        'https://i.wifegeek.com/200426/f9459c52.jpg',
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nature-quotes-1557340276.jpg?crop=0.666xw:1.00xh;0.168xw,0&resize=640:*',
        'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
        'https://i.wifegeek.com/200426/2d110780.jpg',
        'https://i.wifegeek.com/200426/663181fe.jpg',
      ],
      index: null,
      profilePhotos: [],
    }
  },
  created() {

  },
  mounted() {
    useJwt.getModelDetail(router.currentRoute.params.model_id)
      .then(response => {
        console.log('response', response.data)
        this.profileData = response.data
      }).catch(error => {
        console.log('error', error)
      })

    useJwt.getModelPublicPhotos(router.currentRoute.params.model_id)
      .then(response => {
        console.log('response', response.data)
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < response.data.length; i++) {
          this.profilePhotos.push(response.data[i].photo)
        }
        console.log(this.profilePhotos)
      }).catch(error => {
        console.log('error', error)
      })
  },
  methods: {
    updateData(liked) {
      this.profileData.liked = liked
    },
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-profile.scss';
</style>
