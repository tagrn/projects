<template>
  <v-card
    max-width="100%"
    height="100%"
    class="mx-auto"
    style="background-color:#5a4e4d;"
  >
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
    <br /><br /><br /><br /><br /><br />
    <v-container v-if="windowWidth < windowHeight">
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#DDA288"
            dark
            elevation="10"
            style="position:fixed; left:3%; top:20%; width:94%;"
            @click="gotoVR"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline">VR</v-card-title>
                <v-divider dark></v-divider>
                <v-card-subtitle style="width:160px;">
                  VR 전시관 감상
                  <pre></pre>
                  3D 전시관 감상
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn class="ml-2" outlined rounded small>
                    GOto VR mode
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="" tile>
                <v-img src="@/assets/main/VRIcon.png"></v-img>
              </v-avatar>
            </div>
          </v-card>
          <br /><br /><br /><br /><br />
        </v-col>
        <v-col cols="12">
          <v-card
            color="#DDA288"
            style="position:fixed; left:3%; top:55%; width:94%;"
            dark
            elevation="10"
            @click="gotoWorldmap"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline">사진</v-card-title>
                <v-divider dark></v-divider>
                <v-card-subtitle style="width:160px;">
                  여행 사진 감상
                  <pre></pre>
                  여행지별 사진 분류
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn class="ml-2" outlined rounded small>
                    GOto WorldMap
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="" tile>
                <v-img src="@/assets/worldmap/worldmap.svg"></v-img>
              </v-avatar>
            </div>
          </v-card>
          <br /><br /><br /><br /><br />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row dense>
        <v-col cols="6">
          <v-card
            color="#DDA288"
            dark
            elevation="10"
            style="position:fixed; left:5%; top:30%; width:40%;"
            @click="gotoVR"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline">VR</v-card-title>
                <v-divider dark></v-divider>
                <v-card-subtitle style="width:160px;">
                  VR 전시관 감상
                  <pre></pre>
                  3D 전시관 감상
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn class="ml-2" outlined rounded small>
                    GOto VR mode
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="" tile>
                <v-img src="@/assets/main/VRIcon.png"></v-img>
              </v-avatar>
            </div>
          </v-card>
          <br /><br /><br /><br /><br />
        </v-col>
        <v-col cols="6">
          <v-card
            color="#DDA288"
            style="position:fixed; left:55%; top:30%; width:40%;"
            dark
            elevation="10"
            @click="gotoWorldmap"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline">사진</v-card-title>
                <v-divider dark></v-divider>
                <v-card-subtitle style="width:160px;">
                  여행 사진 감상
                  <pre></pre>
                  여행지별 사진 분류
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn class="ml-2" outlined rounded small>
                    GOto WorldMap
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="" tile>
                <v-img src="@/assets/worldmap/worldmap.svg"></v-img>
              </v-avatar>
            </div>
          </v-card>
          <br /><br /><br /><br /><br />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "MobileMain",
  data: () => ({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    overlay: false,
  }),
  methods: {
    gotoVR: function() {
      this.overlay = true
    },
    gotoWorldmap: function() {
      this.$router.push({ name: "WorldMap" });
    },
        // VR 전시관으로 감.
    gotoFirstExhibition: function() {
      window.location.href = "https://hubs.mozilla.com/scenes/VkhFoTD";
    },
    gotoSecondExhibition: function() {
      window.location.href = "https://hubs.mozilla.com/scenes/hG7nZSY";
    },
  }
};
</script>

<style></style>
