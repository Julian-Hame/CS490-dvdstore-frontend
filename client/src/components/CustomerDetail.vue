<template>
  <div>
      <h1>About this customer:</h1>
      <div v-for="customer in customers" :key="customer.customer_id">
          <h2>{{ customer.first_name }} {{ customer.last_name }} (ID: {{ customer.customer_id }})</h2>
          <h4>Email: {{ customer.email }}</h4>
          <h4>Patron of store #{{ customer.store_id }}</h4>
          <h4>-----------------------------------------------------------------</h4>
          <h2>Edit Customer:</h2>
          <form>
              <label for="firstName">First Name:</label>
              <input type="text" id="firstName" v-model="customer.first_name" />
              <h4></h4>
              <label for="lastName">Last Name:</label>
              <input type="text" id="lastName" v-model="customer.last_name" />
              <h4></h4>
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="customer.email" />
              <h4></h4>
              <label for="storeId">Store ID:</label>
              <input type="text" id="storeId" v-model="customer.store_id" />
              <h4></h4>
              <button @click="editCustomer(customer)">Save Changes</button>
          </form>
      </div>
      <h4>-----------------------------------------------------------------</h4>
      <h2>Films rented:</h2>
      <div v-for="film in rents" :key="film.film_id">
        <h4>{{ film.title }} | Return status: {{ film.return_date ? film.return_date : 'Not returned' }}</h4>
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
  methods: {
    editCustomer (customer) {
      const id = customer.customer_id
      const updatedCustomer = {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        store_id: customer.store_id
      }
      axios.put(`http://localhost:8081/api/customer/${id}/update`, updatedCustomer)
        .then(response => {
          console.log('Customer successfully updated')
          location.reload()
        })
        .catch(error => {
          console.error('Error updating customer:', error)
        })
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
