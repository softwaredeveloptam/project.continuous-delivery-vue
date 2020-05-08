<template>
  <div id="app">
    <div>
      <Header msg="Welcome to FlyingK's High Flying Website" />
      <Map v-bind:markers="markers" />
      <!-- <FilterRegion
        v-on:submitSelectedValue="onSubmitSelectedValue"
        v-on:updateDropdowns="onupdateDropdowns"
      /> -->
      <FilterRegion v-on:filter="updateMarkers" />
      <!-- <ResultsRegion v-bind:markers="this.markers" /> -->
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import FilterRegion from "./components/FilterRegion";
import Map from "./components/Map";
// import ResultsRegion from "./components/ResultsRegion";

export default {
  name: "app",
  components: {
    Header,
    Map,
    FilterRegion,
  },
  methods: {
    updateMarkers(markers) {
      this.markers = markers;
    },
  },
  data() {
    return {
      markers: [],
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
