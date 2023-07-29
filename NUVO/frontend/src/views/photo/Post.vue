<template>
  <div class="container">
    <div class="container-center">
      <Carousel @prev="prev" @next="next">
        <CarouselSlide
          v-for="(slide, idx) in slides"
          :key="slide"
          :idx="idx"
          :visibleSlide="visibleSlide"
        >
          <img :src="slides[idx - 2]" />
          <img :src="slides[idx - 1]" />
          <img :src="slides[idx]" />
          <img :src="slides[idx + 1]" />
          <img :src="slides[idx + 2]" />
        </CarouselSlide>
      </Carousel>
    </div>
    <div class="profile">
      <MetaCard
        :exhibitionImage="exhibitionImage"
        :exhibitionTitle="exhibitionTitle"
        :exhibitionContent="exhibitionContent"
        :exhibitionLocation="exhibitionLocation"
        :exhibitionAuthor="exhibitionAuthor"
        :likeCount="likeCount"
      />
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/photo/Carousel.vue";
import CarouselSlide from "@/components/photo/CarouselSlide.vue";
import MetaCard from "@/components/photo/MetaCard.vue";

export default {
  components: {
    Carousel,
    CarouselSlide,
    MetaCard
  },
  data: function() {
    return {
      slides: [
        require("@/assets/images/example/1.jpg"),
        require("@/assets/images/example/2.jpg"),
        require("@/assets/images/example/3.jpg"),
        require("@/assets/images/example/4.jpg"),
        require("@/assets/images/example/5.jpg")
      ],
      visibleSlide: 0,
      exhibitionImage: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      exhibitionTitle: "Test용",
      exhibitionContent: ["태그 1", "태그 2"],
      exhibitionLocation: "",
      exhibitionAuthor: "ssafy",
      likeCount: 168
    };
  },
  computed: {
    slidesLen() {
      return this.slides.length;
    }
  },
  methods: {
    prev() {
      const sound = new Audio(require("@/assets/audio/paper_flip.mp3"));
      sound.play();
      if (this.visibleSlide <= 0) {
        this.visibleSlide = this.slidesLen - 1;
      } else {
        this.visibleSlide--;
      }
    },
    next() {
      const sound = new Audio(require("@/assets/audio/paper_flip.mp3"));
      sound.play();
      if (this.visibleSlide >= this.slidesLen - 1) {
        this.visibleSlide = 0;
      } else {
        this.visibleSlide++;
      }
    }
  }
};
</script>

<style scoped>
/* Flex */
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  max-width: none;
  position: absolute;
  overflow: hidden;
  z-index: 1;
}
.container-center {
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.profile {
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
}

/* (left) img */
.carousel-slide img {
  left: 30%;
  height: 40vh;
  position: absolute;
}
.carousel-slide img:hover {
  transform: scale(1.6);
}
.carousel-slide img:nth-child(1) {
  transform: rotate(58deg) translate(-330px, -750px);
  opacity: 0.8;
  z-index: 5;
}
.carousel-slide img:nth-child(2) {
  transform: rotate(25deg) translate(-70px, -400px);
  opacity: 0.8;
  z-index: 6;
}
.carousel-slide img:nth-child(3) {
  opacity: 1;
  z-index: 7;
}
.carousel-slide img:nth-child(4) {
  transform: rotate(-25deg) translate(-70px, 400px);
  opacity: 0.8;
  z-index: 6;
}
.carousel-slide img:nth-child(5) {
  transform: rotate(-58deg) translate(-330px, 750px);
  opacity: 0.8;
  z-index: 5;
}
</style>
