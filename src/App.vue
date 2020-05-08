<template>
  <div id="app">
    <div>
      <Header msg="Welcome to FlyingK's High Flying Website" />
      <Map v-bind:selectedValue="selectedValue" />
      <FilterRegion v-on:submitSelectedValue="onSubmitSelectedValue" />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import FilterRegion from "./components/FilterRegion";
import Map from "./components/Map";

export default {
  name: "app",
  components: {
    Header,
    Map,
    FilterRegion,
  },
  methods: {
    onSubmitSelectedValue(value) {
      this.selectedValue = JSON.parse(JSON.stringify(value));
    },
  },
  data() {
    return {
      selectedValue: {
        selectedTypes: [],
        selectedHighway: "ALL",
        selectedCity: "ALL",
        selectedState: "ALL",
        // selectedAmenities: [],
        // selectedRestaurants: [],
      },
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
