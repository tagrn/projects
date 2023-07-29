<template>
  <!-- App.vue -->
  <v-main>
    <MobileMain v-if="windowWidth < 500 || windowHeight < 450" />
    <Main v-else />
  </v-main>
</template>

<script lang="ts">
import Main from "@/components/Main.vue";
import MobileMain from "@/components/mobile/Main.vue";

export default {
  name: "Home",
  data: function() {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  },
  components: {
    Main,
    MobileMain
  }
};
</script>
