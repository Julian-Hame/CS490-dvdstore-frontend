<template>
    <div>
        <div v-for="actor in actors" :key="actor.actor_id">
            <h1>{{ actor.first_name }} {{ actor.last_name }}</h1>
        </div>
        <h2>Most rented films featuring this actor:</h2>
        <div v-for="(film, index) in films" :key="film.film_id">
            <h4>#{{ index+1 }}: {{ film.title }}</h4>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],
  data () {
    return {
      actors: [],
      films: []
    }
  },
  created () {
    axios.get(`http://localhost:8081/api/actor/${this.id}`)
      .then(response => {
        this.actors = response.data
      })
      .catch(error => {
        console.error(error)
      })
    axios.get(`http://localhost:8081/api/actor-top-films/${this.id}`)
      .then(response => {
        this.films = response.data
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>
