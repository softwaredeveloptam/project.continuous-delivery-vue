<template>
  <div>
    <!-- <div>
      <h2>Search and add a pin</h2>
      <gmap-autocomplete v-on:place_changed="setPlace"></gmap-autocomplete>
    </div>-->
    <button v-on:click="addMarker">Add</button>

    <GmapMap
      :zoom="4"
      :center="{ lat: 25.7392, lng: -104.9903 }"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
    >
      <GmapMarker
        v-for="location in locations"
        :key="location.key"
        :position="location.position"
        :animation="location.defaultAnimation"
        @rightclick="markerRightClicked"
      />
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  name: "GoogleMap",
  mounted() {
    this.getLocations();
  },
  computed: {
    locations() {
      return this.$store.state.locations;
    },
    google: gmapApi,
  },
  methods: {
    getLocations() {
      this.$store.dispatch("loadMarkers");
    },
    markerRightClicked() {},
    setPlace() {
      this.currentPlace = { lat: 0, lng: 0 };
      console.log(this.currentPlace);
    },
    addMarker() {
      const marker = { lat: 25.7392, lng: -104.9903 };
      this.markers.push({ position: marker });
      console.log(this.markers);
      // if (this.currentPlace) {
      //   const marker = {
      //     lat: this.currentPlace.lat,
      //     lng: this.currentPlace.lng,
      //   };
      //   console.log(marker);
      //   this.markers.push({ position: marker });
      //   this.places.push(this.currentPlace);
      //   console.log(this.markers, this.places);
      //   this.center = marker;
      //   this.currentPlace = null;
      // }
    },
    // geolocate: function() {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.center = {
    //       lat: position.coords.latitude,
    //       lun: position.coords.longitude,
    //     };
    //   });
    // },
  },
  data() {
    return {
      markers: [],
      places: [],
      currentPlace: null,
    };
  },
};
</script>
