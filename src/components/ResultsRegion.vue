<template>
  <div>
    <h1>Please Find Your Options Below:</h1>
    <div v-for="el in markers" :key="el.id" class="LocationBox">
      <!-- <div class="storeName">Store Name: {{ el.name }}</div>
      <div class="details">Store Type: {{ el.type }}</div>
      <div class="details">Store City:{{ el.city }}</div>
      <div class="details">Highway: {{ el.highway }}</div> -->
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
