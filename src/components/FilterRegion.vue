<template>
  <div>
    <h1>Search</h1>
    <div>
      Locations
      <select v-model="state">
        <option :value="null" disabled>Select State</option>
        <option v-for="state in states" :key="state" :value="state">
          {{ state }}
        </option>
      </select>
      <select v-model="city">
        <option :value="null" disabled>Select City</option>
        <option v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
      <select v-model="highway">
        <option :value="null" disabled>Select Highway</option>
        <option v-for="highway in highways" :key="highway" :value="highway">
          {{ highway }}
        </option>
      </select>
    </div>
    <div>
      Types
      <label v-for="type in types" :key="type">
        <input type="checkbox" :value="type" v-model="storetype" />
        {{ type }}
      </label>
      <div>
        <button v-on:click="$emit('filter', result)" id="filterSubmitButton">
          submit
        </button>
        <button v-on:click="clearDropdown">reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FilterRegion",
  async mounted() {
    const { data } = await axios.get("/api/locations");
    this.locations = data;
    this.$emit("filter", data);
  },
  data() {
    return {
      locations: [],
      state: "",
      city: "",
      highway: "",
      storetype: [],
    };
  },
  computed: {
    states() {
      return this.locations
        .map((l) => l.state)
        .reduce((accumulator, value) => {
          if (!accumulator.includes(value)) {
            accumulator.push(value);
          }
          return accumulator.sort();
        }, []);
    },
    cities() {
      if (!this.state) {
        return this.locations
          .map((l) => l.city)
          .reduce((accumulator, value) => {
            if (!accumulator.includes(value)) {
              accumulator.push(value);
            }
            return accumulator.sort();
          }, []);
      }
      return this.locations
        .filter((l) => l.state === this.state)
        .map((l) => l.city)
        .sort();
    },
    highways() {
      if (!this.state || !this.city) {
        return this.locations
          .map((l) => {
            return l.highway;
          })
          .reduce((accumulator, value) => {
            if (!accumulator.includes(value) && value) {
              accumulator.push(value);
            }
            return accumulator.sort();
          }, []);
      }
      return this.locations
        .filter((l) => l.city === this.city && l.state === this.state)
        .map((l) => {
          return l.highway;
        })
        .sort();
    },
    types() {
      return this.locations
        .map((l) => l.type)
        .reduce((accumulator, value) => {
          if (!accumulator.includes(value)) {
            accumulator.push(value);
          }
          return accumulator;
        }, []);
    },
    result() {
      let result = [...this.locations];
      if (this.state && this.city && this.highway) {
        result = result.filter(
          (l) =>
            l.city === this.city &&
            l.state === this.state &&
            l.highway === this.highway
        );
      } else if (this.state) {
        result = result.filter((l) => l.state === this.state);
      } else if (this.city) {
        result = result.filter((l) => l.city === this.city);
      } else if (this.highway) {
        result = result.filter((l) => l.highway === this.highway);
      }
      if (this.storetype.length !== 0) {
        result = result.filter((l) => this.storetype.includes(l.type));
      }
      return result;
    },
  },
  methods: {
    clearDropdown() {
      this.state = undefined;
      this.city = undefined;
      this.highway = undefined;
      this.storetype = [];
      this.$emit("filter", this.result);
    },
  },
};
</script>
