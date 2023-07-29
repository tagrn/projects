<template>
  <!-- 월드맵 배경 추가 -->
  <v-container
    fluid
    ma-0
    pa-0
    fill-height
    :style="{
      'background-image':
        'url(' + require('@/assets/main/NUVOchangeColorShallow.png') + ')',
      'background-position': 'center',
    }"
  >
    <v-row align="center" justify="center">
      <!-- 월드 맵으로 가는 버튼 -->
      <v-col cols="6" md="3">
        <div style="text-align:center">
          <img
            src="@/assets/worldmap/worldmap.svg"
            alt=""
            :class="{
              'disappeared-hidden-map-icon': !isShowMapIcon,
              'show-hidden-map-icon': isShowMapIcon,
            }"
            width="170px"
            height="150px"
          />
          <v-icon
            :class="{
              'disappeared-airplane-icon': !isShowMapIcon,
              'show-airplane-icon': isShowMapIcon,
            }"
          >
            mdi-airplane
          </v-icon>
        </div>
        <div
          style="text-align:center;"
          v-intro="'NUVO 지도로 보기'"
          v-intro-tooltip-class="'red-bg'"
          v-intro-position="'top'"
          v-intro-step="1"
        >
          <img
            src="@/assets/main/world.png"
            alt=""
            width="200px"
            height="200px"
            style="padding: 10px 24px 5px 24px; border:3px solid; border-radius:10px; color:#7e675e;"
            :class="{ 'disappeared-map-icon': isShowMapIcon }"
            @mouseover="disappearMapIcon"
            @mouseleave="showMapIcon"
            @click="gotoWorldMap"
          />

          <v-icon style="opacity:0;">
            mdi-airplane
          </v-icon>
        </div>
      </v-col>
      <v-col cols="6" class="is-show-tips">
        <!-- 누보 뜻 보여주기 -->
        <NUVOExplanation />
        <!-- 버튼 설명 -->
        <v-container>
          <v-row>
            <v-col cols="6">
              <WorldMapExplanation />
            </v-col>
            <v-col cols="6">
              <VRExplanation />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <!-- VR로 가는 버튼 -->
      <v-col cols="6" md="3">
        <div style="text-align:center">
          <img
            src="@/assets/main/VR360Icon.png"
            alt=""
            width="150px"
            :class="{
              'disappeared-hidden-VR-icon': !isShowVRIcon,
              'show-hidden-VR-icon-bg': isShowVRIcon,
              'show-hidden-VR-icon': isShowVRIcon,
            }"
          />
        </div>
        <div
          style="text-align:center;"
          v-intro="'VR 전시관으로 이동'"
          v-intro-position="'top'"
          v-intro-step="2"
        >
          <img
            src="@/assets/main/VRIcon.png"
            alt=""
            width="200px"
            height="200px"
            style="padding: 35px 12px 35px 12px; border:3px solid; border-radius:10px; color:#7e675e;"
            :class="{ 'disappeared-VR-icon': isShowVRIcon }"
            @mouseover="disappearVRIcon"
            @mouseleave="showVRIcon"
            @click="overlay = true"
          />
        </div>
      </v-col>

      <!-- 남는 공간 offset -->
      <v-col cols="2"> </v-col>
    </v-row>
    <!-- 오른쪽 상단 Tips 픽스 -->
    <!-- <div
      style="
              position: fixed;
              height: 10%;
              margin: 0;
              padding: 0;
              width: 100px;
              top: 15px;
              right: 50px;
              z-index: 101;
            "
    >
      <img
        src="@/assets/3DHelp3.png"
        alt=""
        width="80px"
        :class="{ 'select-tips-transition': isSelectTips }"
        @mouseover="isSelectTips = true"
        @mouseleave="isSelectTips = false"
        @click="activeIntro"
      />
    </div>
<<<<<<< HEAD
 VR 오버레이 페이지 -->
    <v-overlay :fixed="true" :opacity="0.9" :value="overlay">
      <div style="text-align:center;">
        <v-btn color="#DDA288" @click="gotoFirstExhibition" style="color:white">
          첫 번째 전시관
        </v-btn>
      </div>
      <br /><br /><br />
      <div style="text-align:center;">
        <v-btn
          color="#DDA288"
          @click="gotoSecondExhibition"
          style="color:white"
        >
          두 번째 전시관
        </v-btn>
      </div>
      <br /><br /><br />
      <div style="text-align:center;">
        <v-btn color="#DDA288" @click="overlay = false" style="color:white">
          돌아가기
        </v-btn>
      </div>
    </v-overlay>
  </v-container>
