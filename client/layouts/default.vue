<template>
  <div id="app" class="bg-grey">
    <BlogHeader></BlogHeader>
    <div class="main-container">
      <nuxt/>
    </div>
    <BlogFooter></BlogFooter>
  </div>
</template>

<script>
  import { BlogHeader, BlogFooter } from '@/components/layout'

  export default {
    name: 'app',
    components: {
      BlogHeader, BlogFooter
    }
  }
</script>

<style lang="scss">
  @import '~assets/scss/common.scss';

  #app {
    .main-container {
      padding: 120px 20px 0;
      position: relative;
      max-width: 940px;
      margin: 0 auto;
    }
    &.bg-grey {
      background-color: #f7f7f7 !important;
    }
  }
</style>
