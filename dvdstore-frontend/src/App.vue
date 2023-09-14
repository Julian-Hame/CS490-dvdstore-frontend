<template>
  <div>
    <h3>{{ backendResponse }}</h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      backendResponse: ''
    ,
  };
},

mounted() {
  axios.get('http://localhost:3000/')
    .then(response => {
      this.backendResponse = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  },
};
</script>