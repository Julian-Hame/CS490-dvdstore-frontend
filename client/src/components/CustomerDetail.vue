<template>
    <div>
        <h1>About this customer:</h1>
        <div v-for="customer in customers" :key="customer.customer_id">
            <h2>{{ customer.first_name }} {{ customer.last_name }} (ID: {{ customer.customer_id }})</h2>
            <h4>Email: {{ customer.email }}</h4>
            <h4>Patron of store #{{ customer.store_id }}</h4>
        </div>
        <h4>--------------------------------------------</h4>
        <h2>Films rented:</h2>
        <div v-for="film in rents" :key="film.film_id">
            <h4>{{ film.title }}</h4>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],
  data () {
    return {
      customers: [],
      rents: []
    }
  },
  created () {
    axios.get(`http://localhost:8081/api/customer/${this.id}`)
      .then(response => {
        this.customers = response.data
      })
      .catch(error => {
        console.error(error)
      })
    axios.get(`http://localhost:8081/api/customer-rented/${this.id}`)
      .then(response => {
        this.rents = response.data
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>
