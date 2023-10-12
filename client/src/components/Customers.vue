<template>
  <div>
    <Navigation />
    <h1>Customers</h1>
    <form @submit.prevent="addCustomer">
      <h2>Add new customer to store:</h2>
      <label for="firstName">First Name:</label>
      <input type="text" v-model="newCustomer.firstName" id="firstName" />
      <h4></h4>
      <label for="lastName">Last Name:</label>
      <input type="text" v-model="newCustomer.lastName" id="lastName" />
      <h4></h4>
      <label for="email">Email:</label>
      <input type="email" v-model="newCustomer.email" id="email" />
      <h4></h4>
      <label for="addressId">Address ID:</label>
      <input type="number" v-model="newCustomer.addressId" id="addressId" />
      <h4></h4>
      <label for="storeId">Store ID:</label>
      <input type="number" v-model="newCustomer.storeId" id="storeId" />
      <h4></h4>
      <button type="submit">Add New Customer</button>
    </form>
    <h4>-----------------------------------------------------------------</h4>
    <form @submit.prevent="deleteCustomer">
      <h2>Delete customer from store:</h2>
      <label for="deleteId">Customer ID:</label>
      <input type="number" v-model="deleteId" id="deleteId" />
      <h4></h4>
      <button type="submit">Delete Customer</button>
    </form>
    <h4>-----------------------------------------------------------------</h4>
    <h2>Customer list:</h2>
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
      search: '',
      deleteId: '',
      newCustomer: {
        storeId: '',
        firstName: '',
        lastName: '',
        email: '',
        addressId: '',
        active: 1
      }
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
    deleteCustomer() {
      axios.delete(`http://localhost:8081/api/customer-delete/${this.deleteId}`)
        .then(response => {
          console.log('Customer successfully deleted')
          location.reload()
        })
        .catch(error => {
          console.error('Error deleting customer:', error)
        })
    },
    addCustomer() {
      // Send a POST request to the backend API to insert the new customer
      axios.post('http://localhost:8081/api/customer-new', this.newCustomer).then(response => {
        this.customers.push(response.data)
        this.newCustomer = {}
        location.reload()
      }).catch(error => {
        console.log(error)
      })
    },
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
