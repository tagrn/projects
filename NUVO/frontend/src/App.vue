<template>
  <!-- 컬러는 수요일날 회의 후 바꿀 예정 -->
  <v-app style="background-color: #5a4e4d; width:100%; min-height:100%">
    <!-- 왼쪽 상단 로고 픽스 -->
    <div
      v-if="windowWidth < 500 || windowHeight < 450"
      style="
                position: fixed;
                height: 10%;
                margin: 0;
                padding: 0;
                width: 100px;
                top: 30px;
                left: 30px;
                z-index: 100;
            "
    >
      <img
        src="@/assets/main/NUVOchangeColor.png"
        alt=""
        width="100px"
        @click="gotoHome"
      />
    </div>
    <div
      v-else
      style="
                position: fixed;
                height: 10%;
                margin: 0;
                padding: 0;
                width: 100px;
                top: 30px;
                left: 30px;
                z-index: 100;
            "
    >
      <img
        src="@/assets/main/NUVOchangeColor.png"
        alt=""
        width="120px"
        class="hoverevent-Button"
        @click="gotoHome"
      />
    </div>

    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data: function() {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  },
  methods: {
    gotoHome: function() {
      this.$router.push({ name: "Home" });
    }
  }
});
</script>

<style lang="scss">
@import "../src/assets/style.scss";

/* 눈누에서 폰트 가져옴 */
@font-face {
  font-family: "TmoneyRoundWindRegular";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/TmoneyRoundWindRegular.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
* {
  box-sizing: border-box;
}

/* 버튼 후버 처리 */
/* 쓰실 후버가 있다면 쓰시면 됩니다. */
.hoverevent-Button:hover {
  transform: scale(1.07);
  transition: 400ms;
  cursor: pointer;
}

/* 애니메이션 진입 및 진출은 다른 지속 시간 및  */
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}

.tag-hover-event-class:hover {
  transition: 0.5s;
  transform: scale(1.06);
  opacity: 0.8;
}
</style>
