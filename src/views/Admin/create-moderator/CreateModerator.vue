<template>
  <div>

    <div
      class="mt-2 pt-75"
    >
      <validation-observer
        ref="createUserForm"
        #default="{invalid}"
      >
        <b-form
          @submit.prevent="register"
        >
          <h2 class="mb-2">
            Create Moderator
          </h2>
          <b-row>
            <b-col cols="5">
              <b-form-group
                label="Username"
                label-for="username"
              >
                <validation-provider
                  #default="{ errors }"
                  name="username"
                  vid="username"
                  rules="required"
                >
                  <b-form-input
                    id="username"
                    v-model="username"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label-for="register-password"
                label="Password"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false:null"
                      name="register-password"
                      placeholder="········"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-button
                class="mt-2"
                variant="primary"
                block
                type="submit"
                :disabled="invalid"
              >
                Create
              </b-button>
            </b-col>
          </b-row>

        </b-form>
      </validation-observer>

    </div>

    <div class="pt-2" />
    <b-modal
      ref="validate-modal"
      v-model="modalShow"
      title="Success"
      ok-only
      ok-variant="success"
      ok-title="Ok"
      modal-class="modal-success"
      centered
    >
      <b-card-text>
        Moderator created successfully.
      </b-card-text>
    </b-modal>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  BForm, BFormGroup, BFormInput, BRow, BCol, BInputGroup, BInputGroupAppend, BButton, BModal, BCardText,
} from 'bootstrap-vue'

import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
// eslint-disable-next-line no-unused-vars
import router from '@/router'
import useJwt from '@/auth/jwt/useJwt'
// import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BForm,
    BFormInput,
    BFormGroup,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BButton,
    BModal,
    BCardText,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      username: null,
      password: null,
      password2: null,
      required,
      modalShow: false,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    register() {
      this.$refs.createUserForm.validate().then(success => {
        if (success) {
          useJwt.createModerator({
            username: this.username,
            email: `${this.username}@singelsajten.se`,
            password: this.password,
          })
            .then(response => {
              console.log(response)
              this.modalShow = true
              this.username = ''
              this.password = ''
            })
            .catch(error => {
              console.log(error.response.data)
              this.$refs.createUserForm.setErrors(error.response.data)
            })
        }
      })
    },
  },

}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
