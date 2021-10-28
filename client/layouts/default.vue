<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="main-page">
    <Header></Header>
    <main class="main-controller controller">
      <slot></slot>
    </main>
    <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped>
.main-controller {
  min-height: 80vh;
  margin-top: 20px;
}
</style>