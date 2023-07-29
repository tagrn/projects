<template>
  <v-container>
    <v-row>
      <!-- 북미 -->
      <v-col cols="2">
        <img
          @mouseover="overNorthAmerica"
          @mouseleave="leaveNorthAmerica"
          src="@/assets/worldmap/direction.svg"
          alt="image error"
          @click="gotoNorthAmericaContinent"
          :class="{ 'hoverevent-Continent': true, 'continent-opacity': true }"
          id="north_america-setting-location"
          v-intro="'마커 클릭 시 해당 대륙으로 이동'"
          v-intro-position="'top'"
          v-intro-step="2"
        />
        <v-icon
          :class="{
            'disappeared-north-airplane-icon': !isShowNorthIcon,
            'show-north-airplane-icon': isShowNorthIcon
          }"
        >
          mdi-airplane
        </v-icon>
        <span
          :class="{
            'font-change-continent': true,
            'disappeared-north-america-text': !isShowNorthIcon,
            'show-north-america-text': isShowNorthIcon
          }"
          id="north_america-setting-location"
        >
          North America
        </span>
      </v-col>
      <!-- 남미 -->
      <v-col cols="2">
        <img
          src="@/assets/worldmap/direction.svg"
          alt="image error"
          @click="gotoSouthAmericaContinent"
          class="hoverevent-Continent continent-opacity"
          id="south_america-setting-location"
          @mouseover="overSouthAmerica"
          @mouseleave="leaveSouthAmerica"
        />
        <v-icon
          :class="{
            'disappeared-south-airplane-icon': !isShowSouthIcon,
            'show-south-airplane-icon': isShowSouthIcon
          }"
        >
          mdi-airplane
        </v-icon>
        <span
          :class="{
            'font-change-continent': true,
            'disappeared-south-america-text': !isShowSouthIcon,
            'show-south-america-text': isShowSouthIcon
          }"
          id="south_america-setting-location"
        >
          South America
        </span>
      </v-col>
      <!-- 유럽 -->
      <v-col cols="2">
        <img
          src="@/assets/worldmap/direction.svg"
          alt="image error"
          @click="gotoEuropeContinent"
          class="hoverevent-Continent continent-opacity"
          id="europe-setting-location"
          @mouseover="overEurope"
          @mouseleave="leaveEurope"
        />
        <v-icon
          :class="{
            'disappeared-europe-airplane-icon': !isShowEuropeIcon,
            'show-europe-airplane-icon': isShowEuropeIcon
          }"
        >
          mdi-airplane
        </v-icon>
        <span
          :class="{
            'font-change-continent': true,
            'disappeared-europe-text': !isShowEuropeIcon,
            'show-europe-text': isShowEuropeIcon
          }"
          id="europe-setting-location"
        >
          Europe
        </span>
      </v-col>
      <!-- 아프리카 -->
      <v-col cols="2">
        <img
          src="@/assets/worldmap/direction.svg"
          alt="image error"
          @click="gotoAfricaContinent"
          class="hoverevent-Continent continent-opacity"
          id="africa-setting-location"
          @mouseover="overAfrica"
          @mouseleave="leaveAfrica"
        />
        <v-icon
          :class="{
            'disappeared-africa-airplane-icon': !isShowAfricaIcon,
            'show-africa-airplane-icon': isShowAfricaIcon
          }"
        >
          mdi-airplane
        </v-icon>
        <span
          :class="{
            'font-change-continent': true,
            'disappeared-africa-text': !isShowAfricaIcon,
            'show-africa-text': isShowAfricaIcon
          }"
          id="africa-setting-location"
        >
          Africa
        </span>
      </v-col>
      <!-- 아시아 -->
      <v-col cols="2">
        <img
          src="@/assets/worldmap/direction.svg"
          alt="image error"
          @click="gotoAsiaContinent"
          class="hoverevent-Continent continent-opacity"
          id="asia-setting-location"
          @mouseover="overAsia"
          @mouseleave="leaveAsia"
        />
        <v-icon
          :class="{
            'disappeared-asia-airplane-icon': !isShowAsiaIcon,
            'show-asia-airplane-icon': isShowAsiaIcon
          }"
        >
          mdi-airplane
        </v-icon>
        <span
          :class="{
            'font-change-continent': true,
            'disappeared-asia-text': !isShowAsiaIcon,
            'show-asia-text': isShowAsiaIcon
          }"
          id="asia-setting-location"
        >
          Asia
        </span>
      </v-col>
      <!-- 오세아니아 -->
      <v-col cols="2">
        <img
          src="@/assets/worldmap/direction.svg"
          alt="image error"
          @click="gotoOceaniaContinent"
          class="hoverevent-Continent continent-opacity"
          id="oceania-setting-location"
          @mouseover="overOceania"
          @mouseleave="leaveOceania"
        />
        <v-icon
          :class="{
            'disappeared-oceania-airplane-icon': !isShowOceaniaIcon,
            'show-oceania-airplane-icon': isShowOceaniaIcon
          }"
        >
          mdi-airplane
        </v-icon>
        <span
          :class="{
            'font-change-continent': true,
            'disappeared-oceania-text': !isShowOceaniaIcon,
            'show-oceania-text': isShowOceaniaIcon
          }"
          id="oceania-setting-location"
        >
          Oceania
        </span>
      </v-col>
      <!-- 세계지도 -->
      <v-col class="d-flex justify-center" cols="12">
        <img
          src="@/assets/worldmap/worldmap.svg"
          alt="image error"
          id="worldmap-setting-location"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const sound = new Audio(require("@/assets/audio/airplane.wav"));

