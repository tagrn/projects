<template>
  <div class="menu">
    <div class="msg">
      <p style="color:#dda288">I'm looking for:</p>
    </div>

    <div class="router-ul">
      <router-link tag="li" @click.native="closeMenuPage" to="/"
        ><span class="router-a" data-text="Home">Home</span></router-link
      >
      <router-link tag="li" @click.native="closeMenuPage" to="/worldmap"
        ><span class="router-a" data-text="World map"
          >Worldmap</span
        ></router-link
      >
      <router-link tag="li" @click.native="closeMenuPage" to="/aboutus"
        ><span class="router-a" data-text="About US"
          >About US</span
        ></router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Menu",
  props: {
    isMenuPageOpen: Boolean
  },
  data() {
    return {};
  },
  methods: {
    // 메뉴 끄기
    closeMenuPage: function() {
      const sound = new Audio(
        require("@/assets/audio/fasten_your_seatbelt.mp3")
      );
      sound.play();
      this.$emit("closeMenuPage");
    }
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lobster");

/* 화면 전체 랩핑 */
.menu {
  font-family: "Lobster", cursive;
  position: fixed;
  background-color: #7e675e;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 9;
}
.menu .msg {
  color: #ffffff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.router-ul {
  position: relative;
}
.router-ul li {
  padding: 10px;
  list-style: none;
  text-align: center;
}
.router-ul li .router-a {
  color: #ffffff;
  text-decoration: none;
  font-size: 6em;
  padding: 5px 20px;
  display: inline-flex;
  font-weight: 300;
  transition: 0.8s;
  z-index: 9;
}

.router-ul:hover li .router-a {
  color: #7e675e;
  cursor: pointer;
}
.router-ul li:hover .router-a {
  color: #dda288;
  cursor: pointer;
}
.router-ul li .router-a:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: #dda288;
  border-radius: 50%;
  z-index: -1;
  opacity: 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 500px;
  transition: letter-spacing 0.5s, left 0.5s;
}
.router-ul li .router-a:hover:before {
  content: attr(data-text);
  left: 50%;
  color: #dddddd;
  opacity: 1;
  letter-spacing: 30px;
}
</style>
