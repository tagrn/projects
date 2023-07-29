<template>
  <v-card :loading="loading" class="mx-auto my-16" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="250" :src="exhibitionImage"></v-img>
    <div class="d-flex justify-center" style="text-align: center;">
      <v-card-title class="font-change-MapoPeacefull-card-title">{{
        exhibitionLocation
      }}</v-card-title>
    </div>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-icon size="20px" color="#DDA288" class="animate-bounce">
          mdi-heart
        </v-icon>

        <div class="grey--text ml-4">
          {{ likeCount }}
        </div>
      </v-row>

      <div class="my-4 subtitle-1"></div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-chip-group class="accent-4 white--text" column>
        <v-chip
          v-for="(item, idx) in exhibitionContent"
          :key="idx"
          style="background-color:#DD6288; color:white;"
          class="tag-hover-event-class"
          @click="gotoSearch(item)"
        >
          {{ item }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn
        color="#DD6288"
        text
        large
        @click="goPhotoViewer"
        class="mb-1"
        style="font-size: 16px"
      >
        GO
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

export default {
  name: "ContinentCard",
  data: () => ({
    loading: false,
    selection: 1
  }),
  props: {
    exhibitionImage: [String],
    exhibitionContent: [Array, String],
    exhibitionLocation: [String],
    exhibitionIndex: [Number],
    likeCount: [Number, String]
  },
  methods: {
    goPhotoViewer() {
      if (this.exhibitionIndex == -1 || this.exhibitionIndex == undefined) {
        alert("깃발을 선택하고 <GO>버튼을 눌러주세요.");
      } else {
        localStorage.setItem("articleId", this.exhibitionIndex);
        axios
          .get(
            `${SERVER.BOARD_BASE_URL}increaseview?id=${localStorage.getItem(
              "articleId"
            )}`
          )
          .catch(err => {
            console.error(err);
          });
        this.$router.push({ name: "PhotoView" });
      }
    },
    gotoSearch: function(tag) {
      if (tag[0] == "#") {
        tag = tag.substring(1, tag.length);
      }
      localStorage.setItem("selectContinentforSearch", "All");
      localStorage.setItem("searchData", tag);
      this.$router.push({ name: "SearchWaterfall" });
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "MapoPeacefull";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.font-change-MapoPeacefull-card-title {
  font-family: "MapoPeacefull";
  color: #444444;
}

@keyframes lighttextparty {
  from {
    transform: scale(0.9);
  }

  to {
    transform: scale(1.1);
  }
}

.animate-bounce {
  animation-duration: 0.8s;
  animation-name: lighttextparty;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>
