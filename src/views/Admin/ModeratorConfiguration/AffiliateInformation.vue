<template>
      <b-card
        v-if="data"
        class="card-congratulation-medal"
      >
      
        <h4>Information</h4>
        <h5 class="mt-1">
          Username: @{{ data.username }}
        </h5>
    
        <b-media
          class="mt-3"
          no-body
        >
          <b-media-aside
            class="mr-2"
          >
            <b-avatar
              size="48"
              :variant="'light-info'"
            >
              <feather-icon
                size="24"
                :icon="'PercentIcon'"
              />
            </b-avatar>
          </b-media-aside>
          <b-media-body class="my-auto">
            <h4 class="font-weight-bolder mb-0">
              {{ data[0].affiliate }}%
            </h4>
            <b-card-text class="font-small-3 mb-0">
              Affiliate Configuration
            </b-card-text>
          </b-media-body>
        </b-media>
    
      </b-card>
    </template>
    
    <script>
    import {
      BCard, BCardText, BMedia, BMediaAside, BAvatar, BMediaBody,
    } from 'bootstrap-vue'
    import Ripple from 'vue-ripple-directive'
    import { kFormatter } from '@core/utils/filter'
    
    export default {
      components: {
        BCard,
        BCardText,
        BMedia,
        BMediaAside,
        BAvatar,
        BMediaBody,
      },
      directives: {
        Ripple,
      },
      props: {
        data: {
          type: Array,
          default: () => [],
        },
      },
      methods: {
        kFormatter,
      },
      setup() {
        const userData = JSON.parse(localStorage.getItem('userData'))
        return {
          userData,
        }
      },
    }
    </script>
    