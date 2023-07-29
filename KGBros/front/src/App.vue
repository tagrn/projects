<template>
  <div id="app">
    <b-navbar class="fixed-top" toggleable="sm" type="white" variant="black" style="background-color:#000000;">
      <!-- type="light" variant="light" -->
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <router-link id="navTitle" to="/">김구브라더스</router-link>

      <b-collapse id="nav" is-nav>
        <b-navbar-nav>
          <router-link :to="{ name: 'Home' }">홈 </router-link>
          <router-link :to="{ name: 'MyListDetail' }"> 나의 리스트 </router-link> 
          <router-link :to="{ name: 'Community' }"> 게시판 </router-link>
          <router-link :to="{ name: 'RecomendedMovie' }"> 김구브라더스의 영화추천 </router-link>
          <router-link :to="{ name: 'MyListApp' }"> 앱 다운로드 </router-link>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" id="change-font">
          <div v-if="checkLogin">
            안녕하세요,  {{ user }}님
            <router-link @click.native="logout" to='#'>로그아웃</router-link>
          </div>
          <div v-else>
            <router-link :to="{ name: 'Signup' }"> 회원가입 </router-link>
            <router-link :to="{ name: 'Login' }"> 로그인 </router-link>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
        <h1>1</h1>
    <h3>'</h3>
    <router-view @login="checkLogin = true"/>

  </div>
  
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      user : localStorage.getItem('user'),
      checkLogin: false,
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem('user')
      localStorage.removeItem('jwt')
      this.checkLogin = false,
      this.$router.push({ name: 'Login' })
    }
  },
  created: function () {
    const token = localStorage.getItem('jwt')
    if (token) {
      this.checkLogin = true
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Black+Han+Sans:400');
@import url('https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap&subset=korean');

@font-face {
     font-family: 'S-CoreDream-7ExtraBold';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-7ExtraBold.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}

@font-face {
    font-family: 'TDTDTadakTadak';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/TDTDTadakTadak.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
     font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}

@font-face {
    font-family: 'InfinitySans-RegularA1';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/InfinitySans-RegularA1.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

#app {
  font-family: 'S-CoreDream-3Light', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#navTitle {
  font-family: 'Black Han Sans', Avenir;
  font-size: 45px;
  color: white;
}
/* 
#navside {
  padding: 8px;
} */

#change-font {
  font-family: 'S-CoreDream-7ExtraBold', 'Black Han Sans', Avenir;
}

#nav {
  padding: 5px;
}

#nav a {
  /* font-weight: bold; */
  font-family: 'Black Han Sans', Avenir;
  color: white;
  font-size: 20px;
  padding: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>