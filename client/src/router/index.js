import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Movies from '@/components/Movies'
import Customers from '@/components/Customers'
import MovieDetail from '@/components/MovieDetail'
import ActorDetail from '@/components/ActorDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers
    },
    {
      path: '/movies/:id',
      name: 'movie-details',
      component: MovieDetail,
      props: true
    },
    {
      path: '/actors/:id',
      name: 'actor-details',
      component: ActorDetail,
      props: true
    }
  ]
})
