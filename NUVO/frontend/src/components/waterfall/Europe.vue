<template>
  <!-- 각 대륙의 전체 사진 불러오기. -->
  <!-- 단, 각 대륙의 모든 사진을 불러오기 때문에 더 보기 버튼을 만들어서 15개씩 불러오는 방향을 잡아야 할 듯. -->
  <v-container class="adjust-grid-container">
    <div style="width:100%; height: 20px;"></div>
    <div style="width:100%; height: 20px;"></div>
    <div
      style="width:100%; margin-left: 2%; height: 60px; font-size:33px; color:white; font-family:'MapoFlowerIsland';"
    >
      Europe
    </div>
    <div style="width:100%; height: 10px;"></div>
    <hr />
    <div style="width:100%; height: 35px;"></div>
    <v-row>
      <v-col v-for="(image, idx) in images" :key="idx" cols="12" sm="6" md="4">
        <!-- 이미지 가져오는 코드 -->
        <div class="d-flex justify-center">
          <img
            :src="`${image}`"
            alt="image error"
            class="adjust-grid-image opacity-event-for-waterfall"
            style="cursor:pointer;"
            @click="gotoSelectArticle(idx)"
          />
        </div>
        <br />

        <!-- 태그 보여주는 코드 -->
        <v-chip-group
          class="accent-4 white--text"
          style="text-algin:center;"
          column
        >
          <v-chip
            v-for="(item, i) in tags[idx]"
            :key="i"
            style="background-color:grey; color:white;"
            class="tag-hover-event-class"
            @click="gotoSearch(item)"
          >
            {{ item }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

export default {
  name: "Europe",
  props: {
    images: [Array], // EachWaterfall.vue router에서 받아온 데이터들
    tags: [Array], // EachWaterfall.vue router에서 받아온 데이터들
    indexs: [Array] // EachWaterfall.vue router에서 받아온 데이터들
  },
  methods: {
    // 게시물 사진 보기
    gotoSelectArticle: function(idx) {
      localStorage.setItem("articleId", this.indexs[idx]);
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
    },
    gotoSearch: function(tag) {
      if (window.innerWidth < 500 || window.innerHeight < 450) {
        return;
      }
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
/* 이미지 반응형으로 모든 기기에서 사용가능하게 만듬 */
.adjust-grid-container {
  padding: 80px 0px 0px 140px;
}
.adjust-grid-image {
  width: 250px;
}

@media (min-width: 600px) {
  .adjust-grid-image {
    width: 230px;
  }
}

@media (min-width: 800px) {
  .adjust-grid-image {
    width: 270px;
  }
}

@media (min-width: 1000px) {
  .adjust-grid-container {
    padding: 80px 0px 0px 100px;
  }
}

/* 1264px 부터 css코드 */
@media (min-width: 1264px) {
  .adjust-grid-image {
    width: 350px;
  }
}

/* 1600px 부터 css코드 */
@media (min-width: 1500px) {
  .adjust-grid-container {
    padding: 80px 0px 0px 0px;
  }
  .adjust-grid-image {
    width: 380px;
  }
}

/* 1904px 부터 css코드 */
@media (min-width: 1904px) {
  .adjust-grid-container {
    padding: 80px 130px 0px 130px;
  }
  .adjust-grid-image {
    width: 450px;
  }
}

/* 후버 효과 */
.opacity-event-for-waterfall:hover {
  transition: 0.5s;
  transform: scale(1.03);
  opacity: 0.4;
}
</style>
