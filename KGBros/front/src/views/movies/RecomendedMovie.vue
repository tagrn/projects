<template>
  <div id="recomendedmovie">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <br>
          <div v-if="visibleRecommendedMovie">
            <h2 style="font-family:'S-CoreDream-7ExtraBold'">사용자 기반 추천 영화</h2>
            <br>
            <div class="hoverevent-myquestion-mark">
              <img :src="movieItem2.image" alt="" width="70%" @click="moveMovieDetail2">
              <br>
              <br>
              <h2 style="font-size:26px; cursor:pointer;" @click="moveMovieDetail2">{{movieItem2.title}}</h2>
            </div>
            
          </div>
          <div v-else>
            <h2 style="font-family:'S-CoreDream-7ExtraBold'">김의 추천 영화</h2>
            <img :src="mintQM" alt="" @click="getRecommendedMovie" class="hoverevent-myquestion-mark">
          </div>
        </div>
        <div class="col-6">
          
          <br>
          <div v-if="visibleRandomMovie">
            <h2 style="font-family:'S-CoreDream-7ExtraBold'">랜덤 추천 영화</h2>
            <br>
            <div class="hoverevent-myquestion-mark">
              <img :src="movieItem.image" alt="" width="70%" @click="moveMovieDetail">
              <br>
              <br>
              <h2 style="font-size:26px; cursor:pointer;" @click="moveMovieDetail">{{movieItem.title}}</h2>
              </div>
          </div>
          <div v-else>
            <h2 style="font-family:'S-CoreDream-7ExtraBold'">구의 추천 영화</h2>
            <img :src="yellowQM" alt="" @click="getRandomMovie" class="hoverevent-myquestion-mark">
          </div>
          <br>
        <br>
        <br>
        </div>
        <div class="col-12">
          <SSAFYRecommended />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import _ from "lodash"
import SSAFYRecommended from '@/components/SSAFYRecommended.vue'


const serverURL = "https://kgbros-django-server.herokuapp.com"

export default {
  name:"RecomendedMovie",
  components: {
    SSAFYRecommended,
  },
  data: function () {
    return {
      movieItem: {
        movie_id:'',
        title:'',
        image:'',
        genre_ids:'',
        userRation:'',
        pubDate:'',
        overview:'',
      },
      movieItem2: {
        movie_id:'',
        title:'',
        image:'',
        genre_ids:'',
        userRation:'',
        pubDate:'',
        overview:'',
      },
      myList: '',
      mintQM : require("../../assets/mintQM.png"),
      yellowQM : require("../../assets/yellowQM.png"),
      visibleRandomMovie: false,
      visibleRecommendedMovie: false,
    }
  },
  methods: {
    moveMovieDetail : function () {
      if (localStorage.getItem('user')) {
        this.$store.dispatch('createMovie', this.movieItem)
        localStorage.setItem('movieDetail', JSON.stringify(this.movieItem))
        this.$router.push({name:'MovieDetail'})
      }
      else {
        alert('로그인 해주세요!')
        this.$router.push({name:'Login'})
      }
    },
    moveMovieDetail2 : function () {
      if (localStorage.getItem('user')) {
        this.$store.dispatch('createMovie', this.movieItem2)
        localStorage.setItem('movieDetail', JSON.stringify(this.movieItem2))
        this.$router.push({name:'MovieDetail'})
      }
      else {
        alert('로그인 해주세요!')
        this.$router.push({name:'Login'})
      }
    },
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
      return config
    },
    getRecommendedMovie: function () {
      const config = this.setToken()
      const user = localStorage.getItem('user')
      axios.get(`${serverURL}/mylist/${user}/`, config)
      .then((res) => {
        console.log(res)
        if (res.data.length) {
          const randomNum = _.random(0, res.data.length-1)
          const movie_id = res.data[randomNum].movie_id
          axios.get(`${serverURL}/reviews/search/recommended/${movie_id}/`)
          .then((res) => {
            console.log(res)
            let randomDetailNum = _.random(0, 19)
            this.movieItem2.movie_id = res.data.data[randomDetailNum].id
            this.movieItem2.title = _.unescape(res.data.data[randomDetailNum].title)
            if (res.data.data[randomDetailNum].poster_path) {
              this.movieItem2.image = "https://image.tmdb.org/t/p/w500/" + res.data.data[randomDetailNum].poster_path
            }
            else {
              this.movieItem2.image = ""
            }
            this.movieItem2.genre_ids = res.data.data[randomDetailNum].genre_ids
            this.movieItem2.pubDate = res.data.data[randomDetailNum].release_date
            this.movieItem2.userRation = res.data.data[randomDetailNum].vote_average
            this.movieItem2.overview = res.data.data[randomDetailNum].overview
            
            this.visibleRecommendedMovie = true
          })
          .catch((err) => {
            console.log(err)
          })
        }
        else {
          alert('나의 리스트에 등록된 영화가 없습니다.')
        }
      })
      .catch((err) => {
        console.log(err)
      })
      
      
    },

    getRandomMovie: function () {
      axios.get(`${serverURL}/reviews/search/random/`)
      .then((res) => {
        console.log(res)
        let randomDetailNum2 = _.random(0, 19)
        this.movieItem.movie_id = res.data.data[randomDetailNum2].id
        this.movieItem.title = _.unescape(res.data.data[randomDetailNum2].title)
        if (res.data.data[randomDetailNum2].poster_path) {
          this.movieItem.image = "https://image.tmdb.org/t/p/w500/" + res.data.data[randomDetailNum2].poster_path
        }
        else {
          this.movieItem.image = ""
        }
        this.movieItem.genre_ids = res.data.data[randomDetailNum2].genre_ids
        this.movieItem.pubDate = res.data.data[randomDetailNum2].release_date
        this.movieItem.userRation = res.data.data[randomDetailNum2].vote_average
        this.movieItem.overview = res.data.data[randomDetailNum2].overview
        this.$store.dispatch('createMovie', this.movieItem)
        localStorage.setItem('movieDetail', JSON.stringify(this.movieItem))
        this.visibleRandomMovie = true
      })
      .catch((err) => {
        console.log(err)
      })
    },
  },
  created: function () {
    const user = localStorage.getItem('user')
    if (user) {
      console.log(user)
    }
    else {
      alert('로그인 해주세요!')
      this.$router.push({name:'Login'})
    }
  }
}
</script>

<style>
.hoverevent-myquestion-mark:hover {
  opacity: 0.5;
  transform:scale(1.07);
  transition: 150ms;
  cursor: pointer;
}
</style>