<template>
  <!-- App.vue -->
  <div>
    <MobileWorldMap v-if="windowWidth < 500 || windowHeight < 450" />
    <div v-else>
      <MobileWorldMap class="adjust-grid-system" />
      <div class="adjust-grid-system-reverse">
        <SideNavBar />

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
          v-intro="`장소, 태그를 입력해서 검색`"
          v-intro-position="'left'"
          v-intro-step="3"
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

        <!-- 이미지 업로드 버튼 -->
        <v-btn
          elevation="3"
          fab
          color="#DDA288"
          style="position:fixed; right:95px; top:20px; color:white;"
          @click="clickGotoCreate"
          v-intro="`새 게시물 작성 (이미지 업로드)`"
          v-intro-position="'left'"
          v-intro-step="4"
        >
          <v-icon>
            mdi-image-plus
          </v-icon>
        </v-btn>

        <!-- 워터폴(ALL) 버튼 -->
        <v-btn
          elevation="3"
          fab
          color="#DDA288"
          style="position:fixed; right:20px; top:20px; color:white;"
          @click="clickChangeContinentViewButton"
          v-intro="`Waterfall 방식으로 보기(전체 게시물)`"
          v-intro-position="'bottom'"
          v-intro-step="5"
        >
          <span v-if="popularExhibition"> ALL </span>
          <v-icon v-else>
            mdi-star
          </v-icon>
        </v-btn>

        <v-container>
          <v-row>
            <v-col cols="12">
              <!-- 월드 맵 나누기 -->
              <WorldMapDivision />
            </v-col>
          </v-row>
        </v-container>

        <!-- 가운데 하단 Tips 픽스 -->
        <div
          style="
              position: fixed;
              height: 10%;
              top: 54%;
              left: 30px;
              z-index: 2;
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
      </div>
    </div>
  </div>
</template>

<script>
import WorldMapDivision from "@/components/WorldMapDivision.vue";
import SideNavBar from "@/components/navigation/SideNavBar.vue";
import MobileWorldMap from "@/components/mobile/WorldMap.vue";

export default {
  name: "WorldMap",
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
      popularExhibition: true,
      isSelectTips: false,
      searchData: "",
      isSelectSearch: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  },
  components: {
    WorldMapDivision,
    SideNavBar,
    MobileWorldMap
  },
  created: function() {
    localStorage.setItem("page", "WorldMap");
  },
  methods: {
    activeIntro: function() {
      this.$intro().start(); // start the guide
      this.$intro().showHints(); // show hints
    },
    clickChangeContinentViewButton: function() {
      this.popularExhibition = !this.popularExhibition;
      this.$router.push({ name: "AllWaterfall" });
    },
    clickGotoCreate: function() {
      this.$router.push({ name: "Create" });
    },
    searchKeyword: function() {
      if (this.searchData === "") {
        alert("검색어를 입력해주세요.");
      } else {
        localStorage.setItem("searchData", this.searchData);
        localStorage.setItem("selectContinentforSearch", this.selectContinent);
        this.$router.push({ name: "SearchWaterfall" });
      }
    }
  }
};
</script>

<style scoped>
.tipBtn {
  display: flex;
  justify-content: center;
  align-items: center;
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

.adjust-grid-system-reverse {
  display: none;
}

.adjust-grid-system {
  display: unset;
}

@media (min-width: 930px) {
  .adjust-grid-system {
    display: none;
  }
  .adjust-grid-system-reverse {
    display: unset;
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
