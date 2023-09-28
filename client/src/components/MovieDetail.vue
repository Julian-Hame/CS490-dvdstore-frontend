<template>
    <div>
        <div v-for="film in films" :key="film.film_id">
            <h1>{{ film.title }} ({{ film.release_year }})</h1>
            <h4>{{ film.description }}</h4>
            <h4>Duration: {{ film.length }} minutes</h4>
            <h4>Age Rating: {{ film.rating }}</h4>
            <h4>Special Features: {{ film.special_features }}</h4>
        </div>
        <div v-for="genre in genres" :key="genre.film_id">
            <h4>Genre: {{ genre.name }}</h4>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],
  data () {
    return {
      films: [],
      genres: []
    }
  },
  created () {
    axios.get(`http://localhost:8081/api/film/${this.id}`)
      .then(response => {
        this.films = response.data
      })
      .catch(error => {
        console.error(error)
      })
    axios.get(`http://localhost:8081/api/film-genre/${this.id}`)
      .then(response => {
        this.genres = response.data
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>
