<template>
  <v-container fluid ma-0 pa-0>
    <SideNavBar />

    <v-container
      my-5
      pa-0
      style="background-color:#4f4544"
      class="adjust-scale-xl"
    >
      <br /><br />

      <!-- 뒤로가기 버튼 -->
      <v-btn
        elevation="3"
        fab
        color="#DDA288"
        style="position:fixed; right:60px; top:60px; color:white; "
        @click="clickGoBack"
      >
        <v-icon size="38px">
          mdi-arrow-left-bold-circle
        </v-icon>
      </v-btn>
      <v-row>
        <v-col offset-xl="1" xl="10" offset="1" cols="10">
          <h1 style="color:#eeeeee">메인 사진</h1>
          <hr />
        </v-col>
      </v-row>
      <v-row>
        <v-col offset-xl="1" xl="5" offset="1" cols="5">
          <!-- 메인 사진 -->
          <div class="file-upload-wrapper">
            <div v-if="!main.length" class="file-upload-example-container">
              <div class="file-image-example">
                <div class="file-image-example-alert">
                  등록된 메인 이미지가 없습니다.
                </div>
              </div>

              <!-- 메인 사진 등록 버튼 -->
              <v-btn class="mx-2 image-box" fab dark color="#dda288">
                <label for="mains">
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </label>
                <input
                  type="file"
                  id="mains"
                  ref="mains"
                  @change="mainUpload"
                />
              </v-btn>
            </div>
            <div v-else class="file-preview-content-container">
              <div class="file-preview-container">
                <div
                  v-for="(m, index) in main"
                  :key="index"
                  class="file-preview-wrapper"
                >
                  <div
                    class="file-close-button"
                    @click="mainDeleteButton"
                    :name="m.number"
                  >
                    x
                  </div>
                  <img :src="m.preview" />
                </div>
              </div>
            </div>
          </div>
        </v-col>

        <v-col offset="1" cols="3">
          <!-- 유 무료 -->
          <v-row class="d-flex justify-center">
            <v-col cols="6">
              <div
                style="width:80%; height:35px; border:2px solid; cursor:pointer; border-color: #dda288;
                    color:#dda288; border-radius:5px; text-align:center; margin-left:10%;
                    line-height:35px; font-size: 18px; font-weight: bold;"
                :class="{
                  'select-view-method': !selectViewMethodData,
                  'pay-hover-event-class': true
                }"
                @click="selectViewMethod"
              >
                무료
              </div>
            </v-col>
            <v-col cols="6">
              <div
                style="width:80%; height:35px; border:2px solid; cursor:pointer; border-color: #dda288;
                    color:#dda288; border-radius:5px; text-align:center; margin-left:10%;
                    line-height:35px; font-size: 18px; font-weight: bold;"
                :class="{
                  'select-view-method': selectViewMethodData,
                  'pay-hover-event-class': true
                }"
                @click="selectViewMethod2"
              >
                유료
              </div>
            </v-col>
          </v-row>
          <br />

          <!-- selectContinent가 대륙 선택이야 처음 선택은 선택한 로컬 스토리지의 데이터를 따라서 만들어져. -->
          <v-select
            :items="continentsNames"
            label="Solo field"
            prepend-icon="mdi-map"
            dark
            v-model="selectContinent"
            single-line
          ></v-select>

          <!-- 장소(국가) 선택 : nation -->
          <v-text-field
            dark
            label="장소(국가)"
            prepend-icon="mdi-map-marker"
            v-model="nation"
          ></v-text-field>

          <!-- tags는 리스트로 되어 있슴 -->
          <div class="text-center">
            <v-chip
              v-for="(tag, idx) in tags"
              :key="idx"
              class="ma-2"
              close
              @click:close="delTag(idx)"
            >
              <v-icon left>
                mdi-label
              </v-icon>
              {{ tag }}
            </v-chip>
          </div>

          <v-row align="center" justify="center">
            <v-col cols="6">
              <v-text-field
                dark
                color="white"
                label="#Tag입력"
                v-model="tagInput"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-btn class="btn" color="#dda288" dark @click="addOneTagMore">
                태그 추가
                <v-icon right dark>
                  mdi-tag-plus
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row md="12">
            <!-- submit 버튼 바꿈 -->
            <v-btn
              block
              color="blue-grey"
              class="ma-2 white--text"
              @click="submitFile"
            >
              <v-progress-linear
                v-if="fab"
                indeterminate
                color="#dda288"
                style="width: 90px"
              ></v-progress-linear>
              <div v-else>
                Upload
                <v-icon right dark>
                  mdi-cloud-upload
                </v-icon>
              </div>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col offset-xl="1" xl="10" offset="1" cols="10">
          <h1 style="color:#eeeeee">추가 사진</h1>
          <hr />
          <!-- 서브 사진 -->
          <div class="file-upload-wrapper">
            <div v-if="!files.length" class="file-upload-example-container">
              <div class="file-image-example">
                <div class="file-image-example-alert">
                  추가로 등록할 사진을 올려주세요.
                </div>
              </div>

              <!-- 서브 사진 등록 버튼 -->
              <v-btn class="mx-2 image-box" fab dark color="#dda288">
                <label for="file">
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </label>
                <input
                  type="file"
                  id="file"
                  ref="files"
                  @change="imageUpload"
                  multiple
                />
              </v-btn>
            </div>

            <div v-else class="file-preview-content-container">
              <div class="file-preview-container">
                <div
                  v-for="(file, index) in files"
                  :key="index"
                  class="file-sub-preview-wrapper"
                >
                  <div
                    class="file-close-button"
                    @click="fileDeleteButton"
                    :name="file.number"
                  >
                    x
                  </div>
                  <img :src="file.preview" />
                </div>

                <!-- 추가 사진 등록 버튼 -->
                <div style="line-height:200px">
                  <v-btn class="mx-2 image-box" fab dark color="#dda288">
                    <label for="file">
                      <v-icon dark>
                        mdi-plus
                      </v-icon>
                    </label>
                    <input
                      type="file"
                      id="file"
                      ref="files"
                      @change="imageAddUpload"
                      multiple
                    />
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";

