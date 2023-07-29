<template>
  <v-card width="80%" class="mx-auto my-16">
    <v-img height="20vh" :src="exhibitionImage"></v-img>

    <v-card-title>{{ exhibitionTitle }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-icon size="20px" color="#DDA288" class="animate-bounce">
          mdi-heart
        </v-icon>

        <div class="grey--text ml-4">
          {{ likeCount }}
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        {{ exhibitionLocation }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-chip-group class="accent-4 white--text" column>
        <v-chip
          v-for="(item, idx) in exhibitionContent"
          :key="idx"
          style="background-color:#DD6288; color:white;"
        >
          {{ item }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn color="#DD6288" text large class="mb-1" style="font-size: 16px">
        {{ exhibitionAuthor }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    exhibitionImage: [String],
    exhibitionTitle: [String],
    exhibitionContent: [Array, String],
    exhibitionLocation: [String],
    exhibitionAuthor: [String],
    likeCount: [Number, String]
  },
  methods: {}
};
</script>

<style>
.animate-bounce {
  animation-duration: 0.8s;
  animation-name: lighttextparty;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes lighttextparty {
  from {
    transform: scale(0.9);
  }

  to {
    transform: scale(1.1);
  }
}
</style>
