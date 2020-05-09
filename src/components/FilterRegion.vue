<template>
  <div>
    <h1>Search</h1>
    <div class="filter-box">
      Locations:
      <br />
      <select class="state" v-model="state">
        <option value disabled>State</option>
        <option v-for="state in states" :key="state" :value="state">{{
          state
        }}</option>
      </select>
      <select class="city" v-model="city">
        <option value disabled>City</option>
        <option v-for="city in cities" :key="city" :value="city">{{
          city
        }}</option>
      </select>
      <select class="highway" v-model="highway">
        <option value disabled>Highway</option>
        <option v-for="highway in highways" :key="highway" :value="highway">{{
          highway
        }}</option>
      </select>
    </div>
    <div class="filter-box">
      Type:
      <br />
      <label v-for="type in types" :key="type">
        <input type="checkbox" :value="type" v-model="storetype" />
        {{ type }}
      </label>
    </div>
    <div>
      <div class="button-box">
        <button
          class="button"
          v-on:click="$emit('filter', result)"
          id="filterSubmitButton"
        >
          Search
        </button>
        <button class="button" v-on:click="clearDropdown">Reset</button>
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
  watch: {
    state() {
      this.city = "";
    },
    city() {
      this.highway = "";
    },
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
        .reduce((accumulator, value) => {
          if (!accumulator.includes(value)) {
            accumulator.push(value);
          }
          return accumulator.sort();
        }, []);
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
        .reduce((accumulator, value) => {
          if (!accumulator.includes(value)) {
            accumulator.push(value);
          }
          return accumulator.sort();
        }, []);
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
      } else if (this.state && this.city) {
        result = result.filter(
          (l) => l.city === this.city && l.state === this.state
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
      this.state = "";
      this.city = "";
      this.highway = "";
      this.storetype = [];
      this.$nextTick(() => this.$emit("filter", this.result));
    },
  },
};
</script>

<style scoped>
.state {
  width: 100px;
  outline: none;
  font-size: 14px;
}
.city {
  width: 130px;
  outline: none;
  font-size: 14px;
}
.highway {
  width: 100px;
  outline: none;
  font-size: 14px;
}
.filter-box {
  font-size: 18px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  margin-top: 10px;
  outline: 1px solid teal;
  outline-offset: 3px;

  width: 80%;
  padding-top: 3px;
  padding-bottom: 3px;
}
.button-box {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  width: 80%;
  padding-top: 5px;
  padding-bottom: 5px;
}
.button {
  outline: none;
  font-size: 14px;
  padding-left: 5px;
  margin-left: 5px;
  margin-right: 5px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 6px;
  border-bottom: solid 2px black;
}
.button:hover {
  background-color: #c2d6d6;
  border-bottom: solid 2px black;
}
.button:active {
  -webkit-transform: translateY(2px);
  transform: translateY(2px);
  border-bottom: none;
}
</style>
