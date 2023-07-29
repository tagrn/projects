<template>
  <div v-show="visibleSlide === idx" class="carousel-slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["visibleSlide", "idx"],
  data: function() {
    return {};
  }
};
</script>

<style scoped>
.carousel-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
