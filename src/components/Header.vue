<template>
  <div>
    <h1>{{ msg }}</h1>
    <h6>
      Your feedback is appreciated. Please vist TBD and share your thoughts
    </h6>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String,
  },
};
</script>
