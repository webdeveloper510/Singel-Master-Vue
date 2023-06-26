<template>
  <div class="row pt-2">
    <div class="col-lg-4 col-md-12">
      <b-link :to="{name:'terms-conditions'}">
        <h5>Allmänna Villkor</h5>
      </b-link>
    </div>
    <div class="col-lg-4 col-md-12">
      <b-link :to="{name:'policy-cookie'}">
        <h5>Sekretess & Cookies</h5>
      </b-link>
    </div>
    <div class="col-lg-4 col-md-12 ">
      <h3>Kontakt information</h3>
      <p
        class="my-1"
        style="font-size:0.8rem;"
      >
        Kontaktuppgifter: <a
          href="mailto:support@singelsajten.se"
          style="color:white;"
        >support@singelsajten.se</a>
      </p>
      <p
        class="my-0 d-none"
        style="font-size:0.8rem;"
      >Address: <br>
        Valeri Group Ltd <br>
        Street name xxxxx xxxxx 10<br>
        4501-Sussex<br>
        London/Cardiff<br>
        Great Britain<br>
        Company ID: 135xxxxx</p>
    </div>
    <div class="col-12">
      <p
        class="clearfix mb-0"
        style="font-size: 0.8rem;"
      >
        <span class="float-md-left d-block d-md-inline-block mt-25">
          COPYRIGHT  © {{ new Date().getFullYear() }}
          <b-link
            class="ml-25"
            href="#"
            target="_blank"
          >singelsajten.se</b-link>
          <span class="d-none d-sm-inline-block">, All rights Reserved</span>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
