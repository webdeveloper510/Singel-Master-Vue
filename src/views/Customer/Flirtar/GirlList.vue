<template>
  <div>
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
            v-if="item.liked"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            size="sm"
            class="mt-1 mr-1"
            @click="user_like(item.id, idx)"
          >
            <feather-icon
              size="16"
              :icon="'HeartIcon'"
            />
            Unlike
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
              size="16"
              :icon="'HeartIcon'"
            />
            &nbsp;&nbsp;Like
          </b-button>
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-success"
            class="mt-1"
            size="sm"
            @click="create_chat(item.id)"
          >
            <feather-icon
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
  BCard, BCardText, BButton, BRow, BCol, BCardTitle, BLink,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

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
  },
  directives: {
    Ripple,
  },
  props: {
    girls: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      userId: JSON.parse(localStorage.getItem('userData')).id,
    }
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
          this.$router.push({ name: 'customer-chat', params: { chatId: response.data.id } })
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
      useJwt.userLike({ girl })
        .then(response => {
          console.log(response)
          console.log(idx)
          this.$emit('dataUpdate')
        }).catch(error => {
          console.log(error)
        })
    },
  },

}
</script>
