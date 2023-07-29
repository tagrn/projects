<template>
  <v-container>
    <v-app-bar fixed height="90px;" color="#5a4e4d" elevation="0"> </v-app-bar>
    <br />
    <br />
    <br />
    <br />
    <v-row>
      <v-col cols="6">
        <v-card
          color="#d79374"
          dark
          elevation="10"
          @click="gotoWorldmap('northAmerica')"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                style="font-size:18px !important; line-height:16px;"
                >North America</v-card-title
              >
              <v-divider dark style="line-height:5px"></v-divider>
              <div style="height:5px"></div>
              <div style="width:100%" class="d-flex justify-center">
                <img src="@/assets/mobile/north.jpg" style="width:94%" alt="" />
              </div>
              <v-card-subtitle>
                미국, 그린란드, 캐나다 등
              </v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          color="#d79374"
          dark
          elevation="10"
          @click="gotoWorldmap('southAmerica')"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                style="font-size:18px !important; line-height:16px;"
                >South America</v-card-title
              >
              <v-divider dark></v-divider>
              <div style="height:5px"></div>
              <div style="width:100%" class="d-flex justify-center">
                <img src="@/assets/mobile/south.jpg" style="width:94%" alt="" />
              </div>
              <v-card-subtitle>
                페루, 볼리비아, 아르헨티나, 브라질 등
              </v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          color="#DDA288"
          dark
          elevation="10"
          @click="gotoWorldmap('africa')"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" style="line-height:18px;"
                >Africa</v-card-title
              >
              <v-divider dark></v-divider>
              <div style="height:5px"></div>
              <div style="width:100%" class="d-flex justify-center">
                <img
                  src="@/assets/mobile/africa.jpg"
                  style="width:94%"
                  alt=""
                />
              </div>
              <v-card-subtitle>
                모로코, 이집트, 마다가스카르 등
              </v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          color="#DDA288"
          dark
          elevation="10"
          @click="gotoWorldmap('asia')"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" style="line-height:18px;"
                >Asia</v-card-title
              >
              <v-divider dark></v-divider>
              <div style="height:5px"></div>
              <div style="width:100%" class="d-flex justify-center">
                <img src="@/assets/mobile/asia.jpg" style="width:94%" alt="" />
              </div>
              <v-card-subtitle>
                홍콩, 중국, 일본, 대만, 몽골 등
              </v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          color="#d79374"
          dark
          elevation="10"
          @click="gotoWorldmap('europe')"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" style="line-height:18px;"
                >Europe</v-card-title
              >
              <v-divider dark></v-divider>
              <div style="height:5px"></div>
              <div style="width:100%" class="d-flex justify-center">
                <img
                  src="@/assets/mobile/europe.jpg"
                  style="width:94%"
                  alt=""
                />
              </div>
              <v-card-subtitle>
                영국, 프랑스, 스웨덴, 이탈리아 등
              </v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          color="#d79374"
          dark
          elevation="10"
          @click="gotoWorldmap('oceania')"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" style="line-height:18px;"
                >Oceania</v-card-title
              >
              <v-divider dark></v-divider>
              <div style="height:5px"></div>
              <div style="width:100%" class="d-flex justify-center">
                <img
                  src="@/assets/mobile/oceania.jpg"
                  style="width:94%"
                  alt=""
                />
              </div>
              <v-card-subtitle>
                오스트레일리아, 피지, 뉴질랜드 등
              </v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MobileWorldMap",
  methods: {
    gotoWorldmap: function(continent) {
      localStorage.setItem("continent", continent);
      this.$router.push({ name: "EachWaterfall" });
    }
  }
};
</script>

<style></style>
