<template>
  <div>
    <Navigation />
    <h1>Movies</h1>
    <form @submit.prevent="rentMovie">
      <h2>Rent out film to customer:</h2>
      <label for="renterId">Customer ID:</label>
      <input type="number" v-model="newRental.renterId" id="renterId" />
      <h4></h4>
      <label for="inventoryId">Inventory ID:</label>
      <input type="number" v-model="newRental.inventoryId" id="inventoryId" />
      <h4></h4>
      <label for="staffId">Your Staff ID:</label>
      <input type="number" v-model="newRental.staffId" id="staffId" />
      <h4></h4>
      <button type="submit">Rent to Customer</button>
    </form>
    <h4>-----------------------------------------------------------------</h4>
    <h2>Film list:</h2>
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
      search: '',
      rentals: [],
      newRental: {
        inventoryId: '',
        renterId: '',
        staffId: '',
      }
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
  methods: {
  rentMovie () {
      axios.post('http://localhost:8081/api/rental', this.newRental).then(response => {
        this.rentals.push(response.data)
        this.newRental = {}
        location.reload()
      }).catch(error => {
        console.log(error)
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
