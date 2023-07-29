<template>
  <v-main>
    <SideNavBar />

    <!-- 월드맵 돌아가기 -->
    <v-btn
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

    <!-- Waterfall 방식 / 대륙 지도 뷰어 -->
    <v-btn
      elevation="3"
      fab
      color="#DDA288"
      style="position:fixed; right:20px; top:20px; color:white;"
      @click="clickChangeContinentViewButton"
    >
      <span v-if="popularExhibition"> ALL </span>
      <v-icon v-else>
        mdi-star
      </v-icon>
    </v-btn>

    <!-- 새 포스트 작성 -->
    <v-btn
      elevation="3"
      fab
      color="#DDA288"
      style="position:fixed; right:95px; top:20px; color:white;"
      @click="clickGotoCreate"
    >
      <v-icon>
        mdi-image-plus
      </v-icon>
    </v-btn>
    <v-btn
      elevation="3"
      fab
      color="#DDA288"
      style="position:fixed; right:20px; top:20px; color:white;"
      @click="clickChangeContinentViewButton"
    >
      <span v-if="popularExhibition"> ALL </span>
      <v-icon v-else>
        mdi-star
      </v-icon>
    </v-btn>

    <!-- 검색 버튼 및 입력창 -->
    <div
      v-if="isSelectSearch"
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
      v-if="isSelectSearch"
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
      v-if="!isSelectSearch"
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
      v-if="isSelectSearch"
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
    <div v-if="this.getContinentName == 'oceania'">
      <Oceania
        :images="images"
        :tags="tags"
        :likes="likes"
        :locations="locations"
        :indexs="indexs"
      />
    </div>
    <div v-else-if="this.getContinentName == 'asia'">
      <Asia
        :images="images"
        :tags="tags"
        :likes="likes"
        :locations="locations"
        :indexs="indexs"
      />
    </div>
    <div v-else-if="this.getContinentName == 'northAmerica'">
      <NorthAmerica
        :images="images"
        :tags="tags"
        :likes="likes"
        :locations="locations"
        :indexs="indexs"
      />
    </div>
    <div v-else-if="this.getContinentName == 'southAmerica'">
      <SouthAmerica
        :images="images"
        :tags="tags"
        :likes="likes"
        :locations="locations"
        :indexs="indexs"
      />
    </div>
    <div v-else-if="this.getContinentName == 'europe'">
      <Europe
        :images="images"
        :tags="tags"
        :likes="likes"
        :locations="locations"
        :indexs="indexs"
      />
    </div>
    <div v-else>
      <Africa
        :images="images"
        :tags="tags"
        :likes="likes"
        :locations="locations"
        :indexs="indexs"
      />
    </div>
  </v-main>
</template>

<script>
import Oceania from "@/components/continents/Oceania.vue";
import SouthAmerica from "@/components/continents/SouthAmerica.vue";
import NorthAmerica from "@/components/continents/NorthAmerica.vue";
import Asia from "@/components/continents/Asia.vue";
import Africa from "@/components/continents/Africa.vue";
import Europe from "@/components/continents/Europe.vue";
import SideNavBar from "@/components/navigation/SideNavBar.vue";

export default {
  name: "EachContinent",
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
      getContinentName: localStorage.getItem("continent"),
      popularExhibition: true,
      images: [], // 이미지 데이터 리스트
      tags: [], // 태그 데이터 리스트
      likes: [], // 좋아요 수 데이터 리스트
      locations: [], // 장소 데이터 리스트
      indexs: [], // 게시물 id 리스트
      searchData: "",
      isSelectSearch: false,
      pagingIndex: 0
    };
  },
  // 대륙 이름 저장
  created: function() {
    localStorage.setItem("page", "EachContinent");
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
      this.$router.push({ name: "EachWaterfall" });
    },
    // 게시물 작성 페이지로 이동
    clickGotoCreate: function() {
      this.$router.push({ name: "Create" });
    },
    searchKeyword: function() {
      if (this.searchData === "") {
        alert("검색어를 입력해주세요.");
      } else {
        localStorage.setItem("selectContinentforSearch", this.selectContinent);
        localStorage.setItem("searchData", this.searchData);
        this.$router.push({ name: "SearchWaterfall" });
      }
    }
  }
};
</script>

<style scoped></style>
