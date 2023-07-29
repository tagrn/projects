<template>
  <div class="carousel">
    <slot></slot>
    <button class="prev" @click="prev">Prev</button>
    <button class="next" @click="next">Next</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    prev() {
      this.$emit("prev");
    },
    next() {
      this.$emit("next");
    }
  }
};
</script>

<style scoped>
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  position: absolute;
  height: 40px;
  width: 50px;
  left: 20%;
  border-radius: 5px;
  background-color: black;
  color: white;
}
button:active,
button:hover {
  outline: none;
  cursor: pointer;
}

.prev {
  top: calc(100vh - 80%);
}
.next {
  top: calc(100vh - 25%);
}
</style>
