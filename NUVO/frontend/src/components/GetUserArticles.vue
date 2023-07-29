<template>
  <v-overlay
    :fixed="true"
    :opacity="0.9"
    :value="getArticles"
    style="z-index:12"
  >
    <!-- 뒤로가기 버튼 -->
    <v-btn
      elevation="3"
      fab
      color="#DDA288"
      style="position:fixed; left:60px; top:45%; color:white;"
      @click="clickGoBack"
    >
      <v-icon size="38px">
        mdi-arrow-left-bold-circle
      </v-icon>
    </v-btn>
    <v-container style="padding: 10% 10% 10% 10%;">
      <v-row>
        <v-col cols="12">
          <span
            style="font-size:28px; font-family:'MapoFlowerIsland'; cursor:default;"
            >{{ author }}</span
          >
          <!-- 저장할건가...? 저장하는거 말고 VR을 봤던 걸 보여주는 방식도 생각해 봤음. -->
          <v-icon
            size="34px"
            style="margin-left: 42px"
            @click="addMyList"
            :class="{
              'hover-event-goto-image-for-data': true,
              'check-my-list': isCheckMyList,
            }"
          >
            mdi-star
          </v-icon>
        </v-col>
        <v-col cols="4" v-for="(image, idx) in images" :key="idx">
          <img
            :src="`${image}`"
            alt=""
            width="100%"
            style="height: 300px; overflow: hidden;"
            class="hover-event-goto-image-for-data"
            @click="gotoSelectArticle(idx)"
          />
          <div style="margin-top:5px;">
            <v-icon color="#DDA288">
              mdi-heart
            </v-icon>
            {{ like[idx] }}

            <span
              style="border-radius:5px;padding:1px 5px 1px 5px; margin: 2px 2px 2px 15px; background-color:grey;"
              class="hover-event-goto-location-for-data"
              @click="gotoSelectLocation(locations[idx])"
              >{{ locations[idx] }}</span
            >
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-space-between" width="100%">
          <v-btn
            v-if="indexPage > 0"
            color="#222222"
            @click="getArticlesDecrease"
          >
            이전 페이지
          </v-btn>
          <div v-else></div>
          <v-btn
            v-if="endPage == false"
            @click="getArticlesIncrease"
            color="#222222"
          >
            다음 페이지
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script>
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

export default {
  name: "GetUserArticles",
  data: function() {
    return {
      indexPage: -1,
      images: [],
      locations: [],
      like: [],
      ids: [],
      endPage: false,
      isCheckMyList: false,
    };
  },
  props: {
    author: [String],
    getArticles: [Boolean],
  },
  watch: {
    author() {
      this.getArticlesIncrease();
      axios
        .get(
          `${SERVER.BASE_URL}auth/bookmarkcheck?targetname=${this.author}&username=${this.$store.state.Auth.authToken.username}`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.Auth.authToken.token,
            },
          }
        )
        .then((res) => {
          this.isCheckMyList = !res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  methods: {
    getArticlesIncrease: function() {
      this.indexPage = this.indexPage + 1;
      this.endPage = false;
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}postgetusername?username=${this.author}&num=${this.indexPage}`
        )
        .then((res) => {
          this.images = [];
          this.locations = [];
          this.like = [];
          this.ids = [];
          res.data.forEach((e) => {
            this.images.push(e.filePath);
            this.locations.push(e.board.location);
            this.like.push(e.board.good);
            this.ids.push(e.board.id);
          });
        })
        .catch((err) => {
          alert("마지막 페이지 입니다.");
          this.endPage = true;
          console.error(err);
        });
    },
    getArticlesDecrease: function() {
      this.endPage = false;
      this.indexPage = this.indexPage - 1;
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}postgetusername?username=${this.author}&num=${this.indexPage}`
        )
        .then((res) => {
          this.images = [];
          this.locations = [];
          this.like = [];
          this.ids = [];
          res.data.forEach((e) => {
            this.images.push(e.filePath);
            this.locations.push(e.board.location);
            this.like.push(e.board.good);
            this.ids.push(e.board.id);
          });
        })
        .catch((err) => {
          this.indexPage = this.indexPage + 1;
          console.error(err);
        });
    },
    gotoSelectArticle: function(idx) {
      // 이거는 태진햄이 쓰면 되유. 프로필에서 들어갈 때.
      if (this.author === this.$store.state.Auth.authToken.username) {
        this.indexPage = 0;
        this.clickGoBack();
        localStorage.setItem("articleId", this.ids[idx]);
        axios
          .get(
            `${SERVER.BOARD_BASE_URL}increaseview?id=${localStorage.getItem(
              "articleId"
            )}`
          )
          .catch((err) => {
            console.error(err);
          });
        this.$router.push({ name: "PhotoView" });
      } else {
        if (this.ids[idx] == localStorage.getItem("articleId")) {
          this.indexPage = 0;
          this.clickGoBack();
        } else {
          localStorage.setItem("articleId", this.ids[idx]);
          axios
            .get(
              `${SERVER.BOARD_BASE_URL}increaseview?id=${localStorage.getItem(
                "articleId"
              )}`
            )
            .catch((err) => {
              console.error(err);
            });
          this.indexPage = 0;
          this.clickGoBack();
        }
      }
    },
    clickGoBack: function() {
      this.$emit("exitGetUserArticles", false);
    },
    gotoSelectLocation: function(loc) {
      if (loc === "northamerica") {
        localStorage.setItem("continent", "northAmerica");
        this.$router.push({ name: "EachWaterfall" });
        return;
      }
      if (loc === "southamerica") {
        localStorage.setItem("continent", "southAmerica");
        this.$router.push({ name: "EachWaterfall" });
        return;
      } else {
        localStorage.setItem("continent", loc);
        this.$router.push({ name: "EachWaterfall" });
        return;
      }
    },
    // 추가하는 api 넣어야 함.
    addMyList: function() {
      const formData = new FormData();

      if (this.isCheckMyList) {
        formData.append("flag", "true");
      } else {
        formData.append("flag", "false");
      }
      this.isCheckMyList = !this.isCheckMyList;
      formData.append("targetname", this.author);
      formData.append("username", this.$store.state.Auth.authToken.username);

      axios
        .post(`${SERVER.BASE_URL}auth/bookmark`, formData, {
          headers: {
            Authorization: "Bearer " + this.$store.state.Auth.authToken.token,
          },
        })
        .catch((err) => {
          console.error(err);
          this.isCheckMyList = !this.isCheckMyList;
        });
    },
  },
};
</script>

<style>
.hover-event-goto-location-for-data:hover {
  cursor: pointer;
  transition: 0.5s;
  background-color: white;
  color: #222222;
}

.hover-event-goto-image-for-data:hover {
  cursor: pointer;
  transition: 0.5s;
  transform: scale(1.01);
  opacity: 0.7;
}

.check-my-list {
  color: #dda288 !important;
}
</style>
