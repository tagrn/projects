<template>
  <div style="width:100%; height:100%;">
    <!-- 오른쪽 상단 Tips 픽스 -->
    <div class="tips">
      <SlideOptions
        v-if="windowWidth > 500 && windowHeight > 450"
        @optionChanged="vfOptionChanged"
      />
    </div>

    <MobileView
      v-if="windowWidth < 500 || windowHeight < 450"
      :vfImages="vfImages"
      :premium="premium"
    />
    <div class="container d-flex justify-center" v-else>
      <!-- 좋아요 버튼 -->
      <div
        style="
                position: fixed;
                height: 10%;
                margin: 0;
                padding: 0;
                top: 365px;
                right: 73px;
                z-index: 101;
              "
      >
        <v-icon
          size="30px"
          :class="{
            'like-hover-event': true,
            'select-like-transition': isSelectLike,
          }"
          @click="likeThisArticle"
        >
          mdi-heart
        </v-icon>
      </div>

      <!-- Flipbook 페이지로 가는 버튼 -->
      <v-btn
        elevation="3"
        fab
        color="#DDA288"
        style="position:fixed; right:60px; top:120px; color:white; z-index: 101;"
        @click="clickGotoFlipbook"
      >
        <v-icon>
          mdi-book-open-page-variant
        </v-icon>
      </v-btn>

      <!-- 3D PhotoBook 페이지로 가는 버튼 -->
      <!-- <v-btn
        elevation="3"
        fab
        color="indigo"
        dark
        style="position:fixed; right:120px; top:120px; color:white; z-index: 101;"
        @click="clickGoto3DBook"
      >
        <v-icon>
          mdi-book-open-page-variant-outline
        </v-icon>
      </v-btn> -->

      <!-- VR 페이지로 가는 버튼 -->
      <v-badge
        avatar
        bordered
        overlap
        style="position:fixed; right:60px; top:200px; color:white; z-index: 101;"
        v-if="premium"
      >
        <template v-slot:badge>
          <v-avatar>
            <v-img src="@/assets/photo/premium.png"></v-img>
          </v-avatar>
        </template>

        <v-btn elevation="3" fab color="#DDA288" @click="clickGotoVR">
          <span style="font-size:22px">VR</span>
        </v-btn>
      </v-badge>
      <v-btn
        v-else
        elevation="3"
        fab
        color="#DDA288"
        style="position:fixed; right:60px; top:200px; color:white; z-index: 101;"
        @click="clickGotoVR"
      >
        <span style="font-size:22px">VR</span>
      </v-btn>

      <!-- 뒤로가기 버튼 -->
      <v-btn
        elevation="3"
        fab
        color="#DDA288"
        style="position:fixed; right:60px; top:280px; color:white; z-index: 101;"
        @click="clickGoBack"
      >
        <v-icon size="38px">
          mdi-arrow-left-bold-circle
        </v-icon>
      </v-btn>

      <div class="flux">
        <vue-flux
          :options="vfOptions"
          :images="vfImages"
          :transitions="vfTransitions"
          class="adjust-grid-image"
          ref="slider"
        >
          <template v-slot:preloader>
            <flux-preloader />
          </template>

          <template v-slot:controls>
            <flux-controls />
          </template>

          <template v-slot:pagination>
            <flux-pagination />
          </template>

          <template v-slot:index>
            <flux-index />
          </template>
        </vue-flux>

        <!-- 이 코드는 사진 밑에 넣는 코드 근데.. 음 왼쪽이 나은 거 같긴함. -->
        <!-- <div class="d-flex justify-end align-center"> <pre class="profile">snapped by  </pre>
        <span class="user-hover-event-goto-profile" style="color:#DDA288; font-size:33px; font-family:'SDSamliphopangche_Outline';">{{author}}</span><pre>  </pre></div> -->
      </div>
      <!-- 작성자 버튼 및 작성자 일때 삭제 버튼 추가 -->
      <div style="position:fixed; left:40px; top:45%;">
        <div class="profile d-flex justify-center">snapped by</div>
        <span
          class="user-hover-event-goto-profile d-flex justify-center"
          style="color:#DDA288; text-align:center; font-size:35px; font-family:'SDSamliphopangche_Outline';"
          @click="gotoGetArticlesPage"
        >
          {{ author }}
        </span>
        <br />
        <div
          class="profile d-flex justify-center"
          v-if="this.$store.state.Auth.authToken.username == this.author"
          @click="deleteArticle"
        >
          <v-btn color="#DDA288" style="color:white; font-weight:bold;">
            <v-progress-linear
              v-if="fab"
              indeterminate
              color="red"
              style="width: 70px"
            ></v-progress-linear>
            <div v-else>
              게시글 삭제
            </div>
          </v-btn>
        </div>
      </div>
    </div>
    <v-overlay :fixed="absolute" :value="showTipsOverlay" :opacity="0.8">
      오른쪽 화면을 누르면 <br /><br />
      다음 사진으로 넘김니다.
      <pre></pre>
      왼쪽 화면을 누르면 <br /><br />
      이전 사진으로 돌아옵니다.
      <pre></pre>
      <div class="d-flex justify-center">
        <v-btn color="#DDA288" @click="showTipsOverlay = false">
          확인
        </v-btn>
      </div>
    </v-overlay>
    <v-overlay :fixed="absolute" :value="checkPayment" :opacity="0.8">
      <div class="d-flex justify-center" style="font-size: 24px;">
        해당 게시물의 VR을 보시려면
        <br /><br />
        3 N-Coin이 필요합니다.
        <br /><br />
        결제하시겠습니까?
        <br /><br />
      </div>
      <div class="d-flex justify-space-around">
        <v-btn color="#DDA288" @click="checkWallet">
          결제
        </v-btn>
        <v-btn color="#DDA288" @click="checkPayment = false">
          아니오
        </v-btn>
      </div>
    </v-overlay>
    <GetUserArticles
      :getArticles="getArticles"
      :author="author"
      @exitGetUserArticles="exitGetUserArticles"
    />
  </div>
