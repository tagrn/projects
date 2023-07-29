<template>
  <div class="font-change-communication">
    <!-- <hr>
    <h1 style="text-align:center; font-size:25px">{{article.article_title}}</h1> -->
    <hr>
    <br>
    <p style="text-align:center;">{{article.content}}</p>
    <br>
    

    <b-input-group prepend="댓글">
      <b-form-input type="text" aria-label="Text input" style="text-align:start;" v-model="inputComment" @keydown.enter="addToComment"></b-form-input>
      <div class="input-group-append">
        <button @click="addToComment" class="btn btn-outline-secondary btn-success" type="button" style="color:white;">작성</button>
      </div>
    </b-input-group>

      <!-- <label for="comment">댓글 작성 : </label>
      <input style="text-align:center;" type="text" id="comment" v-model="inputComment" @keydown.enter="addToComment">
      <button @click="addToComment"> 작성 </button> -->

    <!-- <b-row>
      <b-col></b-col> -->
      <br>
      <div class="d-flex" v-for="(comment, idx) in commentList" :key=idx>
        <div class="row-reverse col-9">
          {{comment.get_user}}: {{ comment.content }}
        </div>
        <div v-show="checkLoginUser === comment.get_user" class="col-3 text-right">
          <button @click="removeComment(comment.id, idx)" class="btn btn-outline-secondary btn-light" type="button" style="color:black;"> 삭제 </button>
        </div>
        <br>
        <br>
      </div>
      <!-- <b-col></b-col>
    </b-row> -->

  </div>
</template>

<script>
import Axios from 'axios'


const serverURL = "https://kgbros-django-server.herokuapp.com"

export default {
  name:"Article",
  data: function () {
    return {
      checkLoginUser: '',
      inputComment: '',
      commentList: [],
    }
  },
  props: {
    article: [Object, ]
  },
  methods:{
    addToComment: function () {
      const config = this.setToken()
      const commentItem = {
        article_id: this.article.id,
        get_user: this.$store.state.user,
        content: this.inputComment,
      }
      Axios.post(`${serverURL}/community/${this.article.id}/comment/`, commentItem, config)
      .then((res) => {
        console.log(res)
        this.commentList.push(res.data)
        this.inputComment=''
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
    removeComment: function (id, idx) {
      const config = this.setToken()
      Axios.delete(`${serverURL}/community/${this.article.id}/comment/${id}/`, config)
      .then(() => {
        this.commentList.splice(idx, 1)
      })
      .catch((err) => {
        console.log(err)
      })
    },
  },
  created: function () {
    const config = this.setToken()
    this.checkLoginUser = this.$store.state.user
    Axios.get(`${serverURL}/community/${this.article.id}/comment/`, config)
    .then((res) => {
      this.commentList = res.data
    })
  }
}
</script>

<style scoped>

.font-change-communication {
  font-family: 'S-CoreDream-3Light', Avenir;
  font-size: 20px;
  cursor:default;
  color:black;
}

</style>