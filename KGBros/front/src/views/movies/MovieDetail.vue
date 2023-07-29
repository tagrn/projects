<template>
  <div id='moviedetail' >
    <h1 style="font-family:'S-CoreDream-7ExtraBold', Avenir;"> 김구의 영화정보 </h1>
    <br>
    <br>
    <br>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <img :src="movie.image" alt="" width="100%">
        </div>
        <div class="col-7 font-change offset-1">
          <h2><span v-html="movie.title"> </span></h2>
          <br>
          <br>
          <div style="font-size:20px"> {{ movie.overview || noData }} </div>
          <br>
          <br>
          개봉일 : {{ movie.pubDate || noData }}
          <br>
          <br>
          평점 : {{ movie.userRation || noData }}
          <br>

        </div>
        <div class="col-6 offset-6 font-change text-right" style="scale(1.9)">
          나의 리스트 추가  <button class="btn rounded-circle btn-success" @click="addToMyList">+</button>
        </div>
        <div class="col-7 offset-5 font-change">
          <br>
          <MovieReview
            :movie="movie"
          />
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import MovieReview from '@/components/MovieReview.vue'
import Axios from 'axios'


const serverURL = "https://kgbros-django-server.herokuapp.com"

export default {
  name: 'MovieDetail',
  components: {
    MovieReview,
  },
  data: function () {
    return {
      movie: JSON.parse(localStorage.getItem('movieDetail')),
      noData: "데이터가 없어요.. ㅠㅠ",
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
    addToMyList: function () {
      const config = this.setToken()
      const user = localStorage.getItem('user')
      const movieItem = {
        'movie_id': this.movie.movie_id,
        'title' : this.movie.title,
        'image' : this.movie.image,
        'overview' : this.movie.overview || '데이터가 없어요 ㅠㅠ',
        'get_user' : user,
        'pubDate' : this.movie.pubDate || '데이터가 없어요 ㅠㅠ',
        'userRation' : this.movie.userRation,
      }
      Axios.get(`${serverURL}/mylist/${user}/`, config)
      .then((res) => {
        let check = true
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].title == movieItem.title) {
            alert('이미 나의 리스트에 추가되어 있어요!')
            check = false
            break
          }
        }
        if (check) {
          Axios.post(`${serverURL}/mylist/${user}/`, movieItem, config)
          .then(() => {
            this.$router.push({name:'MyListDetail'})
          })
          .catch((err) => {
            console.log(err)
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

.font-change {
  font-family: 'S-CoreDream-3Light', 'S-CoreDream-7ExtraBold', Avenir, Helvetica, Arial, sans-serif;
  font-size: 22px;
  text-align: start;
}

</style>