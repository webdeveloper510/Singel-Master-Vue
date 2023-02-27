<template>
  <b-card>
    <!-- about -->
    <div class="row">
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Kön
        </h5>
        <b-card-text>
          {{ aboutData.gender }}
        </b-card-text>
      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Jag söker efter en
        </h5>
        <b-card-text>
          {{ aboutData.seeking }}
        </b-card-text>

      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Status
        </h5>
        <b-card-text>
          {{ aboutData.status }}
        </b-card-text>
      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          LÄN
        </h5>
        <b-card-text>
          {{ aboutData.county }}
        </b-card-text>
      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Stad
        </h5>
        <b-card-text>
          {{ aboutData.city }}
        </b-card-text>
      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Hårfärg
        </h5>
        <b-card-text>
          {{ aboutData.hair_color }}
        </b-card-text>
      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Ögonfärg
        </h5>
        <b-card-text>
          {{ aboutData.eye_color }}
        </b-card-text>
      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Rökvanor
        </h5>
        <b-card-text>
          {{ aboutData.smoking_habit }}
        </b-card-text>
      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Dryckesvanor
        </h5>
        <b-card-text>
          {{ aboutData.drinking_habit }}
        </b-card-text>
      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Sexuell läggning
        </h5>
        <b-card-text>
          {{ aboutData.sexual_position }}
        </b-card-text>
      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Etnicitet
        </h5>
        <b-card-text>
          {{ aboutData.ethnicity }}
        </b-card-text>
      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Barn
        </h5>
        <b-card-text>
          {{ aboutData.children }}
        </b-card-text>
      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Kroppstyp
        </h5>
        <b-card-text>
          {{ aboutData.body_type }}
        </b-card-text>
      </div>
      <div
        class="col-6 mt-2"
      >
        <h5 class="text-capitalize mb-75">
          Längd
        </h5>
        <b-card-text>
          {{ aboutData.height }}
        </b-card-text>
      </div>
    </div>
  </b-card>
</template>

<script>
import { BCard, BCardText } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
  },
  props: {
    aboutData: {
      type: Object,
      default: () => {},
    },
  },

}
</script>
