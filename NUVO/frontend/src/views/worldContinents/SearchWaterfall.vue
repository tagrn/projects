<template>
  <div>
    <SideNavBar />
    <v-container class="adjust-grid-container">
      <div style="width:100%; height: 20px;"></div>
      <div style="width:100%; height: 20px;"></div>
      <div
        style="width:100%; margin-left: 2%; height: 60px; font-size:33px; color:white; font-family:'MapoFlowerIsland';"
      >
        "{{ searchData }}" 검색 결과
      </div>
      <div style="width:100%; height: 10px;"></div>
      <hr />
      <div style="width:100%; height: 35px;"></div>
      <v-row>
        <v-col
          v-for="(image, idx) in images"
          :key="idx"
          cols="12"
          sm="6"
          md="4"
        >
          <!-- 이미지들 -->
          <div class="d-flex justify-center">
            <img
              :src="`${image}`"
              alt="image error"
              class="adjust-grid-image opacity-event-for-waterfall"
              style="cursor:pointer;"
              @click="gotoSelectArticle(idx)"
            />
          </div>
          <br />

          <!-- 태그들 -->
          <v-chip-group
            class="accent-4 white--text"
            style="text-algin:center;"
            column
          >
            <v-chip
              v-for="(item, i) in tags[idx]"
              :key="i"
              style="background-color:grey; color:white;"
              class="tag-hover-event-class"
              @click="gotoSearch(item)"
            >
              {{ item }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <!-- 더보기 -->
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
                right: 95px;
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
                right: 110px;
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
        style="position:fixed; right:95px; top:20px; color:white; transition:0.5s; z-index: 2;"
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
                right: 410px;
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

      <!-- 게시물 작성 페이지로 가는 버튼 -->
      <v-btn
        elevation="3"
        fab
        color="#DDA288"
        style="position:fixed; right:20px; top:20px; color:white; z-index: 2;"
        @click="clickGotoCreate"
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";
import SideNavBar from "@/components/navigation/SideNavBar.vue";

export default {
  name: "SearchWaterfall",
  components: {
    SideNavBar
  },
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
      selectContinent: localStorage.getItem("selectContinentforSearch"),
      loader: null,
      loading: false,
      endPage: "",
      images: [],
      indexs: [],
      tags: [],
      pageNum: 0,
      searchData: localStorage.getItem("searchData"),
      isSelectSearch: false
    };
  },
  created: function() {
    if (localStorage.getItem("selectContinentforSearch") == "All") {
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}allsearch?searchData=${localStorage.getItem(
            "searchData"
          )}&num=${this.pageNum}`
        )
        .then(res => {
          if (res.data == "End Page") {
            this.endPage = "검색 결과가 없습니다.";
          } else {
            for (let i = 0; i < res.data.length; i++) {
              const tmp = [];
              this.images.push(res.data[i].filePath);
              this.indexs.push(res.data[i].board.id);
              res.data[i].tags.forEach(e => {
                tmp.push(e.tag);
              });
              this.tags.push(tmp);
            }
            this.pageNum = this.pageNum + 1;
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      let tmpContinent = ''
      if (this.selectContinent == 'N. America') {
        tmpContinent = 'northAmerica'
      }
      else if (this.selectContinent == 'S. America') {
        tmpContinent = 'southAmerica'
      }
      else {
        tmpContinent = this.selectContinent
      }
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}eachsearch?searchData=${localStorage.getItem(
            "searchData"
          )}&num=${this.pageNum}&location=${tmpContinent}`
        )
        .then(res => {
          if (res.data == "End Page") {
            this.endPage = "검색 결과가 없습니다.";
          } else {
            for (let i = 0; i < res.data.length; i++) {
              const tmp = [];
              this.images.push(res.data[i].filePath);
              this.indexs.push(res.data[i].board.id);
              res.data[i].tags.forEach(e => {
                tmp.push(e.tag);
              });
              this.tags.push(tmp);
            }
            this.pageNum = this.pageNum + 1;
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  methods: {
    // 게시물 작성 페이지로 이동
    clickGotoCreate: function() {
      this.$router.push({ name: "Create" });
    },
    // 6개씩 더 가져오기
    moreArticles: function() {
      if (this.selectContinent === "All") {
        axios
          .get(
            `${
              SERVER.BOARD_BASE_URL
            }allsearch?searchData=${localStorage.getItem("searchData")}&num=${
              this.pageNum
            }`
          )
          .then(res => {
            if (res.data == "End Page") {
              this.endPage = "더 이상 사진이 없습니다.";
            } else {
              for (let i = 0; i < res.data.length; i++) {
                const tmp = [];
                this.images.push(res.data[i].filePath);
                this.indexs.push(res.data[i].board.id);
                res.data[i].tags.forEach(e => {
                  tmp.push(e.tag);
                });
                this.tags.push(tmp);
              }
              this.pageNum = this.pageNum + 1;
            }
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        let tmpContinent = ''
        if (this.selectContinent == 'N. America') {
          tmpContinent = 'northAmerica'
        }
        else if (this.selectContinent == 'S. America') {
          tmpContinent = 'southAmerica'
        }
        else {
          tmpContinent = this.selectContinent
        }
        axios
          .get(
            `${
              SERVER.BOARD_BASE_URL
            }eachsearch?searchData=${localStorage.getItem("searchData")}&num=${
              this.pageNum
            }&location=${tmpContinent}`
          )
          .then(res => {
            if (res.data == "End Page") {
              this.endPage = "더 이상 사진이 없습니다.";
            } else {
              for (let i = 0; i < res.data.length; i++) {
                const tmp = [];
                this.images.push(res.data[i].filePath);
                this.indexs.push(res.data[i].board.id);
                res.data[i].tags.forEach(e => {
                  tmp.push(e.tag);
                });
                this.tags.push(tmp);
              }
              this.pageNum = this.pageNum + 1;
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },

    // 검색
    searchKeyword: function() {
      if (this.searchData === "") {
        alert("검색어를 입력해주세요.");
      } else {
        localStorage.setItem("searchData", this.searchData);
        this.images = [];
        this.indexs = [];
        this.tags = [];
        this.pageNum = 0;
        if (this.selectContinent === "All") {
          axios
            .get(
              `${
                SERVER.BOARD_BASE_URL
              }allsearch?searchData=${localStorage.getItem("searchData")}&num=${
                this.pageNum
              }`
            )
            .then(res => {
              if (res.data == "End Page") {
                this.endPage = "검색 결과가 없습니다.";
              } else {
                for (let i = 0; i < res.data.length; i++) {
                  const tmp = [];
                  this.images.push(res.data[i].filePath);
                  this.indexs.push(res.data[i].board.id);
                  res.data[i].tags.forEach(e => {
                    tmp.push(e.tag);
                  });
                  this.tags.push(tmp);
                }
                this.pageNum = this.pageNum + 1;
                this.endPage = "";
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          let tmpContinent = ''
          if (this.selectContinent == 'N. America') {
            tmpContinent = 'northAmerica'
          }
          else if (this.selectContinent == 'S. America') {
            tmpContinent = 'southAmerica'
          }
          else {
            tmpContinent = this.selectContinent
          }
          axios
            .get(
              `${
                SERVER.BOARD_BASE_URL
              }eachsearch?searchData=${localStorage.getItem(
                "searchData"
              )}&num=${this.pageNum}&location=${tmpContinent}`
            )
            .then(res => {
              if (res.data == "End Page") {
                this.endPage = "검색 결과가 없습니다.";
              } else {
                for (let i = 0; i < res.data.length; i++) {
                  const tmp = [];
                  this.images.push(res.data[i].filePath);
                  this.indexs.push(res.data[i].board.id);
                  res.data[i].tags.forEach(e => {
                    tmp.push(e.tag);
                  });
                  this.tags.push(tmp);
                }
                this.pageNum = this.pageNum + 1;
                this.endPage = "";
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
      }
    },
    gotoSearch: function(tag) {
      if (tag[0] == "#") {
        tag = tag.substring(1, tag.length);
      }
      localStorage.setItem("searchData", tag);
      this.images = [];
      this.indexs = [];
      this.tags = [];
      this.pageNum = 0;
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}allsearch?searchData=${localStorage.getItem(
            "searchData"
          )}&num=${this.pageNum}`
        )
        .then(res => {
          if (res.data == "End Page") {
            this.endPage = "검색 결과가 없습니다.";
          } else {
            for (let i = 0; i < res.data.length; i++) {
              const tmp = [];
              this.images.push(res.data[i].filePath);
              this.indexs.push(res.data[i].board.id);
              res.data[i].tags.forEach(e => {
                tmp.push(e.tag);
              });
              this.tags.push(tmp);
            }
            this.pageNum = this.pageNum + 1;
            this.endPage = "";
            this.searchData = localStorage.getItem("searchData")
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    gotoSelectArticle: function(idx) {
      localStorage.setItem("articleId", this.indexs[idx]);
      axios
        .get(
          `${SERVER.BOARD_BASE_URL}increaseview?id=${localStorage.getItem(
            "articleId"
          )}`
        )
        .catch(err => {
          console.error(err);
        });
      this.$router.push({ name: "PhotoView" });
    }
  }
};
</script>

<style>
/* 이미지 반응형으로 모든 기기에서 사용가능하게 만듬 */
.adjust-grid-container {
  padding: 80px 0px 0px 140px;
}
.adjust-grid-image {
  width: 250px;
}

@media (min-width: 600px) {
  .adjust-grid-image {
    width: 230px;
  }
}

@media (min-width: 800px) {
  .adjust-grid-image {
    width: 270px;
  }
}

@media (min-width: 1000px) {
  .adjust-grid-container {
    padding: 80px 0px 0px 100px;
  }
}

/* 1264px 부터 css코드 */
@media (min-width: 1264px) {
  .adjust-grid-image {
    width: 350px;
  }
}

/* 1600px 부터 css코드 */
@media (min-width: 1500px) {
  .adjust-grid-container {
    padding: 80px 0px 0px 0px;
  }
  .adjust-grid-image {
    width: 380px;
  }
}

/* 1904px 부터 css코드 */
@media (min-width: 1904px) {
  .adjust-grid-container {
    padding: 80px 130px 0px 130px;
  }
  .adjust-grid-image {
    width: 450px;
  }
}

/* 후버 효과 */
.opacity-event-for-waterfall:hover {
  transition: 0.5s;
  transform: scale(1.03);
  opacity: 0.4;
}

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
