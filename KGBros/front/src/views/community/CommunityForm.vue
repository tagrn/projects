<template>
  <div id='communityform'>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 v-if="checkUpdate" style="font-family: 'S-CoreDream-7ExtraBold', 'Black Han Sans', Avenir;"> 게시글 수정 </h2>
          <h2 v-else style="font-family: 'S-CoreDream-7ExtraBold', 'Black Han Sans', Avenir;"> 게시글 작성 </h2>
          <br>
        </div>
      </div>
      <div class="row">
        <div class="col-6 offset-3">
          <b-input-group prepend="제목">
            <b-form-input type="text" aria-label="Text input" v-model="articleTitle"></b-form-input>
          </b-input-group>
          <br>
          <b-form-textarea
            id="textarea"
            v-model="articleContent"
            placeholder="Enter Content.."
            rows="12"
            max-rows="100"
            @keydown.enter="addToArticle"
          ></b-form-textarea>
          <br>
        </div>
      </div>
      <div class="row">
        <div class="col-6 offset-3">
          <b-button v-if="checkUpdate" @click="updateArticle"> 수정 </b-button>
          <b-button v-else @click="addToArticle"> 작성 </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'


const serverURL = "https://kgbros-django-server.herokuapp.com"

export default {
  name:'CommunityForm',
  data: function () {
    return {
      articleTitle: '',
      articleContent: '',
      checkUpdate: false,
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
    addToArticle: function () {
      const config = this.setToken()
      const articleItem = {
        article_title: this.articleTitle,
        content: this.articleContent,
        get_user: this.$store.state.user,
        showArticle: false,
      }
      Axios.post(`${serverURL}/community/`, articleItem, config)
      .then(() => {
        this.$router.push({name:'Community'})
      })
      .catch((err) => {
        console.log(err)
      })
    },
    updateArticle: function () {
      const config = this.setToken()
      const updateItem = {
        article_title: this.articleTitle,
        content: this.articleContent,
        get_user: this.$store.state.user,
        showArticle: false,
      }
      Axios.put(`${serverURL}/community/${this.$store.state.updateItem.id}/`, updateItem, config)
      .then(() => {
        this.$router.push({name:'Community'})
      })
      .catch((err) => {
        console.log(err)
      })
    },
  },
  created: function () {
    this.articleTitle = this.$store.state.updateItem.articleTitle
    this.articleContent = this.$store.state.updateItem.articleContent
    if (this.articleTitle != '') {
      const tmp = {
        articleTitle: '',
        articleContent: '',
        id: this.$store.state.updateItem.id,
        idx: this.$store.state.updateItem.idx,
      }
      this.checkUpdate = true
      this.$store.dispatch('updateArticle', tmp)
    }
  }
}
</script>

<style>

</style>