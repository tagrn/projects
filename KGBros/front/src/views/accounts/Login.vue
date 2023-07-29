<template>
  <div class="container" id="font-change-login"
  style="position: absolute; top: 50%; left: 50%; width:500px; height:500px; margin: -250px 0 0 -250px"
  >
    <h2> 김구브라더스의 세계로 </h2>
    <br>
    <!-- <div class="container" style="position: absolute; right: 5%;"> -->
    <div class="text-left d-flex">
      <label for="username">아이디 : <span style="color:black;">....</span> </label>
      <input style="font-size:25px;" type="text" id="username" v-model="credentials.username">
    </div>
    <br>  
    <div class="text-left d-flex">
      <label for="password">비밀번호 : <span style="color:black;">.</span> </label>
      <input style="font-size:25px;" type="password" id="password" v-model="credentials.password" @keydown.enter="login">
    </div>

    <br>
    <b-button @click="login" variant="success">로그인</b-button>
  </div>
</template>

<script>
import axios from 'axios'


const serverURL = "https://kgbros-django-server.herokuapp.com"

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login () {
      axios.post(`${serverURL}/accounts/api-token-auth/`, this.credentials)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('jwt', res.data.token)
        localStorage.setItem('user', this.credentials.username)
        this.$emit('login')
        this.$store.dispatch('createUser', this.credentials.username)
        this.$router.push({name: 'Home'})
      })
      .catch(err => {
        alert('사용자/비밀번호가 틀립니다')
        console.log(err)
      })
    }
  }
}
</script>

<style>
#font-change-login {
  font-family: 'S-CoreDream-7ExtraBold', 'Black Han Sans', Avenir;
  font-size: 28px;
}
</style>