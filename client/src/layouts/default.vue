<template>
  <div class="app">
    <BlogHeader />
    <div class="blog-container">
      <Nuxt />
    </div>
    <BlogFooter />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BlogHeader from '@/components/BlogHeader.vue'
import BlogFooter from '@/components/BlogFooter.vue'

@Component({
  components: {
    BlogHeader,
    BlogFooter
  }
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss">
.app {
  .blog-container {
    padding-top: 70px;
    min-height: calc(100vh - 70px);
  }
}
</style>
