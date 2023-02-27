<template>
  <div>
    <b-tabs pills>
      <b-tab active>
        <template #title>
          <feather-icon
            icon="EyeIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Besökare</span>
        </template>

        <h3 class="text-primary">
          Besökare
        </h3>
        <b-row class="match-height">
      <b-col
        v-for="(item, idx) in randomGirls"
        :key="idx"
        md="6"
        lg="4"
        xl="3"
      >
        <b-card
          :img-src="item.avatar"
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
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="gradient-primary"
            size="sm"
            class="mt-1"
            :to="{name:'moderator-model-edit', params: {model_id: item.id}}"
          >
            <feather-icon
              size="16"
              :icon="'EditIcon'"
            />
            Edit
          </b-button>

        </b-card>
      </b-col>
    </b-row>
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon
            icon="LinkIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Matchningar</span>
        </template>
        <h3 class="text-primary">
          Matchningar
        </h3>
      </b-tab>
      <b-tab>
        <template
          #title
        >
          <feather-icon
            icon="ThumbsUpIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Likes</span>
        </template>
        <girl-list
          :girls="likedGirls"
          @dataUpdate="getLikedGirls"
        />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import {
  BTab, BTabs, BRow, BCard, BCardText, BButton, BCol, BCardTitle, BLink,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useJwt from '@/auth/jwt/useJwt'
import GirlList from '@/views/Customer/Flirtar/GirlList.vue'

// eslint-disable-next-line import/extensions

export default {
  components: {
    BCard,
    BTab,
    BTabs,
    BCardText,
    BButton,
    BRow,
    BCol,
    BLink,
    BCardTitle,
    GirlList,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      likedGirls: [],
      randomGirls: [],
    }
  },
  mounted() {
    this.getLikedGirls()
    this.getRandomGirl()
  },
  methods: {
    getLikedGirls() {
      useJwt.getLikedGirls()
        .then(response => {
          console.log('respose---vbcv>', response.data)
          this.likedGirls = response.data
        })
    },
    getRandomGirl() {
      console.log('here')
      useJwt.getRandomGirl()
        .then(response => {
          console.log('respose--->', response.data)
          this.randomGirls = response.data
          console.log(this.randomGirls)
        })
    },
  },
}
</script>

<style>

</style>
