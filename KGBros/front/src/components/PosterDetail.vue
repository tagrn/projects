<template>
  <div class="desc container">
    <div class="row">
      <div class="col-12">
       <br>
    <h1 v-html="selectedMovie.title"></h1>
    <hr color=#999999>
    <!-- <h4 v-if="selectedMovie.pubDate">개봉일 : {{ selectedMovie.pubDate || noData  }}</h4>
    <h4 v-if="selectedMovie.overview">줄거리 : {{ selectedMovie.overview || noData  }}</h4>
    <h4 v-if="selectedMovie.userRation">평점 : {{ selectedMovie.userRation || noData  }}</h4> -->
    <div v-if="selectedMovie.pubDate">
      <h5>{{ selectedMovie.pubDate || noData  }}</h5>
      <br>
      <h5>평점 : {{ selectedMovie.userRation || noData  }}</h5>
      <br>
      <h6 style="line-height: 35px;">{{ selectedMovie.overview || noData  }}</h6>
      <h3></h3>
      <br>
      <b-button @click="moveMovieDetail" variant="success">상세보기</b-button>
      <br>
    </div>
    <div v-else>
      <h4>영화를 선택해주세요</h4>
      <!-- <div class="alert alert-success" role="alert">
        <h4>영화를 선택해주세요</h4>
      </div> -->
    </div>
    </div>
    </div>
    <br>
  </div>
   
</template>

<script>
export default {
  name: 'PosterDetail',
  data() {
    return {
      noData: "데이터가 없어요.. ㅠㅠ",
      selectedMovie: JSON.parse(localStorage.getItem('movieDetail')),
    };
  },
  created: function () {
    this.selectedMovie = this.$store.state.movie
  },
  methods: {
    moveMovieDetail: function () {
      if (localStorage.getItem('user')) {
        this.$router.push({name:'MovieDetail'})
      }
      else {
        alert('로그인 해주세요!')
        this.$router.push({name:'Login'})
      }
    }
  }
};
</script>

<style>
h3 {
  font-family: 'Black Han Sans', Avenir;
}

.desc {
  opacity: 1;
}

</style>