</template>

<script>
import {
  VueFlux,
  FluxControls,
  FluxIndex,
  FluxPagination,
  FluxPreloader,
} from "vue-flux";
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

import MobileView from "@/components/mobile/View.vue";
import SlideOptions from "@/components/photo/SlideOptions.vue";
import GetUserArticles from "@/components/GetUserArticles.vue";

export default {
  components: {
    VueFlux,
    FluxControls,
    FluxIndex,
    FluxPagination,
    FluxPreloader,
    MobileView,
    SlideOptions,
    GetUserArticles,
  },
  data: () => ({
    fab: false,
    vfOptions: {
      autoplay: false,
    },
    vfImages: [],
    author: "",
    vfTransitions: ["Kenburn"],
    isSelectTips: false,
    isSelectLike: false,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    absolute: true,
    showTipsOverlay: false,
    premium: false,
    checkPayment: false,
    getArticles: false,
  }),
  computed: {
    user() {
      return this.$store.state.Auth.authToken;
    },
  },
  mounted() {
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
        this.vfImages.push(response.data.filePath);
        for (let i = 0; i < response.data.subPath.length; i++) {
          this.vfImages.push(response.data.subPath[i]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    gotoGetArticlesPage: function() {
      this.getArticles = true;
      // 자기꺼를 누르면 자기 프로필로 이동하게 만듬. 아니라면 해당 author의 게시물 출력.
      if (this.author === this.$store.state.Auth.authToken.username) {
        this.$router.push({ name: "Profile" });
      }
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
    vfOptionChanged: function(payload) {
      this.vfTransitions = [];
      for (const t in payload) {
        this.vfTransitions.push(payload[t]);
      }
    },
    clickGoto3DBook: function() {
      this.$router.push({ name: "Photobook3D" });
    },
    clickGotoFlipbook: function() {
      this.$router.push({ name: "Flipbook" });
    },
    clickGoBack: function() {
      this.$router.push({ name: localStorage.getItem("page") });
    },
    // 여기에 라우터 페이지 이동 하심 댐당
    clickGotoVR: function() {
      if (this.premium == true) {
        axios
          .get(
            `${SERVER.BOARD_BASE_URL}payrequest?id=${localStorage.getItem(
              "articleId"
            )}&username=${this.$store.state.Auth.authToken.username}&userid=${
              this.$store.state.Auth.authToken.id
            }`,
            {
              headers: {
                Authorization:
                  "Bearer " + this.$store.state.Auth.authToken.token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data == true) {
              this.$router.push({ name: "Aframe" });
            } else {
              this.checkPayment = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$router.push({ name: "Aframe" });
      }
    },
    payCointoAuthor: function() {
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}paypost?id=${localStorage.getItem(
            "articleId"
          )}&username=${this.$store.state.Auth.authToken.username}&userid=${
            this.$store.state.Auth.authToken.id
          }`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.Auth.authToken.token,
            },
          }
        )
        .then(() => {
          this.$router.push({ name: "Aframe" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkWallet: function() {
      axios
        .get(
          `${SERVER.BASE_URL}auth/getuser?username=${this.$store.state.Auth.authToken.username}`
        )
        .then((res) => {
          if (res.data.money > 2) {
            this.payCointoAuthor();
          } else {
            alert("코인이 부족합니다. 결제페이지로 이동합니다.");
            this.$router.push({ name: "Pay" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 좋아요
    likeThisArticle: function() {
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}fixlike?curr=${
            this.isSelectLike
          }&id=${localStorage.getItem("articleId")}&username=${
            this.$store.state.Auth.authToken.username
          }`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.Auth.authToken.token,
            },
          }
        )
        .then((response) => {
          if (response.data === "false" || response.data === false) {
            this.isSelectLike = false;
          } else {
            this.isSelectLike = true;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 게시글 삭제
    deleteArticle: function() {
      if (this.fab == true) {
        this.fab = false;
        return;
      }
      // 이거 id로 바꾼 후, 다시 프로필의 id를 받아와서 보안성 높이기.
      axios
        .get(
          `${SERVER.BASE_URL}auth/getuser?username=${this.$store.state.Auth.authToken.username}`
        )
        .then((res) => {
          if (this.$store.state.Auth.authToken.id != res.data.id) {
            alert("인증되지 않은 사용자 입니다.");
          }
        })
        .catch((err) => {
          console.error(err);
        });
      if (this.$store.state.Auth.authToken.username != this.author) {
        alert("인증되지 않은 사용자 입니다.");
      } else {
        this.fab = true;
        axios
          .delete(
            `${SERVER.BOARD_BASE_URL}delpost?id=${localStorage.getItem(
              "articleId"
            )}`,
            {
              headers: {
                Authorization:
                  "Bearer " + this.$store.state.Auth.authToken.token,
              },
            }
          )
          .then(() => {
            this.$router.push({ name: localStorage.getItem("page") });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "SDSamliphopangche_Outline";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "S-CoreDream-3Light";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

/* 좋아요 css */
@keyframes likebeat {
  from {
    transform: scale(1);
    color: #fda288;
  }

  to {
    transform: scale(1.3);
    color: #ff8288;
  }
}

.tips {
  position: fixed;
  height: 10%;
  margin: 0;
  padding: 0;
  width: 90px;
  top: 20px;
  right: 80px;
  z-index: 11;
}

.select-like-transition {
  animation-duration: 0.8s;
  animation-name: likebeat;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  cursor: pointer;
}

.like-hover-event:hover {
  color: #ff8288;
  transition: 0.5s;
  transform: scale(1.3);
  cursor: pointer;
}
/* 여기 까지 좋아요 css */

.container {
  position: relative;
  height: 100vh;
  z-index: 1;
}
.container .flux {
  position: relative;
  top: 80px;
}

.user-hover-event-goto-profile:hover {
  color: aliceblue !important;
  transition: 0.5s;
  transform: scale(1.1);
  cursor: pointer;
}

.profile {
  font-family: "S-CoreDream-3Light", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #111111;
  font-weight: bold;
  cursor: default;
}

/* 반응형으로 만듬 */
.adjust-grid-image {
  width: 400px;
  height: 400px;
}

@media (min-width: 800px) {
  .adjust-grid-image {
    width: 600px;
    height: 500px;
  }
}

@media (min-width: 1000px) {
  .adjust-grid-image {
    width: 800px;
    height: 700px;
  }
}

/* 1264px 부터 css코드 */
@media (min-width: 1264px) {
  .adjust-grid-image {
    width: 1000px;
    height: 700px;
  }
}

/* 1600px 부터 css코드 */
@media (min-width: 1500px) {
  .adjust-grid-image {
    width: 1200px;
    height: 700px;
  }
}

/* 1904px 부터 css코드 */
@media (min-width: 1904px) {
  .adjust-grid-image {
    width: 1400px;
    height: 750px;
  }
}

/* TIPS 애니메이션 */
@keyframes tipsbeat {
  from {
    transform: scale(0.95);
  }

  to {
    transform: scale(1.1);
  }
}

.select-tips-transition {
  animation-duration: 0.8s;
  animation-name: tipsbeat;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  cursor: pointer;
}
</style>
