<template>
  <div>
    <Navigation />
    <h1>Movies</h1>
    <ul>
      <h2>All Films:</h2>
      <li v-for="film in films" :key="film.film_id">{{ film.title }}</li>
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
      films: []
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
  }
}
</script>

<style scoped>

</style>
