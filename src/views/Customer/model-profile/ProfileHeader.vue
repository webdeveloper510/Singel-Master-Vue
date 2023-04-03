<template>
  <b-card
    class="profile-header mb-2"
    :img-src="require('@/assets/images/banner/heart-bg.png')"
    img-top
    alt="cover photo"
    body-class="p-0"
  >
    <!-- profile picture -->
    <div class="position-relative">
      <div class="profile-img-container d-flex align-items-center">
        <div class="profile-img model-img">
          <b-img
            :src=headerData.photo
            rounded
            fluid
            alt="profile photo"
          />
        </div>
        <!-- profile title -->
        <div class="profile-title ml-3">
          <h2 class="text-white">
            {{ headerData.first_name }} {{ headerData.last_name }}
          </h2>
          <p class="text-white">
            {{ headerData.gender }}
          </p>
        </div>
        <!--/ profile title -->
      </div>
    </div>
    <!--/ profile picture -->

    <!-- profile navbar -->
    <div class="profile-header-nav">
      <b-navbar
        toggleable="md"
        type="light"
      >
        <!-- toggle button -->
        <b-navbar-toggle
          class="ml-auto"
          target="nav-text-collapse"
        >
          <feather-icon
            icon="AlignJustifyIcon"
            size="21"
          />
        </b-navbar-toggle>
        <!--/ toggle button -->

        <!-- collapse -->
        <b-collapse
          id="nav-text-collapse"
          is-nav
        >
          <b-tabs
            pills
            class="profile-tabs mt-1 mt-md-0"
            nav-class="mb-0"
          >
            <template #tabs-start>
              <b-button
                v-if="userData.role === 'user'"
                variant="primary"
                class="ml-0"
                @click="create_chat(headerData.id)"
              >
                <feather-icon
                  icon="EditIcon"
                  class="d-block d-md-none"
                />
                <span class="font-weight-bold d-none d-md-block">Chatt</span>
              </b-button>
              <b-button
                v-else
                variant="primary"
                class="ml-0"
                :to="{name:'moderator-members'}"
              >
                <feather-icon
                  icon="EditIcon"
                  class="d-block d-md-none"
                />
                <span class="font-weight-bold d-none d-md-block">Back</span>
              </b-button>
              <b-button
                v-if="userData.role === 'user'"
                variant="primary"
                class="ml-2"
                @click="user_like(headerData.id)"
              >
                <feather-icon
                  icon="EditIcon"
                  class="d-block d-md-none"
                />
                <span class="font-weight-bold d-none d-md-block">{{ likeButtonText }}</span>
              </b-button>
            </template>

          </b-tabs>

        </b-collapse>
        <!--/ collapse -->
      </b-navbar>
    </div>
    <!--/ profile navbar -->
  </b-card>
</template>

<script>
import {
  BCard, BImg, BNavbar, BNavbarToggle, BCollapse, BTabs, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BCard,
    BTabs,
    BButton,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BImg,
  },
  directives: {
    Ripple,
  },
  props: {
    headerData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      imagesrc: '@/assets/images/avatars/default_model.png',
    }
  },
  computed: {
    likeButtonText() {
      if (this.headerData.liked) {
        return 'Unlike'
      }
      return 'Like'
    },
  },
  methods: {
    create_chat(girlId) {
      useJwt.createChat({ girl: girlId, customer: this.userData.id })
        .then(response => {
          console.log(response.data)
          this.$router.push({ name: 'customer-chat-spec', params: { chatId: response.data.id } })
        }).catch(error => {
          console.log(error)
        })
    },
    user_like(girl) {
      useJwt.userLike({ girl })
        .then(response => {
          console.log(response.data)
          this.$emit('update-data', response.data.liked)
        }).catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
