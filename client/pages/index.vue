<template>
  <section class="index">
    <ArticleList :articles="article"></ArticleList>
  </section>
</template>

<script>
  import ArticleList from '@/components/article/ArticleList.vue'

  export default {
    name: 'index',
    components: {
      ArticleList
    },
    fetch ({store}) {
      return Promise.all([
        store.dispatch('loadHome')
      ])
    },
    computed: {
      article () {
        return this.$store.state.article.list.data
      }
    }
  }
</script>

<style scoped>
  .index {
  }
</style>
