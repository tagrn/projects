<template>
  <a-scene>
    <a-assets>
      <template v-for="(image, idx) in vfImages">
        <img
          :src="image"
          :id="hashcode(image)"
          :key="idx"
          crossorigin="anonymous"
        />
      </template>
      <audio
        id="click-sound"
        crossorigin="anonymous"
        src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg"
      ></audio>
      <img id="city-thumb" crossorigin="anonymous" :src="vfIcons" alt="" />
    </a-assets>

    <v-btn
      elevation="3"
      fab
      color="#DDA288"
      style="position:fixed; right:60px; top:60px; width:35px; height:35px; color:white; z-index:102;"
      @click="clickGoBack"
    >
      <v-icon size="25px">
        mdi-arrow-left-bold-circle
      </v-icon>
    </v-btn>

    <!-- 360도 이미지를 보여주는 엔티티. -->
    <template v-if="isLoaded">
      <a-sky
        id="image-360"
        radius="10"
        :src="'#' + currSrc"
        animation__fade="property: components.material.material.color; type: color; from: #FFF; to: #000; dur: 300; startEvents: fade"
        animation__fadeback="property: components.material.material.color; type: color; from: #000; to: #FFF; dur: 300; startEvents: animationcomplete__fade"
      ></a-sky>
    </template>

    <!-- 이미지 링크가 담기는 엔티티. -->
    <a-entity id="links" layout="type: line; margin: 1.5" position="0 -1 -4">
      <a-entity
        class="link"
        v-on:click="changeScene"
        geometry="primitive: plane; height: 1; width: 1"
        material="shader: flat; src: #city-thumb"
        event-set__mouseenter="scale: 1.2 1.2 1"
        event-set__mouseleave="scale: 1 1 1"
        :event-set__click="
          '_target: #image-360; _delay: 300; material.src: #' + currSrc
        "
        proxy-event="event: click; to: #image-360; as: fade"
        sound="on: click; src: #click-sound"
      ></a-entity>
    </a-entity>

    <!-- Camera + cursor. -->
    <a-entity camera look-controls>
      <a-cursor
        id="cursor"
        animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
        animation__fusing="property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500"
        event-set__mouseenter="_event: mouseenter; color: springgreen"
        event-set__mouseleave="_event: mouseleave; color: black"
        raycaster="objects: .link"
      ></a-cursor>
    </a-entity>
  </a-scene>
</template>

<script>
import axios from "axios";
import SERVER from "@/apis/UrlMapper.ts";
export default {
  name: "GalleryVR",
  data: function() {
    return {
      currSrc: "",
      currIndex: 0,
      isLoaded: false,
      isSelectLike: false,
      vfImages: [],
      vfIcons: require("@/assets/photo/Icon.png")
    };
  },
  created() {
    axios
      .get(
        `${SERVER.BOARD_BASE_URL}getposts?id=${localStorage.getItem(
          "articleId"
        )}&username=${this.$store.state.Auth.authToken.username}`
      )
      .then(response => {
        if (response.data.like === "false") this.isSelectLike = false;
        else this.isSelectLike = true;
        this.author = response.data.board.author;
        this.vfImages.push(response.data.filePath);
        for (let i = 0; i < response.data.subPath.length; i++) {
          this.vfImages.push(response.data.subPath[i]);
        }
        this.currSrc = this.hashcode(this.vfImages[0], 0);
        this.isLoaded = true;
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    hashcode(str) {
      const words = str.split(/\/|\./g);
      return words[words.length - 2];
    },
    mergeId(prefix, idx) {
      return prefix + "img-" + idx;
    },
    clickGoBack: function() {
      this.$router.push({ name: "PhotoView" });
    },
    changeScene() {
      const idx = (this.currIndex + 1) % this.vfImages.length;
      this.currSrc = this.hashcode(this.vfImages[idx], idx);
      this.currIndex = idx;
      return;
    }
  }
};
</script>
