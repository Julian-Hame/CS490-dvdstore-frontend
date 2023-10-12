<template>
  <div>
    <Navigation />
    <h1>Customers</h1>
    <button @click="generatePDF">Save as PDF</button>
    <input type="text" v-model="search" placeholder="Search by ID or name...">
    <h5>Click on a customer to view their details.</h5>
    <ul>
      <li v-for="customer in customerSearch" :key="customer.customer_id">
        <router-link :to="{ name: 'customer-details', params: { id: customer.customer_id } }">
        {{ customer.first_name }} {{ customer.last_name }} (ID: {{ customer.customer_id }})
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Navigation from '@/components/Nav'
import JsPDF from 'jspdf'

export default {
  components: {
    Navigation
  },
  data () {
    return {
      customers: [],
      search: ''
    }
  },
  computed: {
    customerSearch () {
      return this.customers.filter((customer) => {
        const query = this.search.toUpperCase()
        return (
          customer.customer_id.toString().includes(query) ||
          customer.first_name.toString().includes(query) ||
          customer.last_name.toString().includes(query)
        )
      })
    }
  },
  methods: {
    generatePDF () {
      const doc = new JsPDF()
      let Y = 10
      let customersPerPage = 57

      doc.setFontSize(20)
      doc.text('Rental Customer Report', 10, Y)
      Y += 10

      this.customers.forEach((customer) => {
        if (`${customer.customer_id}` % customersPerPage === 0) {
          doc.addPage()
          Y = 5
        }
        doc.setFontSize(12)
        doc.text(`${customer.first_name} ${customer.last_name} - ID: ${customer.customer_id}`, 10, Y)
        Y += 5
      })

      doc.save('customer_report.pdf')
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
