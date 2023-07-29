<template>
  <div id="ssafyrecommended">
    <h2 style="font-family:'S-CoreDream-7ExtraBold', Avenir;"> 싸피인들의 추천 영화 </h2>
    <br>
    <br>
    <br>
    <img class="hoverevent-myselected-movie" :src="movieUrl" alt="" width="100%" @click="getSelectedMovie">
    <br>
  <br>
  <br>
  <br>
  </div>
  
</template>

<script>
import _ from 'lodash'
import Axios from 'axios'


const serverURL = "https://kgbros-django-server.herokuapp.com"

export default {
  name:"SSAFYRecommended",
  data: function () {
    return {
      movieItem2: {
        movie_id:'',
        title:'',
        image:'',
        genre_ids:'',
        userRation:'',
        pubDate:'',
        overview:'',
      },
      movieList: ['339877', '448491', '129', '296096', '116745'],
      selectedMovie: 0,
      movieUrl: '',
    }
  },
  created: function () {
      let i = _.random(0, this.movieList.length-1)
      this.selectedMovie = this.movieList[i]
      this.movieUrl = require(`../assets/${this.movieList[i]}.jpg`)
  },
  methods: {
    getSelectedMovie: function () {
      Axios.get(`${serverURL}/reviews/search/detail/${this.selectedMovie}/`)
      .then((res) => {
        console.log(res)
        this.movieItem2.movie_id = res.data.id
        this.movieItem2.title = _.unescape(res.data.title)
        if (res.data.poster_path) {
          this.movieItem2.image = "https://image.tmdb.org/t/p/w500/" + res.data.poster_path
        }
        else {
          this.movieItem2.image = ""
        }
        this.movieItem2.genre_ids = res.data.genre_ids
        this.movieItem2.pubDate = res.data.release_date
        this.movieItem2.userRation = res.data.vote_average
        this.movieItem2.overview = res.data.overview
        this.$store.dispatch('createMovie', this.movieItem2)
        localStorage.setItem('movieDetail', JSON.stringify(this.movieItem2))
        this.$router.push({name:'MovieDetail'})
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.hoverevent-myselected-movie:hover {
  opacity: 0.5;
  transform:scale(1.07);
  transition: 150ms;
  cursor: pointer;
}
</style>