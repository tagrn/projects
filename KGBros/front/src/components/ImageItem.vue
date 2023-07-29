<template>
 <div>
    <b-card-group  deck >
      <div v-for="(data, idx) in movieData" :key="idx" class="col-sm-3 offset-sm-0 col-8 offset-2">
        <div class="card">
          <a href="javascript:scroll(0,0)">
          <img @click="moveMovieDetail(data)"
          :src="imageUrl(data)" class="card-img-top" alt="데이터가 없어요.. ㅠㅠ"
          style="cursor:pointer;"
          >
          </a>
        </div>
      </div>
    </b-card-group>
  </div>
</template>


<script>
import _ from 'lodash'


export default {
  name: 'ImageItem',
  props: {
    movieData: [String, Array],
  },
  data: function () {
    return {
      movieItem: {
        id:'',
        title:'',
        image:'',
        genre_ids:'',
        userRation:'',
        pubDate:'',
        overview:'',
      }
    }
  },
  methods: {
    moveMovieDetail: function (data) {
      this.movieItem.movie_id = data.id
      this.movieItem.title = _.unescape(data.title)
      if (data.poster_path) {
        this.movieItem.image = "https://image.tmdb.org/t/p/w500/" + data.poster_path
      }
      else {
        this.movieItem.image = ""
      }
      this.movieItem.genre_ids = data.genre_ids
      this.movieItem.pubDate = data.release_date
      this.movieItem.userRation = data.vote_average
      this.movieItem.overview = data.overview
      this.$store.dispatch('createMovie', this.movieItem)
      localStorage.setItem('movieDetail', JSON.stringify(this.movieItem))
      // this.$router.push({name:'MovieDetail'})
    }
  },
  computed:{
    imageUrl: function () {
      return (data) => {
        if (data.poster_path != null) {
          return "https://image.tmdb.org/t/p/w500/" + data.poster_path
        }
        else {
          console.log(data.poster_path)
          return require("../assets/blackX.png")
        }
        
      }
    }
  }
}
</script>

<style>

</style>