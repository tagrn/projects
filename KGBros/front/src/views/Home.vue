<template>
  <div>
    <b-container>
      <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="10">
          <div class="imgsetting rounded-lg" :style="{ 'backgroundImage': 'url('+selectedMovie.image+')'}">
            <div class="bgsetting">
              <PosterDetail />
            </div>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>

    <b-container>  
      <b-row>
        <b-col cols="12" class="">
          <MovieList />
        </b-col>
      </b-row>
    </b-container>
    <br>
    <br>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieList from '@/components/MovieList.vue'
import PosterDetail from '@/components/PosterDetail.vue'


export default {
  name: 'Home',
  components: {
    MovieList,
    PosterDetail,
    },
  data: function () {
    return {
      noData: "데이터가 없어요.. ㅠㅠ",
      selectedMovie: JSON.parse(localStorage.getItem('movieDetail')),
    }
  },
  created: function () {
  this.selectedMovie = this.$store.state.movie
  }
}
</script>

<style>
.imgsetting {
  background-size: 100%;
  background-repeat: no-repeat;
  
}
.bgsetting {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>