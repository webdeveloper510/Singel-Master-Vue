<template>
  <div>

    <create-model-info
      v-model="model_id"
      class="mt-2 pt-75"
    />

    <b-card
      class="mt-2"
      title="Photo for Profile"
    >
      <div class="d-flex">
        <div
          v-for="(item, idx) in photoes"
          :key="idx"
          class="mr-1 mb-1"
          style="position: relative"
        >
          <img
            :src="item.photo"
            style="height: 100px; width: auto;"
            alt=""
          >
          <feather-icon
            icon="XIcon"
            size="18"
            class="remove-icon"
            @click="removePhoto(item.id)"
          />
        </div>
      </div>

      <b-row>
        <b-col>
          <b-form-file
            v-model="file"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          />
        </b-col>
        <b-col>
          <b-button
            variant="primary"
            @click="uploadProfilePhoto(0)"
          >
            Upload
          </b-button>
        </b-col>
      </b-row>

    </b-card>
    <b-card
      class="mt-2"
      title="Photo for Chat"
    >
      <div class="d-flex">
        <div
          v-for="(item, idx) in private_photoes"
          :key="idx"
          class="mr-1 mb-1"
          style="position: relative"
        >
          <img
            :src="item.photo"
            style="height: 100px; width: auto;"
            alt=""
          >
          <feather-icon
            icon="XIcon"
            size="18"
            class="remove-icon"
            @click="removePhoto(item.id)"
          />
        </div>
      </div>
      <b-row>
        <b-col>
          <b-form-file
            v-model="private_file"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          />
        </b-col>
        <b-col>
          <b-button
            variant="primary"
            @click="uploadProfilePhoto(1)"
          >
            Upload
          </b-button>
        </b-col>
      </b-row>
    </b-card>

    <div class="pt-2" />
    <b-modal
      ref="validate-modal"
      title="Success"
      ok-only
      ok-variant="success"
      ok-title="Ok"
      modal-class="modal-success"
      centered
    >
      <b-card-text>
        First you upload information and select file.
      </b-card-text>
    </b-modal>
  </div>
</template>

<script>
import {
  BCard, BButton, BFormFile, BRow, BCol,
} from 'bootstrap-vue'
// eslint-disable-next-line no-unused-vars
import router from '@/router'
import CreateModelInfo from './CreateModelInfo.vue'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BCard,
    CreateModelInfo,
    BButton,
    BFormFile,
    BRow,
    BCol,
  },
  data() {
    return {
      file: null,
      photoes: [],
      model_id: null,
      private_file: null,
      private_photoes: [],
    }
  },
  methods: {
    // eslint-disable-next-line camelcase
    uploadProfilePhoto(privateValue) {
      const formData = new FormData()
      let check = false
      formData.append('girl', this.model_id)
      formData.append('private', privateValue)

      if (privateValue) {
        formData.append('photo', this.private_file)
        check = this.private_file && this.model_id
      } else {
        formData.append('photo', this.file)
        check = this.file && this.model_id
      }

      if (check) {
        useJwt.uploadProfilePhoto(
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
          .then(response => {
            console.log('response', response)
            if (response.data.private) {
              this.private_photoes.push(response.data)
              this.private_file = null
            } else {
              this.photoes.push(response.data)
              this.file = null
            }
          })
          .catch(error => {
            console.log('error', error)
          })
      } else {
        this.$refs['validate-modal'].show()
      }
    },
    removePhoto(photoId) {
      console.log('remove photo id:', photoId)
      useJwt.removeProfilePhoto(photoId)
        .then(() => {
          console.log('deleted')
          this.fetch()
        })
        .catch(error => {
          console.log(error)
        })
    },
  },

}
</script>
