<template>
  <v-container fluid ma-0 pa-a style="background-color:#8593ae">
    <v-row dense>
      <!-- 전체 게시물(나의 게시물) -->
      <v-col v-for="(card, idx) in cards" :key="idx" cols="4">
        <v-card>
          <v-card-title>
            {{ card }}
          </v-card-title>

          <v-card-subtitle>
            humm...
          </v-card-subtitle>

          <v-card-actions>
            <v-btn outlined rounded small @click="gotoGetArticlesPage(card)">
              View
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row style="height:30px"></v-row>

    <GetUserArticles
      :getArticles="getArticles"
      :author="author"
      @exitGetUserArticles="exitGetUserArticles"
    />
  </v-container>
</template>

<script>
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

import GetUserArticles from "@/components/GetUserArticles.vue";

export default {
  components: {
    GetUserArticles,
  },
  data: () => ({
    cards: [],
    pageIdx: 1,
    page: 11,
    author: "",
    getArticles: false,
  }),
  props: ["user"],
  created() {
    axios
      .get(
        `${SERVER.BASE_URL}${SERVER.ROUTES.auth.getAllBookmarks}?username=${this.user.username}`
      )
      .then((res) => {
        this.cards = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    onPageChange(newPage) {
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}${
            SERVER.ROUTES.board.getpost
          }?num=${newPage - 1}&username=${this.user.username}`
        )
        .then((res) => {
          this.cards = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    gotoGetArticlesPage: function(targetname) {
      this.getArticles = true;
      this.author = targetname;
    },
    exitGetUserArticles: function(data) {
      this.getArticles = data;
      // 프로필에서 들어가고 나올 땐, 이 함수 밑에 axios는 신경 안 써도 됩니당.
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}getposts?id=${localStorage.getItem(
            "articleId"
          )}&username=${this.$store.state.Auth.authToken.username}`
        )
        .then((response) => {
          if (response.data.like === "false") {
            this.isSelectLike = false;
          } else {
            this.isSelectLike = true;
          }
          this.premium = response.data.board.premium;
          this.author = response.data.board.author;
          this.vfImages = [];
          this.vfImages.push(response.data.filePath);
          for (let i = 0; i < response.data.subPath.length; i++) {
            this.vfImages.push(response.data.subPath[i]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style></style>
