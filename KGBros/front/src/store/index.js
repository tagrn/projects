import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movie: {
      title:'',
      image:'',
      genre_ids:'',
      userRation:'',
      pubDate:'',
      overview:'',
    },
    user: localStorage.getItem('user'),
    updateItem: {
      articleTitle: '',
      articleContent: '',
      id: '',
      idx: '',
    },
  },
  mutations: {
    CREATE_MOVIE: function (state, movieItem) {
      state.movie.title = movieItem.title
      state.movie.image = movieItem.image
      state.movie.genre_ids = movieItem.genre_ids
      state.movie.userRation = movieItem.userRation
      state.movie.pubDate = movieItem.pubDate
      state.movie.overview = movieItem.overview
    },
    CREATE_USER: function (state, user) {
      state.user = user
    },
    UPDATE_ARTICLE: function (state, articleData) {
      state.updateItem = articleData
    },
  },
  actions: {
    createMovie: function (context, movieItem) {
      context.commit('CREATE_MOVIE', movieItem)
    },
    createUser: function (context, user) {
      context.commit('CREATE_USER', user)
    },
    updateArticle: function (context, articleData) {
      context.commit('UPDATE_ARTICLE', articleData)
    },
  },

})
