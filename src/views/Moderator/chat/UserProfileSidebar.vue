<template>
  <div
    class="chat-profile-sidebar"
    :class="{'show': shallShowUserProfileSidebar}"
  >
    <!-- Header -->
    <header class="chat-profile-header">

      <div class="header-profile-sidebar">
        <div class="avatar box-shadow-1 avatar-xl avatar-border">
          <b-avatar
            size="70"
            :src="profileUserData.avatar"
          />
          <span
            class="avatar-status-xl"
            :class="`avatar-status-${profileUserData.status}`"
          />
        </div>
        <h4 class="chat-user-name">
          {{ profileUserData.username }} ( {{ profileUserData.age }} )
        </h4>
        <span class="user-post text-capitalize">{{ profileUserData.county }} , {{ profileUserData.city }} </span>
      </div>
    </header>

    <!-- User Details -->
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="profile-sidebar-area scroll-area"
    >
      <b-form-textarea
        v-model="girlLogData.about_me"
        class="about-user"
        rows="3"
        size="sm"
        placeholder="about me"
      />
      <b-form-textarea
        v-model="girlLogData.log"
        class="about-user mt-1"
        rows="5"
        size="sm"
        placeholder="logs"
      />
      <div class="mt-2" />
      <b-form-group
        v-for="field in logFields"
        :key="field.key"
        label-cols="4"
        :label="field.label"
        :label-for="'id-'+field.key"
        label-size="sm"
        class="mb-25"
      >
        <b-form-input
          :id="'id-'+field.key"
          v-model="girlLogData[field.key]"
          size="sm"
        />
      </b-form-group>
      <div class="mt-1 text-right">
        <b-button
          variant="primary"
          size="sm"
          @click="updateLog"
        >
          Save
        </b-button>
      </div>
      <div class="mt-2" />
      <b-form-group
        v-for="field in profileFields"
        :key="field.key"
        label-cols="4"
        :label="field.label"
        :label-for="'id-'+field.key"
        label-size="sm"
        class="mb-25"
      >
        <b-form-input
          :id="'id-'+field.key"
          v-model="userDataInfo[field.key]"
          size="sm"
          readonly
        />
      </b-form-group>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import {
  BAvatar, BButton, BFormTextarea, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { ref } from '@vue/composition-api'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BAvatar,
    BButton,
    BFormTextarea,
    BFormGroup,
    BFormInput,
    VuePerfectScrollbar,
  },
  props: {
    shallShowUserProfileSidebar: {
      type: Boolean,
      required: true,
    },
    profileUserData: {
      type: Object,
      required: true,
    },
    logData: {
      type: Object,
      default: null,
    },
    chatId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      logFields: [
        { label: 'Name', key: 'name' },
        { label: 'Family', key: 'family' },
        { label: 'Work', key: 'work' },
        { label: 'Cars', key: 'cars' },
        { label: 'Civil Status', key: 'civil_status' },
        { label: 'Foods Drinks', key: 'foods_drinks' },
        { label: 'Hobbies', key: 'hobbies' },
        { label: 'Living Condition', key: 'living_condition' },
        { label: 'Personalities', key: 'personalities' },
        { label: 'Pets', key: 'pets' },
        { label: 'Sexual Interests', key: 'sexual_interests' },
      ],
      profileFields: [
        { label: 'Status', key: 'status' },
        { label: 'Ethnicity', key: 'ethnicity' },
        { label: 'Hair Color', key: 'hair_color' },
        { label: 'Eye Color', key: 'eye_color' },
        { label: 'Body Type', key: 'body_type' },
        { label: 'Smoking Habit', key: 'smoking_habit' },
        { label: 'Drinking Habit', key: 'drinking_habit' },
        { label: 'Sexual Position', key: 'sexual_position' },
        { label: 'Children', key: 'children' },
        { label: 'Height', key: 'height' },
      ],

    }
  },
  setup(props) {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }
    const girlLogData = ref({})
    const girlLogId = ref(0)
    if (props.logData) {
      girlLogData.value = props.logData
      girlLogId.value = props.logData.id
    } else {
      girlLogData.value = {
        about_me: '',
        cars: '',
        civil_status: '',
        family: '',
        foods_drinks: '',
        hobbies: '',
        living_condition: '',
        log: '',
        name: '',
        personalities: '',
        pets: '',
        sexual_interests: '',
        user_type: 'model',
        work: '',
      }
    }
    const userDataInfo = ref({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      gender: 'Kvinna',
      seeking: 'Man',
      birthday: null,
      county: '',
      city: '',
      status: 'Föredrar att inte säga',
      ethnicity: 'Ej angivet',
      hair_color: 'Ej angivet',
      eye_color: 'Ej angivet',
      body_type: 'Ej angivet',
      smoking_habit: 'Ej angivet',
      drinking_habit: 'Ej angivet',
      sexual_position: 'Ej angivet',
      children: 'Ej angivet',
      height: 'Ej angivet',
      about_me: 'jjj',

    })

    const userStatusOptions = [
      { text: 'Active', value: 'online', radioVariant: 'success' },
      { text: 'Do Not Disturb', value: 'busy', radioVariant: 'danger' },
      { text: 'Away', value: 'away', radioVariant: 'warning' },
      { text: 'Offline', value: 'offline', radioVariant: 'secondary' },
    ]

    return {
      perfectScrollbarSettings,
      userStatusOptions,
      userDataInfo,
      girlLogData,
      girlLogId,
    }
  },
  methods: {
    updateLog() {
      if (this.girlLogId) {
        useJwt.updateLog(this.girlLogId, this.girlLogData)
          .then(response => {
            console.log(response)
          })
      } else {
        const data = {
          chatId: this.$props.chatId,
          logData: this.girlLogData,
        }
        useJwt.createLog(data)
          .then(response => {
            console.log(response)
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#user-status-options ::v-deep {
  .custom-radio {
    margin-bottom: 1rem;
  }
}
</style>
