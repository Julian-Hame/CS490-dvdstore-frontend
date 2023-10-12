<template>
  <div>
    <Navigation />
    <h1>Movies</h1>
    <ul>
      <input type="text" v-model="search" placeholder="Search by name or genre...">
      <h5>Click on a film to view its details.</h5>
      <li v-for="film in filmSearch" :key="film.film_id">
        <router-link :to="{ name: 'movie-details', params: { id: film.film_id } }">
        {{ film.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Navigation from '@/components/Nav'

export default {
  components: {
    Navigation
  },
  data () {
    return {
      films: [],
      actors: [],
      search: ''
    }
  },
  computed: {
    filmSearch () {
      return this.films.filter((film) => {
        const query = this.search
        return (
          film.title.toString().includes(query.toUpperCase()) ||
          film.name.toString().toLowerCase().includes(query.toLowerCase())
        )
      })
    }
  },
  created () {
    axios.get('http://localhost:8081/api/films')
      .then(response => {
        this.films = response.data
      })
      .catch(error => {
        console.error(error)
      })
    axios.get('http://localhost:8081/api/film-actors')
      .then(response => {
        this.actors = response.data
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>

<style scoped>

</style>
