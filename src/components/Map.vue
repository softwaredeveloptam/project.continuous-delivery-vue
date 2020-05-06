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
        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      />
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  name: "Map",
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
  },
  data() {
    return {
      markers: [
        { position: { lat: 25.7392, lng: -104.9903 } },
        { position: { lat: 26.7392, lng: -105.9903 } },
      ],
      places: [],
      currentPlace: null,
    };
  },
};
</script>
