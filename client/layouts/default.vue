<template>
  <div class="main-page">
    <Header></Header>
    <div class="container p-4 pt-20 min-h-screen mx-auto flex flex-row space-x-4">
      <main class="flex-grow">
        <slot></slot>
      </main>
      <aside class="w-80 flex-shrink-0">
        <Hot />
        <Newest class="mt-4" />
      </aside>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Hot from '../components/Hot.vue'
import Newest from '../components/Newest.vue'

export default defineComponent({
  components: {
    Header,
    Footer,
    Hot,
    Newest,
  },
})
</script>

<style lang="scss" scoped>
.main-controller {
  min-height: 80vh;
  margin-top: 20px;
}
</style>