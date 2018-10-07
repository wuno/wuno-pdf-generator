<template>
  <section class="container">
    <div>
      <b-row>
        <b-col>
          <h1 class="title">
          {{testFieldSix}}
          </h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card :title="testFieldSix"
            style="max-width: 20rem;"
            class="mb-2">
            <p class="card-text">
              <h3>{{testFieldTwo}}</h3>
              <h4>{{testFieldThree}}</h4>
              <h4>{{testFieldFour}}</h4>
              <h4>{{testFieldFive}}</h4>
            </p>
            <hr class="divider">
               {{testFieldOne}}
          </b-card>
        </b-col>
    </b-row>
    <!-- User the page-break class to break pages when PDF is rendered. -->
    <p class="page-break"></p>
    <b-row>
      <b-col>
        <div id="result-chart"></div>
      </b-col>
    </b-row>
    </div>
  </section>
</template>


<script>
import * as d3 from "d3";
if (process.browser && window) {
  window.c3 = require("c3");
}
import "c3/c3.css";
import mockData from "./mockData";

export default {
  data() {
    return {
      testFieldOne: "",
      testFieldTwo: "",
      testFieldThree: "",
      testFieldFour: "",
      testFieldFive: "",
      testFieldSix: "",

      chartOne: "",
      chartTwo: "",
      chartThree: "",
      chartFour: "",
      chartFive: ""
    };
  },
  created() {
    const json = this.$router.currentRoute.query.data;
    const data = json ? JSON.parse(json) : mockData;

    this.testFieldOne = data.testFieldOne;
    this.testFieldTwo = data.testFieldTwo;
    this.testFieldThree = data.testFieldThree;
    this.testFieldFour = data.testFieldFour;
    this.testFieldFive = data.testFieldFive;
    this.testFieldSix = data.testFieldSix;

    this.chartOne = data.chartOne;
    this.chartTwo = data.chartTwo;
    this.chartThree = data.chartThree;
    this.chartFour = data.chartFour;
    this.chartFive = data.chartFive;
  },
  mounted() {
    c3.generate({
      bindto: "#result-chart",
      data: {
        columns: [
          ["chartOne", this.chartOne],
          ["chartTwo", this.chartTwo],
          ["chartThree", this.chartThree],
          ["chartFour", this.chartFour],
          ["chartFive", this.chartFive]
        ],
        colors: {
          chartOne: "#185675",
          chartTwo: "#0b6d68",
          chartThree: "#4c899a",
          chartFour: "#c1cb3f",
          chartFive: "#b3c291"
        },
        type: "pie"
      },
      legend: {
        position: "right",
        colors: {
          chartOne: "#185675",
          chartTwo: "#0b6d68",
          chartThree: "#4c899a",
          chartFour: "#c1cb3f",
          chartFive: "#b3c291"
        }
      },
      pie: {
        label: {
          show: false
        }
      }
    });
  }
};
</script>

<style>
.page-break {
  page-break-before: always;
}
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
.title {
  font-family: "MyriadPro-Regular", "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 3.5vw;
  color: #e9593d;
  letter-spacing: 1px;
}
.divider {
  margin: 0 auto;
  padding: 10px;
}
#result-chart {
  width: 300px;
  top: -55px;
}
</style>
