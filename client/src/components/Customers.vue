<template>
  <div>
    <Navigation />
    <h1>Customers</h1>
    <ul>
      <h2>All Customers:</h2>
      <li v-for="customer in customers" :key="customer.customer_id">{{ customer.first_name }} {{ customer.last_name }} - ID: {{customer.customer_id}}</li>
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
      customers: []
    }
  },
  created () {
    axios.get('http://localhost:8081/api/customers')
      .then(response => {
        this.customers = response.data
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>

<style scoped>

</style>
