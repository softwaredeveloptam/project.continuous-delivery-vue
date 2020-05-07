<template>
  <div>
    <GmapMap
      :zoom="4"
      :center="{ lat: 39.5, lng: -98 }"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
    >
      <GmapMarker
        v-for="marker in markers"
        :key="marker.key"
        :position="marker.position"
        @rightclick="markerRightClicked"
        :icon="
          'http://maps.google.com/mapfiles/ms/icons/' +
            markerColer(marker.type) +
            '-dot.png'
        "
      />
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import axios from "axios";

export default {
  name: "Map",
  mounted() {
    //this.getLocations();
    this.addMarker(); //get place from database and add marker
  },
  computed: {
    locations() {
      return this.$store.state.locations;
    },
    google: gmapApi,
  },
  methods: {
    // getLocations() {
    //   this.$store.dispatch("loadMarkers");
    // },
    markerRightClicked() {},
    markerColer(type) {
      if (type === "Travel Stop") {
        return "blue";
      }
      if (type === "Country Store") {
        return "yellow";
      } else {
        return "red";
      }
    },
    async addMarker() {
      const shopLocation = await axios.get("/api/locations");
      let markers = shopLocation.data;
      console.log(shopLocation);
      markers = markers.map((shop) => {
        return {
          position: { lat: shop.latitude, lng: shop.longitude },
          type: shop.type,
        };
      });
      this.markers = markers;
    },
  },
  data() {
    return {
      markers: [],
      places: [],
      currentPlace: null,
      locationsA: [],
    };
  },
};
</script>
