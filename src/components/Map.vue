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
    this.getPlaces().then(() => {
      this.markers = this.places;
    }); //get place from database and add marker
  },

  computed: {
    locations() {
      return this.$store.state.locations;
    },
    google: gmapApi,
  },

  watch: {
    selectedValue: {
      handler() {
        this.updateMarker();
      },
      deep: true,
    },
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

    async getPlaces() {
      const shopLocation = await axios.get("/api/locations");
      let places = shopLocation.data;
      places = places.map((shop) => {
        return {
          position: { lat: shop.latitude, lng: shop.longitude },
          type: shop.type,
          state: shop.state,
          city: shop.city,
          highway: shop.highway,
          name: shop.name,
          site_name: shop.site_name,
          //Need to add Amenities and Restaurants
        };
      });
      this.places = places;
    },

    updateMarker() {
      this.markers = this.places;

      if (this.selectedValue.selectedState !== "ALL") {
        this.markers = this.places.filter(
          (place) => place.state === this.selectedValue.selectedState
        );
      }

      if (this.selectedValue.selectedCity !== "ALL") {
        this.markers = this.markers.filter(
          (place) => place.city === this.selectedValue.selectedCity
        );
      }

      if (this.selectedValue.selectedHighway !== "ALL") {
        this.markers = this.markers.filter(
          (place) => place.highway === this.selectedValue.selectedHighway
        );
      }

      if (this.selectedValue.selectedTypes.length) {
        this.markers = this.markers.filter((place) =>
          this.selectedValue.selectedTypes.includes(place.type)
        );
      }
      //Need to add Amenities and Restaurants
    },
  },
  props: ["selectedValue", "submitted"],
  data() {
    return {
      markers: [],
      places: [],
      currentPlace: null,
    };
  },
};
</script>
