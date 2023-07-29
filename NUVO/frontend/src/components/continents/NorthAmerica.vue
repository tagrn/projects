<template>
  <v-container>
    <br />
    <br />
    <v-row>
      <!-- 반응형 점찍기 // 밑에서 좌표만 설정해주면 찍어줌(백에서 받아오면 됨.) -->
      <v-col cols="1" xl="2">
        <div class="continent-scale" style="position:relative; left:100%; ">
          <img
            src="@/assets/continents/popularFlag.png"
            v-for="(item, idx) in popularDistrict"
            :key="'A' + idx"
            :class="{
              'adjust-location': true,
              'transition-circle-icon': true,
              'transition-select-location': overCircleIcon[idx]
            }"
            :style="
              'top:' +
                popularLocationY[idx] +
                '%;' +
                'left:' +
                adjustLocationX[idx] +
                '%; cursor: pointer; z-index:2;'
            "
            @click="selectLocation(idx)"
          />
          <div
            v-for="(item, idx) in popularLocationNames"
            :key="idx"
            :class="{
              'adjust-location-text': true,
              'transition-location-text': overCircleIcon[idx]
            }"
            :style="
              'top:' +
                adjustLocationNamesY[idx] +
                '%;' +
                'left:' +
                adjustLocationNamesX[idx] +
                '%; cursor:default;'
            "
          >
            {{ popularLocationNames[idx] }}
          </div>
        </div>
      </v-col>

      <!-- 지도 보여주기 -->
      <v-col cols="6">
        <div>
          <img
            src="@/assets/continents/north_america.svg"
            alt="image error"
            class="continent-scale"
          />
        </div>
      </v-col>
      <v-col
        offset-md="1"
        md="4"
        offset-xl="0"
        xl="4"
        class="d-flex justify-center align-center"
      >
        <div style="min-width:80px;"></div>
        <ContinentCard
          :exhibitionImage="exhibitionImage"
          :exhibitionContent="exhibitionContent"
          :exhibitionLocation="exhibitionLocation"
          :likeCount="likeCount"
          :exhibitionIndex="exhibitionIndex"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ContinentCard from "@/components/continents/ContinentCard";
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

export default {
  name: "NorthAmerica",
  components: {
    ContinentCard
  },
  data: function() {
    return {
      popularDistrict: [0, -5, -10, -15, -20],
      popularLocationNames: [
        "뉴욕",
        "플로리다",
        "라스베가스",
        "샌프란시스코",
        "그린란드"
      ],
      // 여기에 X, Y축의 크기만 안다면 지도에 표시 가능.
      // 데이터를 받아올 예정
      popularLocationX: [62, 58.5, 40, 33.5, 82],
      popularLocationY: [70, 80, 74, 69, 43],
      // 여기로 데이터 가져오기 - 배열형식으로 가져와야 함. 아니면 딕셔너리형태로
      exhibitionImage: require("@/assets/continents/NA.jpg"),
      exhibitionContent: [
        "미국",
        "뉴욕",
        "플로리다",
        "올란도",
        "유니버셜",
        "키웨스트",
        "라스베가스",
        "샌프란시스코",
        "그린란드"
      ],
      exhibitionLocation: "깃발을 클릭해 보세요",
      exhibitionIndex: -1,
      likeCount: 379,
      // 고른곳 확인
      locationIdx: 0,
      overCircleIcon: [false, false, false, false, false],
      NAList: [27, 30, 28, 29, 31]
    };
  },
  props: {
    images: [Array],
    tags: [Array],
    likes: [Array],
    locations: [Array],
    indexs: [Array]
  },

  computed: {
    // Y축 보정하기
    // 재사용을 위한 코드
    adjustLocationX: function() {
      const array = [1, 2, 3, 4, 5];
      for (let index = 0; index < array.length; index++) {
        array[index] =
          this.popularLocationX[index] + this.popularDistrict[index];
      }
      return array;
    },
    // 이름 X, Y축 보정
    adjustLocationNamesY: function() {
      const array = [1, 2, 3, 4, 5];
      for (let index = 0; index < array.length; index++) {
        array[index] =
          this.popularLocationY[index] + this.popularDistrict[index];
        if (index == 0) {
          array[index] = array[index] - 6;
        }
        if (index == 3) {
          array[index] = array[index] - 7;
        }
      }
      return array;
    },
    adjustLocationNamesX: function() {
      const array = [1, 2, 3, 4, 5];
      for (let index = 0; index < array.length; index++) {
        array[index] = this.popularLocationX[index] - 1;
        if (index == 0) {
          array[index] = array[index] + 7;
        }
        if (index == 3) {
          array[index] = array[index] + 7;
        }
      }
      return array;
    }
  },
  methods: {
    // 클릭하면 데이터 불러오기
    selectLocation: function(idx) {
      const location = localStorage.getItem("continent");
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}getposts?id=${this.NAList[idx]}&username=${this.$store.state.Auth.authToken.username}`
        )
        .then(response => {
          this.exhibitionImage = response.data.filePath;
          this.exhibitionLocation = response.data.board.nation;
          const tmp = [];
          for (let idx = 0; idx < response.data.tags.length; idx++) {
            tmp.push(response.data.tags[idx].tag);
          }
          this.exhibitionContent = tmp;
          this.exhibitionIndex = response.data.board.id;
          this.likeCount = response.data.board.good;
        })
        .catch(err => {
          console.error(err);
        });
      this.overCircleIcon = [false, false, false, false, false];
      this.overCircleIcon[idx] = true;
    }
  }
};
</script>

<style scoped>
/* 텍스트 색 바뀌는 애니메이션 */
@keyframes lighttext {
  from {
    color: whitesmoke;
  }

  to {
    color: grey;
  }
}

.transition-location-text {
  animation-duration: 0.8s;
  animation-name: lighttext;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.transition-select-location {
  transform: scale(1.3);
  transition: 0.3s;
}

.transition-circle-icon:hover {
  transform: scale(1.2);
  transition: 0.3s;
}

/* 지도의 크기와 위치 반응형으로 만듬 */
.adjust-location {
  position: relative;
  width: 25px;
}
.adjust-location-text {
  position: relative;
  font-family: "TmoneyRoundWindRegular";
  line-height: 24px;
  font-size: 15px;
}
.continent-scale {
  height: 500px;
  width: 500px;
}

@media (min-width: 1264px) {
  .adjust-location {
    position: relative;
    width: 30px;
  }
  .adjust-location-text {
    position: relative;
    font-family: "TmoneyRoundWindRegular";
    line-height: 28px;
    font-size: 15px;
  }
  .continent-scale {
    height: 600px;
    width: 600px;
  }
}

@media (min-width: 1904px) {
  .adjust-location {
    position: relative;
    width: 40px;
  }
  .adjust-location-text {
    position: relative;
    font-family: "TmoneyRoundWindRegular";
    line-height: 38px;
    font-size: 15px;
  }
  .continent-scale {
    height: 800px;
    width: 800px;
  }
}
</style>
