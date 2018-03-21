<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    async created () {
      await this.$store.dispatch('init')
    }
  }
</script>

<style>
  #app {
    width: 100%;
    min-height: 100vh;
    background-color: #2e323f;
    background-image: url("~src/assets/imgs/home_bg.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }
</style>
