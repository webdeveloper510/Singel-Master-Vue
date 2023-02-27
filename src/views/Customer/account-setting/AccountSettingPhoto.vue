<template>
  <b-card>
    <h5 class="mb-2">
      Your Photos
    </h5>
    <b-row>
      <!-- latest photo loop -->
      <b-col
        v-for="data in latestImages"
        :key="data.img"
        md="3"
        cols="6"
        class="profile-latest-img p-2"
      >
        <b-link>
          <b-img
            fluid
            rounded
            :src="data.img"
            :alt="data.img.slice(5)"
          />
        </b-link>
      </b-col>

      <b-col
        md="3"
        cols="6"
        class="d-flex justify-content-center align-items-center"
      >
        <b-button variant="gradient-primary">
          Add Photo
        </b-button>
      </b-col>
      <!-- latest photo loop -->
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BRow, BCol, BLink, BImg, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BLink,
    BImg,
    BButton,
  },
  props: {
    latestImages: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