export default {
  name: "WorldMapDivision",
  data: function() {
    return {
      isShowNorthIcon: false,
      isShowSouthIcon: false,
      isShowEuropeIcon: false,
      isShowAfricaIcon: false,
      isShowAsiaIcon: false,
      isShowOceaniaIcon: false
    };
  },
  methods: {
    // 각 대륙별로 가기, Refactoring 필요
    gotoEuropeContinent: function() {
      localStorage.setItem("continent", "europe");
      this.$router.push({ name: "EachContinent" });
    },
    gotoAsiaContinent: function() {
      localStorage.setItem("continent", "asia");
      this.$router.push({ name: "EachContinent" });
    },
    gotoAfricaContinent: function() {
      localStorage.setItem("continent", "africa");
      this.$router.push({ name: "EachContinent" });
    },
    gotoNorthAmericaContinent: function() {
      localStorage.setItem("continent", "northAmerica");
      this.$router.push({ name: "EachContinent" });
    },
    gotoSouthAmericaContinent: function() {
      localStorage.setItem("continent", "southAmerica");
      this.$router.push({ name: "EachContinent" });
    },
    gotoOceaniaContinent: function() {
      localStorage.setItem("continent", "oceania");
      this.$router.push({ name: "EachContinent" });
    },
    // 대륙별 아이콘 후버
    // 북미
    overNorthAmerica: function() {
      sound.play();
      this.isShowNorthIcon = true;
    },
    leaveNorthAmerica: function() {
      sound.pause();
      sound.currentTime = 0;
      this.isShowNorthIcon = false;
    },
    // 남미
    overSouthAmerica: function() {
      sound.play();
      this.isShowSouthIcon = true;
    },
    leaveSouthAmerica: function() {
      sound.pause();
      sound.currentTime = 0;
      this.isShowSouthIcon = false;
    },
    // 유럽
    overEurope: function() {
      sound.play();
      this.isShowEuropeIcon = true;
    },
    leaveEurope: function() {
      sound.pause();
      sound.currentTime = 0;
      this.isShowEuropeIcon = false;
    },
    // 아프리카
    overAfrica: function() {
      sound.play();
      this.isShowAfricaIcon = true;
    },
    leaveAfrica: function() {
      sound.pause();
      sound.currentTime = 0;
      this.isShowAfricaIcon = false;
    },
    // 아시아
    overAsia: function() {
      sound.play();
      this.isShowAsiaIcon = true;
    },
    leaveAsia: function() {
      sound.pause();
      sound.currentTime = 0;
      this.isShowAsiaIcon = false;
    },
    // 오세아니아
    overOceania: function() {
      sound.play();
      this.isShowOceaniaIcon = true;
    },
    leaveOceania: function() {
      sound.pause();
      sound.currentTime = 0;
      this.isShowOceaniaIcon = false;
    }
  }
};
</script>

<style scoped>
/* 텍스트 색 바뀌는 애니메이션 */
@keyframes lighttextparty {
  from {
    color: whitesmoke;
  }

  to {
    color: grey;
  }
}

/* 대륙 위치 */
.continent-opacity {
  width: 10px;
  margin-top: 20%;
}

/* 폰트 체인지 */
.font-change-continent {
  font-family: "TmoneyRoundWindRegular";
  font-size: 12px;
  color: #000000;
}

