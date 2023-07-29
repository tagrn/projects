<template>
  <v-container fluid ma-0 pa-a style="background-color:#8593ae">
    <v-row dense>
      <!-- 전체 게시물(나의 게시물) -->
      <v-col v-for="(card, idx) in cards" :key="idx" cols="4">
        <v-card>
          <v-img
            :src="card.filePath"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
          </v-img>
          <v-card-title>
            {{ card.board.location }}
          </v-card-title>

          <v-card-subtitle>
            <v-chip-group>
              <v-chip
                color="default text--default"
                v-for="(obj, idx) in card.tags"
                :key="idx"
              >
                {{ obj.tag }}
              </v-chip>
            </v-chip-group>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn outlined rounded small @click="gotoPhotoView(card.board.id)">
              View
            </v-btn>
            <v-btn
              color="error"
              outlined
              rounded
              small
              @click="delGallery(card.board.id)"
            >
              Delete
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
              {{ card.board.good }}
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-eye</v-icon>
              {{ card.board.views }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row style="height:30px"></v-row>

    <!-- Paging 처리 -->
    <v-row mt-5 pt-4 cols="12" justify="center">
      <v-pagination
        v-model="pageIdx"
        :length="page"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @input="onPageChange"
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import SERVER from "@/apis/UrlMapper.ts";

export default {
  data: () => ({
    cards: [],
    pageIdx: 1,
    page: 11,
  }),
  props: ["user"],
  created() {
    axios
      .get(
        `${SERVER.BOARD_BASE_URL}${SERVER.ROUTES.board.getpost}?num=0&username=${this.user.username}`
      )
      .then((res) => {
        this.cards = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    for (let i = 1; i < 10; i++) {
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}${SERVER.ROUTES.board.getpost}?num=${i}&username=${this.user.username}`
        )
        .then((res) => {
          if (res.data == "End Page") {
            this.page = Math.min(this.page, i);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    gotoPhotoView(id) {
      localStorage.setItem("articleId", id);
      this.$router.push({ name: "PhotoView" });
    },
    delGallery(id) {
      axios
        .delete(
          `${SERVER.BOARD_BASE_URL}${SERVER.ROUTES.board.delpost}?id=${id}`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.Auth.authToken.token,
            },
          }
        )
        .then((res) => {
          swal.fire({
            text: "삭제완료!",
            icon: "success",
          });
          axios
            .get(
              `${SERVER.BOARD_BASE_URL}${SERVER.ROUTES.board.getpost}?num=0&username=${this.user.username}`
            )
            .then((res) => {
              this.cards = res.data;
            })
            .catch((err) => {
              console.log(err);
            });

          for (let i = 1; i < 10; i++) {
            axios
              .get(
                `${SERVER.BOARD_BASE_URL}${SERVER.ROUTES.board.getpost}?num=${i}&username=${this.user.username}`
              )
              .then((res) => {
                if (res.data == "End Page") {
                  this.page = Math.min(this.page, i);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
