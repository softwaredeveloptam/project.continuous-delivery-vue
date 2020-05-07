<template>
  <div>
    <GmapMap
      :zoom="4"
      :center="{ lat: 25.7392, lng: -104.9903 }"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
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

//[{lat:, lun:, name:}]
//parse.json

export default {
  name: "Map",
  mounted() {
    this.getLocations();
    this.getFromDb();
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
    markerColer(type) {
      if (type === "restaurant") {
        return "blue";
      }
      if (type === "grocery") {
        return "yellow";
      }
    },
    async getFromDb() {
      const shopLocation = await axios.get("/api/locations");
      console.log("Shop Location!!", shopLocation);
    },
  },
  data() {
    return {
      markers: [
        { position: { lat: 25.7392, lng: -104.9903 }, type: "restaurant" },
        { position: { lat: 26.7392, lng: -105.9903 }, type: "grocery" },
      ],
      places: [],
      currentPlace: null,
      locationsA: [],
    };
  },
};
</script>