/* 마우스를 올리면 보이는 상태로 바꿈 */
.hoverevent-Continent:hover {
  opacity: 1;
  transform: scale(7.5) !important;
  transition: 250ms;
  cursor: pointer;
}

/* 960px부터 클릭 가능 960px 밑으로는 새로 더 작성해야 된다. */
#worldmap-setting-location {
  width: 800px;
}

/* 북미: 비행기 애니메이션 */
.disappeared-north-airplane-icon {
  opacity: 0;
  transition-duration: 2s;
  transform: translateX(-40px) translateY(140px) rotate(100deg) scale(4);
  cursor: pointer;
}
.show-north-airplane-icon {
  opacity: 1;
  transition-duration: 5s;
  transform: translateX(200px) translateY(200px) rotate(100deg) scale(1.3);
}

/* 북미: 텍스트 애니메이션 */
.disappeared-north-america-text {
  opacity: 1;
  transition-duration: 2s;
  transform: translateX(0px) translateY(200px) rotate(100deg);
  cursor: default;
}

.show-north-america-text {
  animation-duration: 0.8s;
  animation-name: lighttextparty;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

/* 북미: 위치 */
#north_america-setting-location {
  position: relative;
  transform: scale(5);
  top: 205px;
  right: -260px;
}

/* 남미: 비행기 애니메이션 */
.disappeared-south-airplane-icon {
  opacity: 0;
  transition-duration: 2s;
  transform: translateX(-130px) translateY(270px) rotate(100deg) scale(4);
}
.show-south-airplane-icon {
  opacity: 1;
  transition-duration: 5s;
  transform: translateX(110px) translateY(330px) rotate(100deg) scale(1.3);
}

/* 남미: 텍스트 애니메이션 */
.disappeared-south-america-text {
  opacity: 1;
  transition-duration: 2s;
  transform: translateX(-170px) translateY(410px) rotate(100deg);
  cursor: default;
}

.show-south-america-text {
  animation-duration: 0.8s;
  animation-name: lighttextparty;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

/* 남미: 위치 */
#south_america-setting-location {
  position: relative;
  transform: scale(5);
  top: 325px;
  right: -170px;
}

/* 유럽: 비행기 애니메이션 */
.disappeared-europe-airplane-icon {
  opacity: 0;
  transition-duration: 2s;
  transform: translateX(-150px) translateY(140px) rotate(100deg) scale(4);
}
.show-europe-airplane-icon {
  opacity: 1;
  transition-duration: 5s;
  transform: translateX(90px) translateY(200px) rotate(100deg) scale(1.3);
}

/* 유럽: 텍스트 애니메이션 */
.disappeared-europe-text {
  opacity: 1;
  transition-duration: 2s;
  transform: translateX(-230px) translateY(195px) rotate(100deg);
  cursor: default;
}

.show-europe-text {
  animation-duration: 0.8s;
  animation-name: lighttextparty;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

/* 유럽: 위치 */
#europe-setting-location {
  position: relative;
  transform: scale(5);
  top: 200px;
  right: -150px;
}

/* 아프리카: 비행기 애니메이션 */
.disappeared-africa-airplane-icon {
  opacity: 0;
  transition-duration: 2s;
  transform: translateX(-295px) translateY(230px) rotate(100deg) scale(4);
}
.show-africa-airplane-icon {
  opacity: 1;
  transition-duration: 5s;
  transform: translateX(-55px) translateY(290px) rotate(100deg) scale(1.3);
}

/* 아프리카: 텍스트 애니메이션 */
.disappeared-africa-text {
  opacity: 1;
  transition-duration: 2s;
  transform: translateX(-540px) translateY(340px) rotate(100deg);
  cursor: default;
}

.show-africa-text {
  animation-duration: 0.8s;
  animation-name: lighttextparty;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

/* 아프리카: 위치 */
#africa-setting-location {
  position: relative;
  transform: scale(5);
  top: 290px;
  right: -5px;
}

/* 아시아: 비행기 애니메이션 */
.disappeared-asia-airplane-icon {
  opacity: 0;
  transition-duration: 2s;
  transform: translateX(-320px) translateY(130px) rotate(100deg) scale(4);
}
.show-asia-airplane-icon {
  opacity: 1;
  transition-duration: 5s;
  transform: translateX(-80px) translateY(190px) rotate(100deg) scale(1.3);
}

/* 아시아: 텍스트 애니메이션 */
.disappeared-asia-text {
  opacity: 1;
  transition-duration: 2s;
  transform: translateX(-600px) translateY(170px) rotate(100deg);
  cursor: default;
}

