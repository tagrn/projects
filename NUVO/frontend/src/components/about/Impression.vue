<template>
  <v-parallax dark :src="parallaxImg">
    <div class="impression section bg-grey" id="impression">
      <v-container>
        <v-carousel
          cycle
          :show-arrows="false"
          delimiter-icon="mdi-minus"
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet color="transparent" height="100%">
              <v-container class="fill-height" justify="center">
                <v-row justify="center">
                  <v-icon>{{ slide.icon }}</v-icon>
                </v-row>
                <v-row justify="center">
                  <div class="display-1">{{ slide.text }}</div>
                </v-row>
                <v-row justify="center">
                  <div class="subtitle-1">{{ slide.name }}</div>
                  <div>...[{{ slide.team }}]</div>
                </v-row>
              </v-container>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </div>
  </v-parallax>
</template>

<script>
export default {
  data() {
    return {
      parallaxImg: require("@/assets/main/NUVOchangeColorShallow.png"),
      slides: [
        {
          icon: "mdi-comment-quote",
          text: "팀원들이 말을 안 들어서 힘들었습니다ㅠㅠ",
          name: "Donggeol Kim",
          team: "Leader"
        },
        {
          icon: "mdi-comment-quote",
          text: "나는 공유다.",
          name: "Minho Jang",
          team: "Specialist"
        },
        {
          icon: "mdi-comment-quote",
          text: "프로젝트하면서 즐겁고 재밌었습니다 ^^",
          name: "TaeJin Kim",
          team: "Developer"
        },
        {
          icon: "mdi-comment-quote",
          text: "FrontEnd에 대해서 많은 걸 알게된 프로젝트였습니다.",
          name: "TaeWan Gu",
          team: "Developer"
        }
      ]
    };
  }
};
</script>

<style scoped>
/* section */
.section {
  padding: 40px 0 100px;
}

/* impression */
.impression {
  text-align: center;
  padding-left: 20%;
  padding-right: 20%;
  padding-bottom: 145px;
}
</style>
