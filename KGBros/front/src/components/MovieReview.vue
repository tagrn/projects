<template>
  <div>
    <div class="d-flex">
      <div class="col-8">
        <b-input-group prepend="리뷰">
          <b-form-input type="text" aria-label="Text input" v-model="detailReview" @keydown.enter="addToReview"></b-form-input>
          <div class="input-group-append">
            <button @click="addToReview" class="btn btn-outline-secondary btn-success" type="button" style="color:white;">작성</button>
          </div>
        </b-input-group>
      </div>
      <div class="col-4">
        <b-form-rating style="background-color:black; color:yellow; border:solid; border-width:0px;" v-model="gradeReview"></b-form-rating>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-7" style="text-align:center;">
        리뷰
      </div>
      <div class="col-4" style="text-align:center;">
        평점
      </div>
    </div>
    <hr color="white">
    <div
      v-for="(review, idx) in reviewList"
      :key=idx
      class="d-flex"
    >
      <div class="col-7">
        {{ review.get_user }}: {{ review.content }}
      </div>
      <div class="col-4">
        <b-form-rating style="background-color:black; color:yellow; border:solid; border-width:0px;" v-model="review.grade" readonly></b-form-rating>
      </div>
      <div v-if="review.get_user == user" class="col-1" style="cursor:pointer;" @click="deleteReview(idx)">
        X
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
  name: 'MovieReview',
  data: function () {
    return {
      detailReview: '',
      gradeReview: 5,
      reviewList: [],
      user: localStorage.getItem('user'),
    }
  },
  props: {
    movie: Object,
  },
  methods: {
    addToReview: function () {
      const config = this.setToken()
      const reviewItem = {
        movie_title: this.movie.title,
        get_user: this.$store.state.user,
        content: this.detailReview,
        grade: this.gradeReview,
      }
      Axios.post(`${serverURL}/reviews/detail/${this.movie.title}/`, reviewItem, config)
      .then((res) => {
        console.log(res)
        this.detailReview=''
        this.gradeReview=5
        this.reviewList.push(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
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
    deleteReview: function (idx) {
      const config = this.setToken()
      console.log(this.reviewList)
      Axios.delete(`${serverURL}/reviews/detail/delete/${this.reviewList[idx].id}/`, config)
      .then((res) => {
        console.log(res)
        this.reviewList.splice(idx, 1)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  created: function () {
    const config = this.setToken()
    Axios.get(`${serverURL}/reviews/detail/${this.movie.title}/`, config)
    .then((res) => {
      this.reviewList = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style>

</style>