.show-asia-text {
  animation-duration: 0.8s;
  animation-name: lighttextparty;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

/* 아시아: 위치 */
#asia-setting-location {
  position: relative;
  transform: scale(5);
  top: 190px;
  right: 20px;
}

/* 오세아니아: 비행기 애니메이션 */
.disappeared-oceania-airplane-icon {
  opacity: 0;
  transition-duration: 2s;
  transform: translateX(-425px) translateY(280px) rotate(100deg) scale(4);
}
.show-oceania-airplane-icon {
  opacity: 1;
  transition-duration: 5s;
  transform: translateX(-185px) translateY(340px) rotate(100deg) scale(1.3);
}

/* 오세아니아: 텍스트 애니메이션 */
.disappeared-oceania-text {
  opacity: 1;
  transition-duration: 3s;
  transform: translateX(-2000px) translateY(450px) rotate(100deg);
  cursor: default;
}

.show-oceania-text {
  animation-duration: 0.8s;
  animation-name: lighttextparty;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

/* 오세아니아: 위치 */
#oceania-setting-location {
  position: relative;
  transform: scale(5);
  top: 340px;
  right: 120px;
}

/* 1264px 부터 css코드 */
@media (min-width: 1264px) {
  /* 폰트 체인지 */
  .font-change-continent {
    font-family: "TmoneyRoundWindRegular";
    font-size: 16px;
    color: #000000;
  }

  #worldmap-setting-location {
    width: 1200px;
  }

  .continent-opacity {
    width: 10px;
    margin-top: 20%;
  }

  /* 북미: 비행기 애니메이션 */
  .disappeared-north-airplane-icon {
    opacity: 0;
    transition-duration: 2s;
    transform: translateX(-150px) translateY(160px) rotate(100deg) scale(4);
    cursor: pointer;
  }
  .show-north-airplane-icon {
    opacity: 1;
    transition-duration: 5s;
    transform: translateX(250px) translateY(260px) rotate(100deg) scale(1.3);
  }

  /* 북미: 위치 */
  #north_america-setting-location {
    position: relative;
    transform: scale(6);
    top: 280px;
    right: -320px;
  }

  /* 남미: 비행기 애니메이션 */
  .disappeared-south-airplane-icon {
    opacity: 0;
    transition-duration: 2s;
    transform: translateX(-340px) translateY(340px) rotate(100deg) scale(4);
  }
  .show-south-airplane-icon {
    opacity: 1;
    transition-duration: 5s;
    transform: translateX(140px) translateY(440px) rotate(100deg) scale(1.3);
  }

  /* 남미: 위치 */
  #south_america-setting-location {
    position: relative;
    transform: scale(6);
    top: 460px;
    right: -210px;
  }

  /* 유럽: 비행기 애니메이션 */
  .disappeared-europe-airplane-icon {
    opacity: 0;
    transition-duration: 2s;
    transform: translateX(-250px) translateY(150px) rotate(100deg) scale(4);
  }
  .show-europe-airplane-icon {
    opacity: 1;
    transition-duration: 5s;
    transform: translateX(150px) translateY(250px) rotate(100deg) scale(1.3);
  }

  /* 유럽: 위치 */
  #europe-setting-location {
    position: relative;
    transform: scale(6);
    top: 270px;
    right: -220px;
  }

  /* 아프리카: 비행기 애니메이션 */
  .disappeared-africa-airplane-icon {
    opacity: 0;
    transition-duration: 2s;
    transform: translateX(-460px) translateY(280px) rotate(100deg) scale(4);
  }
  .show-africa-airplane-icon {
    opacity: 1;
    transition-duration: 5s;
    transform: translateX(-60px) translateY(380px) rotate(100deg) scale(1.3);
  }

  /* 아프리카: 위치 */
  #africa-setting-location {
    position: relative;
    transform: scale(6);
    top: 400px;
    right: -10px;
  }

  /* 아시아: 비행기 애니메이션 */
  .disappeared-asia-airplane-icon {
    opacity: 0;
    transition-duration: 2s;
    transform: translateX(-480px) translateY(150px) rotate(100deg) scale(4);
  }
  .show-asia-airplane-icon {
    opacity: 1;
    transition-duration: 5s;
    transform: translateX(-80px) translateY(250px) rotate(100deg) scale(1.3);
  }

  /* 아시아: 위치 */
  #asia-setting-location {
    position: relative;
    transform: scale(6);
    top: 270px;
    right: 10px;
  }

  /* 오세아니아: 비행기 애니메이션 */
  .disappeared-oceania-airplane-icon {
    opacity: 0;
    transition-duration: 2s;
    transform: translateX(-600px) translateY(360px) rotate(100deg) scale(4);
  }
  .show-oceania-airplane-icon {
    opacity: 1;
    transition-duration: 5s;
    transform: translateX(-200px) translateY(460px) rotate(100deg) scale(1.3);
  }

  /* 오세아니아: 위치 */
  #oceania-setting-location {
    position: relative;
    transform: scale(6);
    top: 485px;
    right: 125px;
  }
}

