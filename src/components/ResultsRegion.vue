<template>
  <div>
    <h1>Please Find Your Options Below:</h1>
    <div v-for="el in markers" :key="el.id" class="LocationBox">
      <div class="storeName">Name: {{ el.name }}</div>
      <div class="details">
        Highway and Exit: exit {{ el.highway_exit_num }} of {{ el.highway }}
      </div>
      <div class="details">
        Address: {{ el.street_address }}, {{ el.city }}, {{ el.state }}
      </div>
      <div class="details">
        Contact Numbers: <br />
        Telephone {{ el.telephone }} <br />
        Fax: {{ el.fax }}
      </div>
      <div class="details">
        Amenities, Gas Prices and Restaraunt Details: Coming Soon!
      </div>
    </div>
    <!-- <h4>{{ markers }}</h4> -->
  </div>
</template>

<script>
export default {
  name: "ResultsRegion",
  props: {
    markers: Array,
  },
};
</script>

<style scoped>
.storeName {
  font-size: 18;
}
.details {
  font-size: 14;
}
.LocationBox {
  display: block;
  margin-left: auto;
  margin-right: auto;

  margin-top: 20px;
  outline: 1px solid teal;
  outline-offset: 3 px;
}
</style>