import SideNavBar from "@/components/navigation/SideNavBar.vue";

export default {
  components: {
    SideNavBar
  },
  data() {
    return {
      fab: false,
      selectViewMethodData: false,
      continentsNames: [
        "northAmerica",
        "southAmerica",
        "europe",
        "asia",
        "oceania",
        "africa"
      ],
      selectContinent: localStorage.getItem("continent"), // 선택된 대륙
      main: [],
      files: [], //업로드용 파일
      filesPreview: [], //보여줄 파일
      uploadImageIndex: 0, //이미지 업로드를 위한 변수
      tagInput: "",
      tags: [], // 태그들
      nation: "", // 장소(국가)
      num: 0,
      mainImageData: null
    };
  },
  created: function() {
    console.log(this.$store.state.Auth.authToken);
    this.tagsIdx = 0;
  },
  methods: {
    clickGoBack: function() {
      this.$router.push({ name: localStorage.getItem("page") });
    },
    addOneTagMore() {
      this.tags.push(this.tagInput);
      this.tagInput = "";
    },
    delTag(idx) {
      this.tags.splice(idx, 1);
    },
    mainUpload() {
      this.main = [
        ...this.main,
        {
          file: this.$refs.mains.files[0],
          preview: URL.createObjectURL(this.$refs.mains.files[0]),
          number: 0
        }
      ];
    },
    imageUpload() {
      //하나의 배열로 넣기
      let num = -1;
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        this.files = [
          ...this.files,
          //이미지 업로드
          {
            //실제파일
            file: this.$refs.files.files[i],
            //이미지 프리뷰
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            //삭제 및 관리를 위한 number
            number: i
          }
        ];
        num = i;
      }
      this.uploadImageIndex = num + 1; //이미지 index의 마지막 값 +1
    },
    imageAddUpload() {
      //하나의 배열로 넣기
      let num = -1;
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        this.files = [
          ...this.files,
          //이미지 업로드
          {
            //실제 파일
            file: this.$refs.files.files[i],
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            // 삭제 및 관리를 위한 number
            number: i + this.uploadImageIndex
          }
        ];
        num = i;
      }
      this.uploadImageIndex = this.uploadImageIndex + num + 1;
    },
    mainDeleteButton(e) {
      const name = e.target.getAttribute("name");
      this.main = this.main.filter(data => data.number !== Number(name));
    },
    fileDeleteButton(e) {
      const name = e.target.getAttribute("name");
      this.files = this.files.filter(data => data.number !== Number(name));
    },
    selectViewMethod: function() {
      this.selectViewMethodData = false;
    },
    selectViewMethod2: function() {
      this.selectViewMethodData = true;
    },
    submitFile() {
      if (this.fab == true) {
        this.fab = false;
        return;
      }
      const formData = new FormData();

      // 유효성 검사
      if (this.main[0]) {
        formData.append("main", this.main[0].file);
      } else {
        return alert("사진을 넣어주세요.");
      }
      if (this.files.length != 0) {
        formData.append("main", this.main[0].file);
      } else {
        return alert("추가 사진을 1장 이상 넣어주세요.");
      }
      if (this.nation) {
        formData.append("nation", this.nation);
      } else {
        return alert("장소를 지정해 주세요.");
      }
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i] === "") {
          return alert("태그를 적어주세요.");
        }
      }

      // 프로그레스 애니메이션 설정
      this.fab = true;

      formData.append("writer", this.$store.state.Auth.authToken.username);
      formData.append("location", this.selectContinent);
      formData.append("tags", this.tags);
      if (this.selectViewMethodData) {
        formData.append("premium", "true");
      } else {
        formData.append("premium", "false");
      }
      for (let i = 0; i < this.files.length; i++) {
        formData.append("file", this.files[i].file);
      }
      axios
        .post(`${SERVER.BOARD_BASE_URL}requestupload`, formData, {
          headers: {
            Authorization: "Bearer " + this.$store.state.Auth.authToken.token,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          localStorage.setItem("continent", this.selectContinent);
          this.$router.push({ name: "EachWaterfall" });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style>
.file-image-example {
  height: 100%;
}

.picture-notice {
  margin: 20px;
  padding: 20px 40px;
  border: 1px solid #dddddd;
}

.file-preview-content-container {
  height: 100%;
}

.file-upload-wrapper {
  margin: 20px;
  background-color: #4f4544;
  min-height: 350px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888888;
  height: 40%;
}

.file-upload-example-container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 100%;
width: 100%; */
}

.file-image-example-alert {
  margin-top: 5px;
  text-align: center;
  color: #dda288;
}

.image-box {
  text-align: center;
}

.image-box input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}

.image-box label {
  display: inline-block;
  padding: 10px 10px;
  color: #fff;
  vertical-align: middle;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
}

.file-preview-wrapper {
  padding: 10px;
  position: relative;
}

.file-sub-preview-wrapper {
  padding: 10px;
  position: relative;
}

.file-preview-wrapper > img {
  position: relative;
  width: 400px;
  z-index: 10;
}

.file-sub-preview-wrapper > img {
  position: relative;
  width: 200px;
  z-index: 10;
}

.file-close-button {
  position: absolute;
  /* align-items: center; */
  line-height: 18px;
  z-index: 99;
  font-size: 18px;
  right: 5px;
  top: 10px;
  color: #fff;
  font-weight: bold;
  background-color: #666666;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}

.file-preview-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.file-preview-wrapper-upload {
  margin: 10px;
  padding-top: 20px;
  background-color: #888888;
  width: 200px;
  height: 500px;
}

@keyframes textlight {
  from {
    color: #ffffa5;
  }
  to {
    color: white;
  }
}

.select-view-method {
  animation-duration: 0.8s;
  animation-name: textlight;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  background-color: #eda288;
}

.pay-hover-event-class:hover {
  background-color: white;
  transition: 0.5s;
}

@media (min-width: 1904px) {
  .adjust-scale-xl {
    width: 1400px;
  }
}
</style>