/* 1904px 부터 css코드 */
@media (min-width: 1904px) {
  .font-change-continent {
    font-family: "TmoneyRoundWindRegular";
    font-size: 20px;
    color: #000000;
  }

  #worldmap-setting-location {
    width: 1450px;
  }

  .continent-opacity {
    width: 10px;
  }

  /* 북미: 비행기 애니메이션 */
  .disappeared-north-airplane-icon {
    opacity: 0;
    transition-duration: 2s;
    transform: translateX(0px) translateY(200px) rotate(100deg) scale(4);
    cursor: pointer;
  }
  .show-north-airplane-icon {
    opacity: 1;
    transition-duration: 5s;
    transform: translateX(480px) translateY(320px) rotate(100deg) scale(1.3);
  }

  /* 북미: 위치 */
  #north_america-setting-location {
    position: relative;
    transform: scale(6);
    top: 350px;
    right: -550px;
  }

  /* 남미: 비행기 애니메이션 */
  .disappeared-south-airplane-icon {
    opacity: 0;
    transition-duration: 2s;
    transform: translateX(-170px) translateY(410px) rotate(100deg) scale(4);
  }
  .show-south-airplane-icon {
    opacity: 1;
    transition-duration: 5s;
    transform: translateX(310px) translateY(530px) rotate(100deg) scale(1.3);
  }

  /* 남미: 위치 */
  #south_america-setting-location {
    position: relative;
    transform: scale(6);
    top: 560px;
    right: -380px;
  }

  /* 유럽: 비행기 애니메이션 */
  .disappeared-europe-airplane-icon {
    opacity: 0;
    transition-duration: 2s;
    transform: translateX(-230px) translateY(195px) rotate(100deg) scale(4);
  }
  .show-europe-airplane-icon {
    opacity: 1;
    transition-duration: 5s;
    transform: translateX(250px) translateY(315px) rotate(100deg) scale(1.3);
  }

  /* 유럽: 위치 */
  #europe-setting-location {
    position: relative;
    transform: scale(6);
    top: 345px;
    right: -320px;
  }

  /* 아프리카: 비행기 애니메이션 */
  .disappeared-africa-airplane-icon {
    opacity: 0;
    transition-duration: 2s;
    transform: translateX(-540px) translateY(340px) rotate(100deg) scale(4);
  }
  .show-africa-airplane-icon {
    opacity: 1;
    transition-duration: 5s;
    transform: translateX(-60px) translateY(460px) rotate(100deg) scale(1.3);
  }

  /* 아프리카: 위치 */
  #africa-setting-location {
    position: relative;
    transform: scale(6);
    top: 490px;
    right: -10px;
  }

  /* 아시아: 비행기 애니메이션 */
  .disappeared-asia-airplane-icon {
    opacity: 0;
    transition-duration: 2s;
    transform: translateX(-600px) translateY(170px) rotate(100deg) scale(4);
  }
  .show-asia-airplane-icon {
    opacity: 1;
    transition-duration: 5s;
    transform: translateX(-120px) translateY(290px) rotate(100deg) scale(1.3);
  }

  /* 아시아: 위치 */
  #asia-setting-location {
    position: relative;
    transform: scale(6);
    top: 320px;
    right: 50px;
  }

  /* 오세아니아: 비행기 애니메이션 */
  .disappeared-oceania-airplane-icon {
    opacity: 0;
    transition-duration: 2s;
    transform: translateX(-800px) translateY(450px) rotate(100deg) scale(4);
  }
  .show-oceania-airplane-icon {
    opacity: 1;
    transition-duration: 5s;
    transform: translateX(-320px) translateY(570px) rotate(100deg) scale(1.3);
  }

  /* 오세아니아: 위치 */
  #oceania-setting-location {
    position: relative;
    transform: scale(6);
    top: 600px;
    right: 250px;
  }
}
</style>
