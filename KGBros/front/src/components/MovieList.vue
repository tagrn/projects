<template>
  <div>
    <hr>
    <hr>
    <h3 style="font-family: 'S-CoreDream-7ExtraBold'">인기 영화</h3>
    <hr>
    <ImageItem :movieData="popularMovieData"/>
    <br>
    <br>
    <br>
    <br>
    <h3 style="font-family: 'S-CoreDream-7ExtraBold'">개봉 예정 영화</h3>
    <hr>
    <ImageItem :movieData="upcomingMovieData"/>
    <br>
    <br>
    <br>
    <br>
    <h3 style="font-family: 'S-CoreDream-7ExtraBold'">현재 상영 영화</h3>
    <hr>
    <ImageItem :movieData="nowPlayingMovieData"/>
    <br>
    <br>
  </div>
</template>

<script>
import ImageItem from './ImageItem.vue'
// import _ from 'lodash'
// import he from 'he'
import axios from 'axios'


const serverURL = "https://kgbros-django-server.herokuapp.com"

export default {
  name: 'MovieList',
  components: {
    ImageItem,
  },
  data: function () {
    return{
      popularMovieData: '',
      upcomingMovieData: '',
      nowPlayingMovieData: '',
    }
  },
  created: function () {
    axios.get(`${serverURL}/reviews/search/popular/`)
    .then((res) => {
      console.log(res)
      this.popularMovieData = res.data.data
      // for (let i = 0; i < this.movieData.length; i++) {
      //   console.log(this.movieData[i].title)
      //   this.movieData[i].title = _.unescape(this.movieData[i].title);
      //   this.movieData[i].title = he.decode(this.movieData[i].title);
      //   console.log(this.movieData[i].title)
      // }
      
    })
    .catch((err) => {
      console.log(err)
    })

    axios.get(`${serverURL}/reviews/search/upcoming/`)
    .then((res) => {
      console.log(res)
      this.upcomingMovieData = res.data.data      
    })
    .catch((err) => {
      console.log(err)
    })

    axios.get(`${serverURL}/reviews/search/now_playing/`)
    .then((res) => {
      console.log(res)
      this.nowPlayingMovieData = res.data.data      
    })
    .catch((err) => {
      console.log(err)
    })
  },
}
  // methods: {
  //   testGet: function () {
  //     const NAVER_CLIENT_ID = 'pYTCL27cONHuIDR_Cddj'
  //     const NAVER_CLIENT_SECRET = 'E6QP6pD1YM'

  //     axios.get('https://openapi.naver.com/v1/search/movie.json',{
  //       params:{
  //         query:"",
  //         display:20,
  //       },
  //       headers:{
  //         'X-Naver-Client-Id':NAVER_CLIENT_ID,
  //         'X-Naver-Client-Secret':NAVER_CLIENT_SECRET
  //       }
  //     })
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  //   }
  // }

</script>

<style>

h3 {
  font-family: 'Black Han Sans', Avenir;
}

</style>