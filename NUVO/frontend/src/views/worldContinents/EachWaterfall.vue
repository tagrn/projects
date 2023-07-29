<template>
  <v-main>
    <div v-if="windowWidth < 500 || windowHeight < 450">
      <v-app-bar fixed height="90px;" color="#5a4e4d" elevation="0">
      </v-app-bar>
      <br />
    </div>

    <SideNavBar v-if="windowWidth > 500 && windowHeight > 450" />

    <!-- 월드맵 돌아가기 -->
    <v-btn
      v-if="windowWidth > 500 && windowHeight > 450"
      elevation="6"
      fab
      color="orange darken-3"
      style="position:fixed; right:20px; top:100px; color:white;"
      @click="goToWorldmap"
    >
      <v-icon>
        mdi-map-search
      </v-icon>
    </v-btn>

    <!-- 게시물 작성 페이지로 가는 버튼 -->
    <v-btn
      v-if="windowWidth > 500 && windowHeight > 450"
      elevation="3"
      fab
      color="#DDA288"
      style="position:fixed; right:95px; top:20px; color:white; z-index: 2;"
      @click="clickGotoCreate"
    >
      <v-icon>
        mdi-image-plus
      </v-icon>
    </v-btn>

    <!-- 각 대륙맵 및 인기 전시 카드 페이지로 돌아가는 버튼 -->
    <v-btn
      v-if="windowWidth > 500 && windowHeight > 450"
      elevation="3"
      fab
      color="#DDA288"
      style="position:fixed; right:20px; top:20px; color:white; z-index: 2;"
      @click="clickChangeContinentViewButton"
    >
      <span v-if="popularExhibition"> ALL </span>
      <v-icon v-else>
        mdi-star
      </v-icon>
    </v-btn>

    <!-- 검색 버튼 및 입력창 -->
    <div
      v-if="isSelectSearch && windowWidth > 500"
      style="
              position: fixed;
              height: 50px;
              margin: 0;
              padding: 0;
              width: 300px;
              top: 23px;
              right: 170px;
              transition:0.5s;
              z-index: 1;
              background-color:#DDA288;
              border-radius: 3px;
            "
    ></div>
    <div
      v-if="isSelectSearch && windowWidth > 500"
      style="position:fixed;
              width: 270px;
              top: 16px;
              right: 185px;
              z-index: 2;
              color:white;
            "
    >
      <div class="d-flex align-start justify-center">
        <v-text-field
          v-model="searchData"
          color="white"
          placeholder="장소나 태그를 입력하세요."
          append-outer-icon="mdi-airplane-takeoff"
          @keydown.enter="searchKeyword"
          @click:append-outer="searchKeyword"
          style=""
          dark
        ></v-text-field>
      </div>
    </div>

    <v-btn
      v-if="windowWidth > 500 && windowHeight > 450 && !isSelectSearch"
      elevation="3"
      fab
      color="#DDA288"
      style="position:fixed; right:170px; top:20px; color:white; transition:0.5s; z-index: 2;"
      @click="isSelectSearch = true"
    >
      <v-icon>
        mdi-image-search
      </v-icon>
    </v-btn>
    <div
      class="text-center"
      v-if="isSelectSearch && windowWidth > 500"
      style="position:fixed;
              width: 120px;
              top: 30px;
              right: 485px;
              z-index: 2;
              color:white;
            "
    >
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#DDA288"
            style="width: 120px;"
            dark
            v-bind="attrs"
            v-on="on"
          >
            {{ selectContinent }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in continents" :key="index">
            <v-list-item-title
              style="text-align:center; cursor:pointer;"
              @click="selectContinent = item"
            >
              {{ item }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- 각 대륙별로 이미지 가져오기 -->
    <div :class="{ 'adjust-location-for-mobile': windowWidth < 500 }">
      <div v-if="this.getContinentName == 'oceania'">
        <Oceania :images="images" :tags="tags" :indexs="indexs" />
      </div>
      <div v-else-if="this.getContinentName == 'asia'">
        <Asia :images="images" :tags="tags" :indexs="indexs" />
      </div>
      <div v-else-if="this.getContinentName == 'northAmerica'">
        <NorthAmerica :images="images" :tags="tags" :indexs="indexs" />
      </div>
      <div v-else-if="this.getContinentName == 'southAmerica'">
        <SouthAmerica :images="images" :tags="tags" :indexs="indexs" />
      </div>
      <div v-else-if="this.getContinentName == 'europe'">
        <Europe :images="images" :tags="tags" :indexs="indexs" />
      </div>
      <div v-else>
        <Africa :images="images" :tags="tags" :indexs="indexs" />
      </div>
    </div>
    <br /><br />
    <div class="d-flex justify-center">
      <v-btn
        class="ma-2 change-font-more-articles"
        :loading="loading"
        :disabled="loading"
        color="#DDA288"
        style="color:white;"
        @click="moreArticles"
        v-if="endPage == ''"
      >
        More
      </v-btn>
      <div
        v-else
        class="d-flex justify-center change-font-more-articles align-center"
        style="width:100%; height:100px; color:#eeeeee;"
      >
        {{ endPage }}
      </div>
      <br /><br /><br /><br /><br /><br />
    </div>
    <!-- 대륙 선택으로 가는 버튼 -->
    <v-btn
      v-if="windowWidth < 500 || windowHeight < 450"
      elevation="3"
      fab
      color="#DDA288"
      style="position:fixed; bottom:43px; right:43px; color:white;"
      @click="clickGotoBack"
    >
      <v-icon>
        mdi-arrow-left-bold-circle
      </v-icon>
    </v-btn>
  </v-main>
</template>

<script>
import Oceania from "@/components/waterfall/Oceania.vue";
import SouthAmerica from "@/components/waterfall/SouthAmerica.vue";
import NorthAmerica from "@/components/waterfall/NorthAmerica.vue";
import Asia from "@/components/waterfall/Asia.vue";
import Africa from "@/components/waterfall/Africa.vue";
import Europe from "@/components/waterfall/Europe.vue";
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";
import SideNavBar from "@/components/navigation/SideNavBar.vue";

export default {
  name: "EachWaterfall",
  data: function() {
    return {
      continents: [
        "All",
        "N. America",
        "S. America",
        "Asia",
        "Africa",
        "Europe",
        "Oceania"
      ],
      selectContinent: "All",
      loader: null,
      loading: false,
      endPage: "",
      getContinentName: localStorage.getItem("continent"), // 대륙별로 나누는 변수
      popularExhibition: false, // 버튼 바꾸기 변수
      images: [], // 이미지 데이터 리스트
      tags: [], // 태그 데이터 리스트
      indexs: [], // id 데이터 리스트
      searchData: "",
      isSelectSearch: false,
      pagingIndex: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  },
  // 로딩
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  // 아예 처음 이 페이지가 생성될 때부터 데이터를 가져옴.
  // 마찬가지로 Blob 디코딩과 더보기 버튼으로 몇개만 가져오게 끔, 수정해야됨.
  created: function() {
    localStorage.setItem("page", "EachWaterfall");
    const location = localStorage.getItem("continent");
    axios
      .get(
        `${SERVER.BOARD_BASE_URL}paging?location=${location}&num=${this.pagingIndex}`
      )
      .then(response => {
        if (response.data == "End Page") {
          this.endPage = "저장된 사진이 없습니다.";
        } else {
          for (let index = 0; index < response.data.length; index++) {
            this.images.push(response.data[index].filePath);
            const tmp = [];
            for (let i = 0; i < response.data[index].tags.length; i++) {
              tmp.push(response.data[index].tags[i].tag);
            }
            this.tags.push(tmp);
            this.indexs.push(response.data[index].board.id);
          }
          this.pagingIndex = this.pagingIndex + 1;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 대륙 컴포넌트
  components: {
    Oceania,
    SouthAmerica,
    NorthAmerica,
    Asia,
    Africa,
    Europe,
    SideNavBar
  },
  methods: {
    goToWorldmap: function() {
      this.$router.push({ name: "WorldMap" });
    },
    // 각 대륙으로 이동
    clickChangeContinentViewButton: function() {
      this.popularExhibition = !this.popularExhibition;
      this.$router.push({ name: "EachContinent" });
    },
    // 게시물 작성 페이지로 이동
    clickGotoCreate: function() {
      this.$router.push({ name: "Create" });
    },
    // 6개씩 더 가져오기
    moreArticles: function() {
      const location = localStorage.getItem("continent");
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}paging?location=${location}&num=${this.pagingIndex}`
        )
        .then(response => {
          if (response.data == "End Page") {
            this.endPage = "더 이상 사진이 없습니다.";
          } else {
            for (let index = 0; index < response.data.length; index++) {
              this.images.push(response.data[index].filePath);
              const tmp = [];
              for (let i = 0; i < response.data[index].tags.length; i++) {
                tmp.push(response.data[index].tags[i].tag);
              }
              this.tags.push(tmp);
              this.indexs.push(response.data[index].board.id);
            }
            this.pagingIndex = this.pagingIndex + 1;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 검색
    searchKeyword: function() {
      if (this.searchData === "") {
        alert("검색어를 입력해주세요.");
      } else {
        localStorage.setItem("selectContinentforSearch", this.selectContinent);
        localStorage.setItem("searchData", this.searchData);
        this.$router.push({ name: "SearchWaterfall" });
      }
    },
    clickGotoBack: function() {
      this.$router.push({ name: "WorldMap" });
    }
  }
};
</script>

<style scoped>
/* 눈누에서 폰트 가져옴 */
@font-face {
  font-family: "TmoneyRoundWindRegular";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/TmoneyRoundWindRegular.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.change-font-more-articles {
  font-family: "TmoneyRoundWindRegular";
  font-size: 20px;
}

.adjust-location-for-mobile {
  position: relative;
  right: 70px;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
