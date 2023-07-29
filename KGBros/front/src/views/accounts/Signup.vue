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
      <input style="font-size:25px;" type="password" id="password" v-model="credentials.password">
    </div>
    <br>
    <div class="text-left d-flex">
      <label for="password2">비번확인 : <span style="color:black;">.</span> </label>
      <input style="font-size:25px;" type="password" id="password2" v-model="credentials.password2" @keydown.enter="signup">
    </div>
    <br>
    <b-button @click="signup" variant="success">가입</b-button>
  </div>
</template>

<script>
import axios from 'axios'


const serverURL = "https://kgbros-django-server.herokuapp.com"

export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
        password2: '',
      }
    }
  },
  methods: {
    signup: function () {
      axios.post(`${serverURL}/accounts/signup/`, this.credentials)
      .then(res => {
        console.log(res.data)
        this.$router.push({name: 'Login'})
      })
      .catch(err => {
        alert('사용자가 이미 있거나 비밀번호확인이 틀립니다')
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>