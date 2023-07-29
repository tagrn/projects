<template>
  <div id="mylistedit" style="text-align:center;">
    <h2 style="font-family: 'S-CoreDream-7ExtraBold', 'TDTDTadakTadak', Avenir, Helvetica, Arial, sans-serif;">나의 영화 리스트 편집 중...
    </h2>
    
    <div class="container font-change2">
      <div class="row">
        <div class="col-2 offset-10">
          <b-button @click="moveMyListDetail" variant="success" id="editing-hover" class="rounded" style="transform: scale(1.2);">완료</b-button>
        </div>
        <br>
        <div v-for="(item, idx) in myList" :key="idx"
        class="col-4 hoverevent-mymovie2" style="color:black; font-size:30px"
        @mouseover="srcUrl=inCard" @mouseleave="srcUrl=outCard"
        >
          <div v-if="srcUrl == outCard" style="line-height:60px;"> `` </div>
          <img v-else :src="srcUrl" alt='' width="60" style="position: relative; top: 220px; z-index: 2; line-height: 0px; float;" @click="deleteMyMovie(idx)">
          <div @click="deleteMyMovie(idx)">
          <div class="card text-white mb-3 font-change2" style="background-color:#888888;">
            <div class="card-body" style="background-color:black;">
              <img :src="item.image" alt="" width="80%" />
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
  name: 'MyListEdit',
  data: function () {
    return {
      myList: [],
      inCard: require('../../assets/whiteX.png'),
      outCard: '',
      srcUrl: require('../../assets/whiteX.png'),
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
    deleteMyMovie: function (idx) {
      const config = this.setToken()
      Axios.delete(`${serverURL}/mylist/detail/${this.myList[idx].id}/`, config)
      .then(() => {
        this.myList.splice(idx, 1)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    moveMyListDetail: function () {
      this.$router.push({name: "MyListDetail"})
    }
  },
  created: function () {
    const config = this.setToken()
    const user = localStorage.getItem('user')
    Axios.get(`${serverURL}/mylist/${user}/`, config)
    .then((res) => {
      this.myList = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  },
}
</script>

<style>

.font-change2 {
  font-family: 'S-CoreDream-3Light', Avenir, Helvetica, Arial, sans-serif;
  font-size: 20px;
  text-align: center;
}
.hoverevent-mymovie2:hover {
  opacity: 0.6;
  /* background:url('../../assets/whiteX.png') no-repeat;
  background-size:100%; */
  transform:scale(1.07);
  transition: 150ms;
  cursor: pointer;
  animation: shakeX; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1s; /* don't forget to set a duration! */
}
#editing-hover:hover {
  opacity:0.6;
}
/* .hoverevent-mymovie:hover:before {
  content:"컨텐츠 보기";
} */

</style>