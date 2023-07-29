import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '@/views/accounts/Signup'
import Login from '@/views/accounts/Login'
import MovieDetail from '@/views/movies/MovieDetail'
import MyListDetail from '@/views/movies/MyListDetail'
import MyListEdit from '@/views/movies/MyListEdit'
import MyListApp from '@/views/movies/MyListApp'
import RecomendedMovie from '@/views/movies/RecomendedMovie'
import Community from '@/views/community/Community'
import CommunityForm from '@/views/community/CommunityForm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: `/signup/`,
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/movies/',
    name: 'MovieDetail',
    component: MovieDetail,
  },
  {
    path: '/mylist/',
    name: 'MyListDetail',
    component: MyListDetail,
  },
  {
    path: '/mylistedit/',
    name: 'MyListEdit',
    component: MyListEdit,
  },
  {
    path: '/mylistapp/',
    name: 'MyListApp',
    component: MyListApp,
  },
  {
    path: '/recomendedmovie/',
    name: 'RecomendedMovie',
    component: RecomendedMovie,
  },
  {
    path: '/community/',
    name: 'Community',
    component: Community,
  },
  {
    path: '/communityform/',
    name: 'CommunityForm',
    component: CommunityForm,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