</template>

<script>
import NUVOExplanation from "@/components/showTips/NUVOExplanation.vue";
import WorldMapExplanation from "@/components/showTips/WorldMapExplanation.vue";
import VRExplanation from "@/components/showTips/VRExplanation.vue";

export default {
  name: "Main",
  components: {
    NUVOExplanation,
    WorldMapExplanation,
    VRExplanation,
  },
  data: function() {
    return {
      isShowMapIcon: false,
      isShowVRIcon: false,
      isSelectTips: false,
      overlay: false,
    };
  },
  methods: {
    // 월드 맵으로 가는 버튼 액션
    gotoWorldMap: function() {
      this.$router.push({ name: "WorldMap" });
    },

        // VR 전시관으로 감.
    gotoFirstExhibition: function() {
      open("https://hubs.mozilla.com/scenes/VkhFoTD");
    },
    gotoSecondExhibition: function() {
      open("https://hubs.mozilla.com/scenes/hG7nZSY");
    },

    // 맵 아이콘 애니메이션
    disappearMapIcon: function() {
      this.isShowMapIcon = true;
    },
    showMapIcon: function() {
      this.isShowMapIcon = false;
    },

    // VR 아이콘 애니메이션
    disappearVRIcon: function() {
      this.isShowVRIcon = true;
    },
    showVRIcon: function() {
      this.isShowVRIcon = false;
    },
    activeIntro() {
      this.$intro().start(); // start the guide
      this.$intro().showHints(); // show hints
    },
  },
};
</script>

<style scoped>
.is-show-tips {
  display: none;
}

@media (min-width: 960px) {
  .is-show-tips {
    display: inline;
  }
}

/* 티머니 폰트체인지 CSS */
.font-change-tmoneyroundwindregular {
  font-family: "TmoneyRoundWindRegular";
}

/* 월드맵 아이콘 트랜지션 */
.disappeared-map-icon {
  opacity: 0.5;
  color: white;
  transition-delay: 0;
  transition-duration: 0.5s;
  transform: scale(1.05);
  cursor: pointer;
}

.disappeared-hidden-map-icon {
  opacity: 0;
  transition-delay: 0;
  transition-duration: 1s;
  transform: translateY(100px) rotate3d(0, 1, 0, 70deg);
  cursor: pointer;
}

.show-hidden-map-icon {
  opacity: 1;
  transition-delay: 0;
  transition-duration: 1s;
  cursor: pointer;
}

/* 비행기 이동 트랜지션 */
.disappeared-airplane-icon {
  opacity: 0;
  transition-duration: 2s !important;
  transform: translateX(-400px) translateY(-80px) rotate(90deg);
  cursor: pointer;
}

.show-airplane-icon {
  opacity: 1;
  transition-duration: 3s !important;
  transform: translateX(20px) translateY(-80px) rotate(90deg) scale(1.3);
}

/* VR 아이콘 트랜지션 */
.disappeared-VR-icon {
  opacity: 0.5;
  color: white;
  transition-delay: 0;
  transition-duration: 0.5s;
  transform: scale(1.05);
  cursor: pointer;
}

.disappeared-hidden-VR-icon {
  opacity: 0;
  transition-delay: 0;
  transition-duration: 1s;
  transform: translateY(100px) rotate3d(0, 1, 0, 90deg);
  cursor: pointer;
}

.show-hidden-VR-icon {
  opacity: 1;
  transition-delay: 0;
  transition-duration: 0.5s;
  color: #333333;
  cursor: pointer;
}

/* VR 불빛 애니메이션 */
@keyframes lightparty {
  from {
    background-image: url("../assets/main/light.png");
    background-position: center 53%;
    background-size: 5px;
  }

  to {
    background-image: url("../assets/main/light_bg.png");
    background-position: center 53%;
    background-size: 135px;
  }
}

.show-hidden-VR-icon-bg {
  animation-duration: 0.8s;
  animation-name: lightparty;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

/* 배경 화면 흐릿하게 */
.opacity-just-background {
  width: 100%;
  height: 100%;
  content: "";
  background-position: "center";
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
