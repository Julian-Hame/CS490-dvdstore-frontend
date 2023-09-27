<template>
  <div>
    <Navigation />
    <h1>Home</h1>
    <ul>
      <h2>Top Picks:</h2>
      <li v-for="(film, index) in films" :key="film.film_id">
        <router-link :to="{ name: 'movie-details', params: { id: film.film_id } }">
        #{{ index+1 }}: {{ film.title }} {{ film.description }}
        </router-link>
      </li>
      <h2>Top Actors:</h2>
      <li v-for="(actor, index) in actors" :key="actor.actor_id">
        <router-link :to="{ name: 'actor-details', params: { id: actor.actor_id } }">
        #{{ index+1 }}: {{ actor.first_name }} {{ actor.last_name }}
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
      actors: []
    }
  },
  created () {
    axios.get('http://localhost:8081/api/top-picks')
      .then(response => {
        this.films = response.data
      })
      .catch(error => {
        console.error(error)
      })
    axios.get('http://localhost:8081/api/top-actors')
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
