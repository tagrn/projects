<template>
  <div id="community">
    <h2 id="font-change" style="font-family:'S-CoreDream-7ExtraBold'">김구의 게시판</h2>
    <br>
    <div class="container">
      <div class="row">
        <div class="col-2 offset-10">
          <b-button @click="addToArticle" id="font-change" variant="success" style="transform: scale(1.2)"> 작성 </b-button>
        </div>
      </div>
      <br>
      <br>
      <div class="row">
        <div class="col-12 border lg py-3"
        style="text-align: start; border-color:#393e46; background-color: white; opacity:0.8;"
        >
          <div class="d-flex font-change-communication" style="cursor:default;">
            <div class="col-2" style="font-weight: bold;"> 아이디 </div>
            <div class="col-6 offset-4" style="font-weight: bold;"> 제목 </div>
          </div>
          <hr style="border: solid 1px #c0d8c0;">
          <div
          v-for="(article, idx) in articles"
          :key=idx
          >
            <div @click="showArticleDetail(idx)" >
              <div
              id="get-hover-effect"
              class="d-flex font-change-small"
              style="cursor:pointer;"
              >
              <div class="col-2">{{ article.get_user }}</div>
              <div class="col-8">{{ article.article_title }}</div>
              <div class="col-2">{{ article.created_at.substring(0, 10) }} {{ article.created_at.substring(11, 19) }} </div>
              </div>
            </div>
            <div v-if="article.showArticle">
              <Article :article="article" />
              <div v-if="checkLoginUser === article.get_user">
                <button @click="removeArticle(article.id, idx)" class="btn btn-outline-secondary btn-light" type="button" style="color:black;">글 삭제</button>
                <button @click="updateArticle(article.id, idx)" class="btn btn-outline-secondary btn-light" type="button" style="color:black;">글 수정</button>
              </div>
              <!-- <Article :article="article" /> -->
            </div>

            <hr class="content-hr" width= "100%" align="left">
          </div>
        </div>
      </div>
    </div>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import Axios from 'axios'
import Article from '@/components/community/Article.vue'


const serverURL = "https://kgbros-django-server.herokuapp.com"

export default {
  name: 'Community',
  components: {
    Article,
  },
  data: function () {
    return {
      checkLoginUser: '',
      comments: [],
      articles: [],
    }
  },
  methods: {
    addToArticle: function () {
      this.$router.push({name:'CommunityForm'})
    },
    showArticleDetail: function (idx) {
      this.articles[idx].showArticle = !this.articles[idx].showArticle
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
    removeArticle: function (id, idx) {
      const config = this.setToken()
      Axios.delete(`${serverURL}/community/${id}/`, config)
      .then(() => {
        this.articles.splice(idx, 1)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    updateArticle: function (id, idx) {
      const updateItem = {
        articleTitle: this.articles[idx].article_title,
        articleContent: this.articles[idx].content,
        id: id,
        idx: idx,
      }
      this.$store.dispatch('updateArticle', updateItem)
      this.$router.push({name:"CommunityForm"})
    },
  },
  computed: {
    
  },

  created: function () {
    if (localStorage.getItem('user')) {
      const config = this.setToken()
      this.checkLoginUser = this.$store.state.user
      Axios.get(`${serverURL}/community/`, config)
      .then((res) => {
        this.articles = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
    
    else {
      alert('로그인 해주세요!')
      this.$router.push({name:'Login'})
    }
  }
}
</script>

<style>
#get-hover-effect:hover {
  font-size: 22px;
  background-color: #c0d8c0;
  transition: 500ms;
}

#font-change {
  font-family: 'S-CoreDream-3Light', 'Black Han Sans', Avenir;
}

.font-change-communication {
  font-family: 'S-CoreDream-3Light', Avenir;
  cursor:pointer;
  color: black;
  font-size: 25px;
}

.font-change-small {
  font-family: 'S-CoreDream-3Light', Avenir;
  cursor:pointer;
  color: black;
  font-size: 20px;
}

.content-hr {
  height: 10px;
  border: 0;
  box-shadow: 0 10px 10px -10px #bbb inset;
}

</style>