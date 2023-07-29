<template>
  <!-- Follow 컴포넌트로 수정... -->
  <v-card color="#7e675e" dark>
    <div>
      <v-card-title class="headline">Worldmap</v-card-title>

      <v-card-subtitle>
        worldmap
      </v-card-subtitle>

      <div>
        <v-img
          style="margin: auto"
          :src="worldmapImg"
          max-width="500px"
        ></v-img>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    worldmapImg: require("@/assets/continents/worldmap.png")
  })
};
</script>

<style></style>
