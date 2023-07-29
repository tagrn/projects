<template>
  <div id="mylistdetail" style="text-align:center;">
    <h2 style="font-family: 'S-CoreDream-7ExtraBold', 'TDTDTadakTadak', Avenir, Helvetica, Arial, sans-serif;">나의 영화 리스트
    </h2>
   
    
    <div class="container font-change2">
   
      <div class="row">
        <div class="col-2 offset-10">
           <b-button @click="moveEditingPage" variant="success" id="editing-hover" class="rounded" style="transform: scale(1.2);">편집</b-button>
        </div>
        <br>
        <br>
        <br>
        <div v-for="(item, idx) in myList" :key="idx"
        class="col-4 hoverevent-mymovie"
        >
          <div @click="moveMovieDetail(idx)">
          <div class="card text-white mb-3" style="background-color:#888888;">
            
            <div class="card-body" style="background-color:black;">
              <img :src="item.image" alt="" width="80%">
            </div>
            <div class="card-header" style="background-color:black;">{{item.title}}</div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import Axios from 'axios'


const serverURL = "https://kgbros-django-server.herokuapp.com"

export default {
  name: 'MyListDetail',
  data: function () {
    return {
      myList: [],
      checkDeleteMoveButton: {},
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
      return config
    },
    moveMovieDetail: function (idx) {
      console.log(this.myList[idx])
      localStorage.setItem('movieDetail', JSON.stringify(this.myList[idx]))
      this.$router.push({name: "MovieDetail"})
    },
    moveEditingPage: function () {
      this.$router.push({name: "MyListEdit"})
    }
  },
  created: function () {
    const user = localStorage.getItem('user')
    if (user) {
      const config = this.setToken()
      Axios.get(`${serverURL}/mylist/${user}/`, config)
      .then((res) => {
        console.log(res)
        this.myList = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
    else {
      alert('로그인 해주세요!')
      this.$router.push({name:'Login'})
    }
  },
}
</script>

<style>

.font-change2 {
  font-family: 'S-CoreDream-3Light', Avenir, Helvetica, Arial, sans-serif;
  font-size: 20px;
  text-align: center;
}
.hoverevent-mymovie:hover {
  opacity: 0.5;
  transform:scale(1.07);
  transition: 150ms;
  cursor: pointer;
}
#editing-hover:hover {
  opacity:0.6;
}
/* .hoverevent-mymovie:hover:before {
  content:"컨텐츠 보기";
} */

</style>