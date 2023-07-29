<template>
  <div
    style="width:100%; height:100%;"
    class="d-flex justify-center align-center"
  >
    <transition name="fade">
      <img v-if="show" :src="`${vfImages[imageIndex]}`" alt="" width="90%" />
    </transition>
    <div
      style="position:fixed; left:0px; height:100%; width:50%;"
      @click="lefttoImage"
    ></div>
    <div
      style="position:fixed; right:0px; height:100%; width:50%;"
      @click="righttoImage"
    ></div>
    <v-overlay :fixed="absolute" :value="firstOverlay">
      <v-btn color="#DDA288" @click="firstOverlay = false">
        첫번째 사진입니다
      </v-btn>
    </v-overlay>
    <v-overlay :fixed="absolute" :value="lastOverlay">
      <v-btn color="#DDA288" @click="lastOverlay = false">
        마지막 사진입니다
      </v-btn>
    </v-overlay>
    <!-- 사진 목록으로 가는 버튼 -->
    <v-btn
      elevation="3"
      fab
      color="#DDA288"
      style="position:fixed; bottom:43px; right:43px; color:white;"
      @click="clickGotoBack"
    >
      <v-icon>
        mdi-view-carousel-outline
      </v-icon>
    </v-btn>
    <!-- VR 페이지로 가는 버튼 -->
    <v-badge
      avatar
      bordered
      overlap
      style="position:fixed; bottom:43px; right:120px; color:white; z-index: 101;"
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
      style="position:fixed; bottom:43px; right:120px; color:white; z-index: 101;"
      @click="clickGotoVR"
    >
      <span style="font-size:22px">VR</span>
    </v-btn>
    <v-overlay :fixed="true" :value="checkPayment" :opacity="0.8">
      <div class="d-flex justify-center" style="font-size: 18px;">
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
  </div>
</template>

<script>
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

export default {
  name: "MobileView",
  data: function() {
    return {
      imageIndex: 0,
      absolute: true,
      firstOverlay: false,
      lastOverlay: false,
      show: true,
      checkPayment: false
    };
  },
  props: {
    vfImages: [Array],
    premium: [Boolean, String]
  },
  methods: {
    righttoImage: function() {
      if (this.imageIndex < this.vfImages.length - 1) {
        this.imageIndex = this.imageIndex + 1;
        this.show = !this.show;
        setTimeout(() => {
          this.show = !this.show;
        }, 500);
      } else {
        this.lastOverlay = true;
      }
    },
    lefttoImage: function() {
      if (this.imageIndex > 0) {
        this.imageIndex = this.imageIndex - 1;
        this.show = !this.show;
        setTimeout(() => {
          this.show = !this.show;
        }, 500);
      } else {
        this.firstOverlay = true;
      }
    },
    clickGotoBack: function() {
      this.$router.push({ name: "EachWaterfall" });
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
                  "Bearer " + this.$store.state.Auth.authToken.token
              }
            }
          )
          .then(res => {
            if (res.data == true) {
              this.$router.push({ name: "Aframe" });
            } else {
              this.checkPayment = true;
            }
          })
          .catch(err => {
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
              Authorization: "Bearer " + this.$store.state.Auth.authToken.token
            }
          }
        )
        .then(() => {
          this.$router.push({ name: "Aframe" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkWallet: function() {
      axios
        .get(
          `${SERVER.BASE_URL}auth/getuser?username=${this.$store.state.Auth.authToken.username}`
        )
        .then(res => {
          if (res.data.money > 2) {
            this.payCointoAuthor();
          } else {
            alert("코인이 부족합니다. 결제페이지로 이동합니다.");
            this.$router.push({ name: "Pay" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
