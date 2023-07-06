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
            v-if="likedGirls.includes(item.id)"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            size="sm"
            class="mt-1 mr-1"
            @click="user_like(item.id, idx)"
          >
            <feather-icon class="d-none" size="16" :icon="'HeartIcon'" />Unlike
          </b-button>
          <b-button
            v-else
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="gradient-primary"
            size="sm"
            class="mt-1 mr-1"
            @click="user_like(item.id, idx)"
          >
            <feather-icon class="d-none" size="16" :icon="'HeartIcon'" />Like
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
      girls: null,
      userId: JSON.parse(localStorage.getItem('userData')).id,
    }
  },
  mounted() {
    this.getLikedGirls()
    this.getRandomGirl()
  },
  methods: {
    getRandomGirl() {
      useJwt.getRandomGirl()
        .then(response => {
          this.randomGirls = response.data
        })
    },
    getLikedGirls() {
      useJwt.getLikedGirls()
        .then(response => {
          this.likedGirls = response.data
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
    user_like(girl, idx) {
      const isLiked = this.likedGirls.includes(girl)
      useJwt.userLike({ girl })
        .then(response => {
          if (isLiked) {
            // Remove the ID from the liked array
            this.likedGirls = this.likedGirls.filter(id => id !== girl)
          } else {
            // Add the ID to the liked array
            this.likedGirls.push(girl)
          }
          this.girls[idx].likedGirls = response.data.liked
          console.log(this.girls[idx].liked)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style>

</style>
