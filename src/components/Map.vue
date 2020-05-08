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
        :key="marker.id"
        :position="{ lat: marker.latitude, lng: marker.longitude }"
        :icon="
          'http://maps.google.com/mapfiles/ms/icons/' +
            markerColer(marker.type) +
            '-dot.png'
        "
      />
    </GmapMap>
    <button @click="$emit('updateMarkers', markers)" id="hiddenButton">
      Will hide later
    </button>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  name: "Map",

  computed: {
    google: gmapApi,
  },

  methods: {
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
  },
  props: ["markers"],
};
</script>
