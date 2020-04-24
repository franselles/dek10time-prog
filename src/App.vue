<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  created: function () {
    Vue.axios.interceptors.response.use(
      (response) => {
        // Everything fine, just pass it for further processing.
        return response;
      },
      (error) => {
        // If it is an HTTP error
        if (error.response) {
          if (error.response.status === 401) {
            // Session expired.
            this.$router.push('/');
          }
          return Promise.reject(error);
        }
      }
    );
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
