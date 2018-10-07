<template>
  <section class="container">
    <div>
      <b-row>
        <b-col>
          <h1 class="title">
            wunO PDF Generator
          </h1>
          <Logo />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card title="Example Template"
            style="max-width: 20rem;"
            class="mb-2">
            <p class="card-text">
              This is a test template set in place as an example of what a template looks like before being rendered as a PDF. A ternary function renders mock data when GET / POST params are not present.
            </p>
            <a href="/example-template">
              Example Template
            </a>
          </b-card>
        </b-col>
    </b-row>
    </div>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>

<style>
@font-face {
  font-family: "MyriadPro-Regular";
  font-weight: normal;
  font-style: normal;
  src: url("~assets/fonts/MyriadPro-Regular.otf"); /* IE9 Compat Mode */
  src: url("~assets/fonts/MyriadPro-Regular.otf") format("otf");
}
.container {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: "MyriadPro-Regular", "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 3.5vw;
  color: #e9593d;
  letter-spacing: 1px;
}
.row {
  padding-top: 40px;
  margin: 0 auto;
}
.col {
  margin: 0 auto;
}
.card {
  margin: 0 auto;
}
</style>
